import Breadcrumb from "@/components/navigation/breadcrumbs";
import { getAllLocations } from "@/lib/database/locations";
import { getSpecificUser } from "@/lib/database/users";
import { currentUser } from "@/lib/hooks/server/use-current-user";
import { redirect } from "next/navigation";
import ProfileDetails from "./profileDetails";


export default async function Page() {
  // Ensure correct user role for access
  const _currentUser = await currentUser()
  if (!_currentUser) {
    redirect('/')
  }
  // Fetch all the locations
  const locations = await getAllLocations()
  const locationNames = locations.map((location: any) => location.name)

  // Fetch the user data from the database
  const _user = await getSpecificUser(_currentUser!.id!.toString())
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
    { name: 'User Profile and Settings', href: '/profile', current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <ProfileDetails User={user} selectLocation={locationNames} />
    </>
  );
}