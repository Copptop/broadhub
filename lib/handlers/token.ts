'use server'

import { v4 as uuidv4 } from 'uuid';
import { getVT_EMAIL, getVT_TOKEN, getPR_EMAIL, getPR_TOKEN, } from '@/lib/database/tokens';
import { prismaInstance } from '@/lib/prisma';
import { getUser_Email } from '../database/users';
import bcrypt from 'bcryptjs';

const token_expiry = (1000 * 300) * 5

export const GenerateVT = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + token_expiry)

  const existingToken = await getVT_EMAIL(email)

  if (existingToken) {
    await prismaInstance.emailVerificationToken.delete({ where: { id: existingToken.id } })
  }

  const vt = await prismaInstance.emailVerificationToken.create({
    data: { token, expires, email }
  })

  return vt
}

export const VerifyEmail = async (token: string) => {
  const checkToken = await getVT_TOKEN(token)
  if (!checkToken || new Date(checkToken.expires) < new Date()) return { error: "Invalid Token" }

  const checkUser = await getVT_EMAIL(checkToken.email)
  if (!checkUser) { return { error: "Email doesn't exist" } }

  await prismaInstance.user.update({
    where: { email: checkUser.email },
    data: { emailVerified: new Date(), email: checkToken.email }
  })

  await prismaInstance.emailVerificationToken.delete({ where: { id: checkToken.id } })

  return { success: "Email Verified" }
}


export const GeneratePR = async (email: string) => {
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + token_expiry)

  const existingToken = await getPR_EMAIL(email)

  if (existingToken) {
    await prismaInstance.resetPasswordToken.delete({ where: { id: existingToken.id } })
  }

  const pr = await prismaInstance.resetPasswordToken.create({
    data: { token, expires, email }
  })

  return pr
}

export const NewPassword = async (token: string, email: string, password: string) => {
  if (!token || !email || !password) return { error: "Invalid Request" }

  const checkToken = await getPR_TOKEN(token)
  if (!checkToken || new Date(checkToken.expires) < new Date() || checkToken.email !== email) return { error: "Invalid Token" }

  const checkUser = await getPR_EMAIL(checkToken.email)
  if (!checkUser) { return { error: "Email doesn't exist" } }

  const changePasswordUser = await getUser_Email(checkToken.email)
  if (!changePasswordUser || !changePasswordUser.email || !changePasswordUser.password) { return { error: "Email doesn't exist" } }

  const comaprePassword = await bcrypt.compare(password as string, changePasswordUser.password)

  if (comaprePassword) return { error: "Password cannot be the same as previously" }

  const hashedPassword = await bcrypt.hash(password as string, 10)

  await prismaInstance.user.update({
    where: { email: changePasswordUser.email },
    data: { password: hashedPassword, email: changePasswordUser.email }
  })

  await prismaInstance.resetPasswordToken.delete({ where: { id: checkToken.id } })

  return { success: "Password Reset" }
}