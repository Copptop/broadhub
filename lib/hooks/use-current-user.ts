import { useSession } from "next-auth/react";

// Function to get the current user as per NextAuth specification for client side components
export const useCurrentUser = () => {
  const session = useSession();
  return session.data?.user;
}

// Function to get the current user role as per NextAuth specification for client side components
export const useCurrentRole = () => {
  const session = useSession();
  return session.data?.user?.role;
}