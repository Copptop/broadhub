"use server"

import bcrypt from 'bcryptjs'
import { prismaInstance } from '@/lib/prisma'
import { getUser_Email } from '@/lib/database/users'
import { GenerateVT } from '@/lib/handlers/token'
import { sendVT } from '@/lib/handlers/email'

interface SignInValues {
  name: string,
  email: string,
  emailConfirm: string,
  password: string,
  passwordConfirm: string,
  companyCode: string,

}
export const SignUpHandler = async (values: SignInValues) => {
  let validData = true
  const { name, email, emailConfirm, password, passwordConfirm, companyCode } = values
  if (!name || !email || !emailConfirm || !password || !passwordConfirm) { validData = false }

  if (!validData) return { error: "Please fill in all fields" }
  if (email !== emailConfirm) return { error: "Emails do not match" }
  if (password !== passwordConfirm) return { error: "Passwords do not match" }

  if (password.length < 6) return { error: "Password must be at least 8 characters long" }
  if (!/[!@#$%^&*]/.test(password) || !/[A-Z]/.test(password)) return { error: "Password must contain at least one special character and one uppercase letter" }

  const hashedPassword = await bcrypt.hash(password, 10)
  const checkUser = await getUser_Email(email)
  if (checkUser) return { error: "User already exists" }

  if (companyCode) {
    const companyCodeRegex = /^(\d){4}$/;

    if (!companyCodeRegex.test(companyCode)) return { error: "Invalid Company Code" }

    await prismaInstance.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: companyCode
      }
    })

    const vt_user = await GenerateVT(email)

    await sendVT(vt_user.email, vt_user.token)

    return { success: "Confirmation Email Sent w/ company code" }
  }

  await prismaInstance.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  const vt_user = await GenerateVT(email)
  await sendVT(vt_user.email, vt_user.token)

  return { success: "Confirmation Email Sent" }
}