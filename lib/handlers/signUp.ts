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

// Function to handle the sign up
export const SignUpHandler = async (values: SignInValues) => {
  // Checks if the fields are empty
  let validData = true
  const { name, email, emailConfirm, password, passwordConfirm, companyCode } = values
  if (!name || !email || !emailConfirm || !password || !passwordConfirm) { validData = false }

  // Returns an error if the fields are empty
  if (!validData) return { error: "Please fill in all fields" }

  // Returns an error if the emails or passwords do not match
  if (email !== emailConfirm) return { error: "Emails do not match" }
  if (password !== passwordConfirm) return { error: "Passwords do not match" }

  // Returns an error if the password is less than 8 characters long
  if (password.length < 6) return { error: "Password must be at least 8 characters long" }
  // Returns an error if the password does not contain a special character or an uppercase letter
  if (!/[!@#$%^&*]/.test(password) || !/[A-Z]/.test(password)) return { error: "Password must contain at least one special character and one uppercase letter" }

  // Hashes the password
  const hashedPassword = await bcrypt.hash(password, 10)
  // Checks if the user already exists
  const checkUser = await getUser_Email(email)
  if (checkUser) return { error: "User already exists" }

  // Checks if the company code is valid
  if (companyCode) {
    const companyCodeRegex = /^(\d){4}$/;

    if (!companyCodeRegex.test(companyCode)) return { error: "Invalid Company Code" }

    // Checks if the company code exists
    const checkCompanyCode = await prismaInstance.company.findFirst({
      where: {
        code: companyCode
      }
    })

    // Returns an error if the company code does not exist
    if (!checkCompanyCode) return { error: "Invalid Company Code" }

    // Creates the user with the company code
    await prismaInstance.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        companyID: checkCompanyCode.id
      }
    })

    // Generates a verification token and sends it to the user
    const vt_user = await GenerateVT(email)

    // Sends the verification token
    await sendVT(vt_user.email, vt_user.token)

    return { success: "Confirmation Email Sent w/ company code" }
  }

  // Creates the user
  await prismaInstance.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  })

  // Generates a email v=verification token and sends it to the user
  const vt_user = await GenerateVT(email)
  await sendVT(vt_user.email, vt_user.token)

  return { success: "Confirmation Email Sent" }
}