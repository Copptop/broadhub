'use client'

import { InvertedSubmitButton, SubmitButton } from "@/components/Buttons";
import { InputField } from '@/components/InputFields';
import Breadcrumb from "@/components/navigation/breadcrumbs";
import { ConfirmModal, ProfilePicModal } from "@/components/popups/Modals";
import { ResetPasswordHandler } from "@/lib/handlers/resetPassword";
import { useCurrentRole } from "@/lib/hooks/use-current-user";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { format, set } from "date-fns";
import { useRef, useState, useTransition } from 'react';
import { Button } from '@tremor/react';

import { changeUserInformation } from '@/lib/handlers/users';

import { Select, SelectItem, TextInput } from '@tremor/react';
import Image from "next/image";

interface UserProps {
  id: string;
  name: string;
  email: string;
  role: string;
  officeLocation: string;
  profilePicture: string;
  isOauth: boolean;
  isVerified: boolean;
}

const selectRole = ['ADMIN', 'USER', 'MANAGER', 'HR', 'IT']

export default function ProfileDetails({ User, selectLocation }: { User: UserProps, selectLocation: Array<string> }) {
  const role = useCurrentRole();
  const [error, setError] = useState<string | undefined>("")
  const [success, setSuccess] = useState<string | undefined>("")
  const [isEditing, setIsEditing] = useState(true);
  const [isEditingWPriv, setIsEditingWPriv] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProfilePicModalOpen, setIsProfilePicModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition()

  const [_role, setSelectRole] = useState(selectRole[selectRole.findIndex(role => role.toUpperCase() === User.role.toUpperCase())])
  const [_location, setSelectLocation] = useState(selectLocation[selectLocation.findIndex(location => location.toUpperCase() === User.officeLocation.toUpperCase())])

  const _name = useRef(User.name);
  const _email = useRef(User.email);

  const handleEditToggle = () => {
    if (isEditing) {
      _name.current = User.name;
      _email.current = User.email;
      setSelectRole(User.role);
      setSelectLocation(User.officeLocation);
    }
    if (role === 'ADMIN') {
      setIsEditingWPriv(!isEditing);
    }
    setIsEditing(!isEditing);
  };

  const handlePasswordReset = (email: string) => {
    ResetPasswordHandler(email)
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!_name.current || !_email.current || !_role || !_location) {
      setError('Please fill in all fields');
      return;
    }

    startTransition(() => {
      changeUserInformation(User.id, _name.current, _email.current, _role, _location)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            setIsEditing(true);
            setIsEditingWPriv(true);
          }
        })
    });
  }

  return (
    <>
      <div className="px-6 py-4 h-[85dvh] overflow-y-auto">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">User Details</h1>
        </div>
        <form className="mt-6 border-t border-zinc-200 dark:border-zinc-500" onSubmit={(e) => handleSubmit(e)} >
          <div className="divide-y divide-zinc-200 dark:divide-zinc-500">

            <div className="px-4 py-6 flex flex-row gap-x-4 sm:px-1 items-center">
              <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Name</div>
              <TextInput disabled={isEditing || isPending} className='outline-0 w-1/3 h-1/2' name='fullname' placeholder={User.name} type='text' onChange={(e) => (_name.current = e.target.value)} />
            </div>

            <div className="px-4 py-6 flex flex-row gap-x-4 sm:px-1 items-center ">
              <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Email</div>
              <TextInput disabled={isEditing || isPending} className='outline-0 w-1/3 h-1/2' name='email' placeholder={User.email} type='text' onChange={(e) => (_email.current = e.target.value)} />
              {User.isVerified && (
                <CheckBadgeIcon className="size-7 text-blue-500" aria-hidden="true" />
              )}
            </div>

            <div className="px-4 py-6 flex flex-row gap-x-4 sm:px-1 items-center">
              <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Role</div>
              <Select disabled={isEditingWPriv || isPending} value={_role} className='ml-3 outline-0 w-[37%] h-1/2 ' onValueChange={setSelectRole}>
                {selectRole.map((role, index) => (
                  <SelectItem key={index} value={role}>{role}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="px-4 py-6 flex flex-row gap-x-4 sm:px-1 items-center">
              <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Based In</div>
              <Select disabled={isEditing || isPending} value={_location} className='ml-3 outline-0 w-[37%] h-1/2' onValueChange={setSelectLocation}>
                {selectLocation.map((location, index) => (
                  <SelectItem key={index} value={location}>{location}</SelectItem>
                ))}
              </Select>
            </div>

            <div className="px-4 py-6 flex flex-row gap-x-4 sm:px-1 items-center">
              {User.profilePicture !== '' ? (
                <>
                  <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Profile Picture</div>
                  <Image blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFUlEQVR42mPcWvSjnoEIwDiqkL4KAdiTGjfujfEoAAAAAElFTkSuQmCC" placeholder="blur"
                    src={User.profilePicture}
                    alt="Profile Picture"
                    width={100}
                    height={100}
                    className="size-20 rounded-full object-cover"
                  />
                  {User.isOauth && (
                    <div className="flex justify-center">
                      <Button type="button" variant="secondary" icon={ArrowUpTrayIcon} className=" font-bold" disabled={isEditing} onClick={() => setIsProfilePicModalOpen(true)}> Upload </Button>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {User.isOauth && (
                    <>
                      <div className="text-lg leading-6 text-center text-zinc-500 dark:text-zinc-500 w-32">Profile Picture</div>
                      <div className="flex justify-center">
                        <Button type="button" variant="secondary" icon={ArrowUpTrayIcon} className=" font-bold" disabled={isEditing} onClick={() => setIsProfilePicModalOpen(true)}> Upload </Button>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="flex flex-auto py-4 space-x-5">
            {!isEditing ? (
              <>
                <>
                  <SubmitButton type="submit">Update</SubmitButton>
                </>
                <>
                  <InvertedSubmitButton onClick={handleEditToggle} type="button">Cancel</InvertedSubmitButton>
                </>
              </>
            ) : (
              <>
                <SubmitButton onClick={handleEditToggle} type="button">Edit</SubmitButton>
                <InvertedSubmitButton onClick={() => handlePasswordReset(User.email)} type="button">Reset User Password</InvertedSubmitButton>
              </>
            )}
          </div>
          {isProfilePicModalOpen && (
            <ProfilePicModal open={isProfilePicModalOpen} onClose={() => setIsProfilePicModalOpen(false)} currentPicture={User.profilePicture.toString()} id={User.id} />
          )
          }

          {isModalOpen && (
            <ConfirmModal open={isModalOpen} onClose={() => setIsModalOpen(false)} type='user'>
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-darkBgTertiary">
                <ExclamationCircleIcon className="h-12 w-12 text-red-600" aria-hidden="true" />
              </div>
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-base font-semibold leading-6 text-zinc-700 dark:text-zinc-300">
                  Delete User
                </h3>
                <div className="mt-2">
                  <p className="text-sm text-zinc-400">
                    Are you sure you want to delete this user? This action cannot be undone.
                  </p>
                </div>
              </div>
            </ConfirmModal>
          )}
        </form>
        {error && <p className='text-red-500 dark:text-red-400 py-4'>{error}</p>}
        {success && <p className='text-green-500 dark:text-green-400 py-4'>{success}</p>}
      </div>
    </>
  )
}
