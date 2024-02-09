'use client'

import { InvertedSubmitButton, SubmitButton } from "@/components/Buttons";
import { InputField } from '@/components/InputFields';
import Breadcrumb from "@/components/navigation/breadcrumbs";
import { ConfirmModal } from "@/components/popups/Modals";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import { format } from "date-fns";
import { useState } from 'react';

interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
  officeLocation: string;
  profilePicture: JSX.Element;
}

const User: UserProps = {
  id: 1,
  name: 'test user name',
  email: 'test@email.com',
  role: 'test role',
  officeLocation: 'Marsh Wall, Canary Wharf',
  profilePicture: <UserCircleIcon className='h-full' />,
};

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUser, setEditedUser] = useState<UserProps>({ ...User });

  const handleEditToggle = () => {
    if (isEditing) {
      setEditedUser({ ...User });
    }
    setIsEditing(!isEditing);
  };

  const handleUpdate = () => {
    // Avoid updating the 'id' field
    const updatedUser = { ...editedUser, id: User.id };
    setUser(updatedUser);

    setIsEditing(false);
  };

  const setUser = (user: UserProps) => {
    User.name = user.name;
    User.email = user.email;
    User.role = user.role;
    User.officeLocation = user.officeLocation;
    User.profilePicture = user.profilePicture;
  };


  const pages = [
    { name: 'Users', href: '/management/users', current: false },
    { name: 'User Details', href: `/users/${User.id}`, current: true },
  ];

  return (
    <>
      <Breadcrumb pages={pages} />
      <div className="px-6 py-4 h-[85ddvh] overflow-y-auto">
        <div className="px-4 sm:px-0">
          <h1 className="text-2xl font-semibold text-zinc-700 dark:text-zinc-300">User Details</h1>
        </div>
        <div className="mt-6 border-t border-zinc-200 dark:border-zinc-500">
          <div className="divide-y divide-zinc-200 dark:divide-zinc-500">
            {Object.keys(User).map((field) => (
              <div key={field} className="px-4 py-6 flex flex-row sm:px-1">
                <span className="text-sm font-medium leading-6 text-zinc-700 dark:text-zinc-300 w-32 flex-none">
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </span>
                {field === 'id' ? (
                  <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32">
                    {User[field]}
                  </span>
                ) : (
                  <>
                    {field === 'profilePicture' ? (
                      <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500 w-32">
                        {isEditing ? editedUser[field] : User[field]}
                      </span>
                    ) : (
                      isEditing ? (
                        <InputField
                          name={field}
                          placeholder={field === 'email' ? 'Email' : field}
                          type={field === 'email' ? 'email' : 'text'}
                          value={editedUser[field as keyof UserProps].toString() || ''}
                          onChange={(e) => setEditedUser({ ...editedUser, [field]: e.target.value })}
                        />
                      ) : (
                        <span className="text-sm leading-6 text-zinc-500 dark:text-zinc-500  w-32 grow">
                          {User[field as keyof UserProps]}
                        </span>
                      )
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
          <div className="flex flex-auto py-4 space-x-5">
            {isEditing ? (
              <>
                <SubmitButton onClick={handleUpdate}>Update</SubmitButton>
                <InvertedSubmitButton onClick={handleEditToggle}>Cancel</InvertedSubmitButton>
              </>
            ) : (
              <>
                <SubmitButton onClick={handleEditToggle}>Edit</SubmitButton>
                <InvertedSubmitButton onClick={() => setIsModalOpen(true)}>Delete User</InvertedSubmitButton>
              </>
            )}
          </div>
          {isModalOpen && (
            <ConfirmModal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
        </div>
      </div>
    </>
  );
}