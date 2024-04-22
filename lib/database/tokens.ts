'use server'
import { prismaInstance } from "@/lib/prisma";

// Function to get the email verification token
export const getVT_TOKEN = async (token: string) => {
  try {
    const vt = await prismaInstance.emailVerificationToken.findUnique({ where: { token } })
    return vt

  } catch (error) {
    return null
  }
}

// Function to get the email verification token by email
export const getVT_EMAIL = async (email: string) => {
  try {
    const vt = await prismaInstance.emailVerificationToken.findFirst({ where: { email } })
    return vt

  } catch (error) {
    return null
  }
}

// Function to get the password reset token
export const getPR_TOKEN = async (token: string) => {
  try {
    const pr = await prismaInstance.resetPasswordToken.findUnique({ where: { token: token } })
    return pr

  } catch (error) {
    return null
  }
}

// Function to get the password reset token by email
export const getPR_EMAIL = async (email: string) => {
  try {
    const pr = await prismaInstance.resetPasswordToken.findFirst({ where: { email } })
    return pr

  } catch (error) {
    return null
  }
}
