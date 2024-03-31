import { SubmitButton } from '@/components/Buttons';
import Link from 'next/link';
import React from 'react';

const domain = process.env.DEPLOYMENT_URL;


interface EmailVerificationTemplateTemplateProps {
  vt: string;
}

export const EmailVerificationTemplate: React.FC<Readonly<EmailVerificationTemplateTemplateProps>> = ({
  vt,
}) => (
  <div className='w-full h-full align-middle items-center'>
    <Link href={`${domain}/auth/verify-email?token=${vt}`}>
      <SubmitButton>Click Here to verify your email</SubmitButton>
    </Link>
  </div>
);
