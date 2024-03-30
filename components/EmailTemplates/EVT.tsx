import React from 'react';
import Link from 'next/link';
import { SubmitButton } from '@/components/Buttons';

interface EmailVerificationTemplateTemplateProps {
  vt: string;
}

export const EmailVerificationTemplate: React.FC<Readonly<EmailVerificationTemplateTemplateProps>> = ({
  vt,
}) => (
  <div className='w-full h-full align-middle items-center'>
    <Link href={`http://localhost:3000/auth/verify-email?token=${vt}`}>
      <SubmitButton>Click Here to verify your email</SubmitButton>
    </Link>
  </div>
);
