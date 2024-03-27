"use server"

interface SignInValues {
  email: string
  password: string
}

export const SignIn = async (values: SignInValues) => {
  let validData = true
  const { email, password } = values
  if (!email || !password) { validData = false }

  if (!validData) {
    return { error: "Please fill in all fields" }
  }
  else {
    return { success: "pass" }
  }
} 