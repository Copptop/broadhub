import { InvertedSubmitButton, SubmitButton } from '@/components/Buttons';
import { deleteBooking } from '@/lib/database/bookings';
import { deleteUser } from '@/lib/database/users';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  type?: string;
  id?: string;
  children?: ReactNode;
}

export function ConfirmModal({ open, onClose, children, type, id }: ModalProps) {
  const [localOpen, setLocalOpen] = useState(open);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  async function handleConfirm() {
    if (type === 'booking') {
      await deleteBooking(id || '');
    } else if (type === 'user') {
      await deleteUser(id || '');
    }
    setLocalOpen(false);
    onClose();
    router.push('/');
    router.refresh();
  }

  useEffect(() => {
    setLocalOpen(open);
  }, [open]);

  return (
    <Transition.Root show={localOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={() => { setLocalOpen(false); onClose(); }}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-zinc-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-darkBgSecondary px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                {children && (
                  <div>
                    {children}
                  </div>
                )}
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <SubmitButton
                    type="button"
                    className="inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold  shadow-sm  sm:col-start-2"
                    onClick={() => handleConfirm()}
                    ref={cancelButtonRef}
                  >
                    Confirm
                  </SubmitButton>
                  <InvertedSubmitButton
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-mdpx-3 py-2 text-sm font-semibold  shadow-sm ring-1  sm:col-start-1 sm:mt-0"
                    onClick={() => { setLocalOpen(false); onClose(); }}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </InvertedSubmitButton>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}