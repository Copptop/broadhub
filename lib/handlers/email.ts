'use server'

import { Resend as resendEmail } from 'resend';

// Create a new instance of the Resend class and pass in the API key
const resend = new resendEmail(process.env.RESEND_API_KEY);
// Get the domain from the environment variables
const domain = process.env.DEPLOYMENT_URL;

// Function to send the verification token
export const sendVT = async (email: string, token: string) => {
  // Check if the domain is localhost
  if (domain !== '"http://localhost:3000"') return { error: "Emails Cannot be used on deployed version" }
  const confirmLink = `${domain}/auth/verify-email?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "BroadHub - Verify your email",
    html: `<p>Click <a href="${confirmLink}">here</a> to verify your email.</p>`,
  })
}

// Function to send the password reset token
export const sendPR = async (email: string, token: string) => {
  // Check if the domain is localhost
  if (domain !== '"http://localhost:3000"') return { error: "Emails Cannot be used on deployed version" }
  const confirmLink = `${domain}/auth/new-password?token=${token}`
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "BroadHub - Reset your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to reset your password.</p>`,
  })
}