
import { getUsers } from '@/lib/database/users';
import { currentRole } from '@/lib/hooks/server/use-current-user';
import { redirect } from 'next/navigation';
import UserSection from './usersSection';

export default async function Page() {
  // Ensure correct user role for access
  const role = await currentRole()
  if (role !== 'HR' && role !== 'ADMIN' && role !== 'MANAGER') {
    redirect('/')
  }
  // Fetch all the users
  const _users = await getUsers()
  if (!_users) return <>ERROR</>

  // Map the raw user data to the user props to be used in the component
  const users = _users.map((user: any) => {
    return {
      id: user.id,
      profilePicture: user.image,
      name: user.name,
      email: user.email,
      role: user.role,
      officeLocation: user.basedInID || '',
      href: `/management/users/${user.id}`,
      isOauth: (user.password === 'true') ? true : false,
    };
  }, [])

  return (
    <>
      <UserSection data={users} />
    </>
  );
}