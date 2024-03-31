
import { InvertedSubmitButton } from '@/components/Buttons';
import ResetPasswordForm from '@/components/authScreen/resetPasswordFrom';
import { VerticalLogo } from '@/components/logo';

export default async function SignInPage() {

  return (
    <>
      <div className='overflow-y-auto w-full py-3'>
        <div className='w-3/4 mx-auto flex flex-col gap-5'>
          <VerticalLogo className='self-center w-2/3 h-auto' />
          <div className='flex flex-col gap-5'>
            <ResetPasswordForm />
          </div>
          <InvertedSubmitButton type='submit'>Cancel Password Reset</InvertedSubmitButton>
        </div>
      </div>
    </>
  );
};