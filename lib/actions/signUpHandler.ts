"use server"

import bcrypt from 'bcryptjs'
import { db } from '@/lib/prisma'
import { getUserViaEmail } from '@/lib/database/users'

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
  const checkUser = await getUserViaEmail(email)
  if (checkUser) return { error: "User already exists" }

  if (companyCode) {
    const companyCodeRegex = /^(\d){4}$/;
    const adminRegex = /^(\d+),hjdsfm958690JKDMSAWILDdhjfgjkhdsgfhjksdsdfdsgf$/
    const managerRegex = /^(\d+),h5436789hssgdHDDGAHJDfhjksdsdfgjsadsad21e3dsgf$/
    let role = 'user'
    let exctractedCompanyCode = companyCode

    if (adminRegex.test(companyCode) || managerRegex.test(companyCode)) {
      if (adminRegex.test(companyCode)) {
        const match = companyCode.match(adminRegex)
        if (match) { exctractedCompanyCode = match[1]; role = "admin" }
      } else {
        const match = companyCode.match(managerRegex)
        if (match) { exctractedCompanyCode = match[1]; role = "manager" }
      }
    }
    if (!companyCodeRegex.test(exctractedCompanyCode)) return { error: "Invalid Company Code" }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        company: exctractedCompanyCode,
        role,
      }
    })
    return { success: "User Created" }
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    }
  })
  return { success: "User Created" }
}