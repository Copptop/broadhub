import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getSpecificUser } from "@/lib/database/users";
import UserDetails from "@/app/profile/profileDetails";
import { getAllLocations } from "@/lib/database/locations";
import { currentRole } from "@/lib/hooks/server/use-current-user";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  // Ensure correct user role for access
  const role = await currentRole()
  if (role !== 'HR' && role !== 'ADMIN' && role !== 'MANAGER') {

    redirect('/')
  }

  // Fetch all the locations
  const locations = await getAllLocations()
  const locationNames = locations.map((location: any) => location.name)
  // Fetch the user data from the database
  const _user = await getSpecificUser(params.id)
  if (!_user) return <>ERROR</>
  // Map the raw user data to the user props to be used in the component
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

  // Set the breadcrumb for the page
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