import { UserCircleIcon } from '@heroicons/react/24/outline';

import UserSection from './usersSection';
import { getUsers } from '@/lib/database/users';
import { currentRole } from '@/lib/hooks/server/use-current-user';
import { redirect } from 'next/navigation';

interface userProps {
  id: string,
  profilePicture: string,
  name: string,
  email: string,
  role: string,
  officeLocation: string,
  href: string,
  isOauth: boolean,
}

export default async function Page() {
  const role = await currentRole()
  if (role !== 'HR' && role !== 'ADMIN' && role !== 'MANAGER') {

    redirect('/')
  }
  const _users = await getUsers()
  if (!_users) return <>ERROR</>

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