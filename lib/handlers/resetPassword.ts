'use server'

import { getUser_Email } from "@/lib/database/users"
import { GeneratePR } from "@/lib/handlers/token"
import { sendPR } from "@/lib/handlers/email"

export const ResetPasswordHandler = async (email: string) => {
  if (!email) return { error: "Please fill out the email field" }

  const emailVerfied = await getUser_Email(email)

  if (!emailVerfied || !emailVerfied.email || !emailVerfied.password) { return { error: "User does not exist" } }

  const pr = await GeneratePR(email)
  await sendPR(pr.email, pr.token)

  return { success: "Reset Password Email Sent" }
}

