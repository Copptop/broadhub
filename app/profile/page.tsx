import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getSpecificUser } from "@/lib/database/users";
import ProfileDetails from "./profileDetails";
import { getAllLocations } from "@/lib/database/locations";
import { currentRole, currentUser } from "@/lib/hooks/server/use-current-user";
import { redirect } from "next/navigation";

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

export default async function Page() {
  const _currentUser = await currentUser()
  if (!_currentUser) {
    redirect('/')
  }
  const locations = await getAllLocations()
  const locationNames = locations.map((location: any) => location.name)
  const _user = await getSpecificUser(_currentUser!.id!.toString())
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
    { name: 'User Profile and Settings', href: '/profile', current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <ProfileDetails User={user} selectLocation={locationNames} />
    </>
  );
}