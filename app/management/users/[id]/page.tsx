import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getSpecificUser } from "@/lib/database/users";
import UserDetails from "./userDetails";
import { getAllLocations } from "@/lib/database/locations";

interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
  officeLocation: string;
  profilePicture: string;
  isOauth: boolean;
  isVerified: boolean;
}

export default async function Page({ params }: { params: { id: string } }) {
  const locations = await getAllLocations()
  const locationNames = locations.map((location: any) => location.name)
  const _user = await getSpecificUser(params.id)
  if (!_user) return <>ERROR</>
  const user = {
    id: _user.id,
    name: _user.name,
    email: _user.email,
    role: _user.role,
    officeLocation: _user.basedInID || '',
    profilePicture: _user.image || '',
    isOauth: (_user.password === 'true') ? true : false,
    isVerified: _user.emailVerified ? true : false,
  }

  const pages = [
    { name: 'Users', href: '/management/users', current: false },
    { name: 'User Details', href: `/users/${params.id}`, current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <UserDetails User={user} selectLocation={locationNames} />
    </>
  );
}