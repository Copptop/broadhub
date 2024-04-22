'use server'

import { v4 as uuidv4 } from 'uuid';
import { getVT_EMAIL, getVT_TOKEN, getPR_EMAIL, getPR_TOKEN, } from '@/lib/database/tokens';
import { prismaInstance } from '@/lib/prisma';
import { getUser_Email } from '../database/users';
import bcrypt from 'bcryptjs';

// Token expiry time of 5 minutes
const token_expiry = (1000 * 300) * 5

// Function to generate the email verification token
export const GenerateVT = async (email: string) => {
  // Generates a random token
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + token_expiry)

  // Gets the existing token
  const existingToken = await getVT_EMAIL(email)

  // Deletes the existing token
  if (existingToken) {
    await prismaInstance.emailVerificationToken.delete({ where: { id: existingToken.id } })
  }

  // Creates a new token
  const vt = await prismaInstance.emailVerificationToken.create({
    data: { token, expires, email }
  })

  return vt
}

// Function to verify the email
export const VerifyEmail = async (token: string) => {
  // Checks if the token is empty
  const checkToken = await getVT_TOKEN(token)
  if (!checkToken || new Date(checkToken.expires) < new Date()) return { error: "Invalid Token" }

  // Checks if the token is valid
  const checkUser = await getVT_EMAIL(checkToken.email)
  if (!checkUser) { return { error: "Email doesn't exist" } }

  // Checks if the user exists
  await prismaInstance.user.update({
    where: { email: checkUser.email },
    data: { emailVerified: new Date(), email: checkToken.email }
  })

  // Deletes the token
  await prismaInstance.emailVerificationToken.delete({ where: { id: checkToken.id } })

  return { success: "Email Verified" }
}

// Function to generate the password reset token
export const GeneratePR = async (email: string) => {
  // Generates a random token
  const token = uuidv4()
  const expires = new Date(new Date().getTime() + token_expiry)

  // Gets the existing token and deletes it if it exists
  const existingToken = await getPR_EMAIL(email)
  if (existingToken) {
    await prismaInstance.resetPasswordToken.delete({ where: { id: existingToken.id } })
  }
  // Creates a new token
  const pr = await prismaInstance.resetPasswordToken.create({
    data: { token, expires, email }
  })

  return pr
}

export const NewPassword = async (token: string, email: string, password: string) => {
  if (!token || !email || !password) return { error: "Invalid Request" } // Checks if the token, email or password are empty
  // Checks if the token exists
  const checkToken = await getPR_TOKEN(token)
  if (!checkToken || new Date(checkToken.expires) < new Date() || checkToken.email !== email) return { error: "Invalid Token" }
  // Checks if the token is valid and if the email matches the email in the token
  const checkUser = await getPR_EMAIL(checkToken.email)
  if (!checkUser) { return { error: "Email doesn't exist" } }
  // Checks if the user exists
  const changePasswordUser = await getUser_Email(checkToken.email)
  if (!changePasswordUser || !changePasswordUser.email || !changePasswordUser.password) { return { error: "Email doesn't exist" } }
  // Checks if the user exists and has an email and password (filters out OAuth users )
  const comaprePassword = await bcrypt.compare(password as string, changePasswordUser.password)
  // Checks if the password is the same as the previous password
  if (comaprePassword) return { error: "Password cannot be the same as previously" }
  // Hashes the new password
  const hashedPassword = await bcrypt.hash(password as string, 10)
  // Updates the user with the new password
  await prismaInstance.user.update({
    where: { email: changePasswordUser.email },
    data: { password: hashedPassword, email: changePasswordUser.email }
  })
  // Deletes the token
  await prismaInstance.resetPasswordToken.delete({ where: { id: checkToken.id } })

  return { success: "Password Reset" }
}