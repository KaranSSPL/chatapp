'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

import styles from './AuthForm.module.scss';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

interface AuthFormProps {
  onSubmit: SubmitHandler<FieldValues>;
  variant: 'LOGIN' | 'REGISTER';
  toggleVariant: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, variant, toggleVariant }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/conversations');
    }
  }, [status, router]);

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: { name: '', email: '', password: '' },
  });

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBox}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input register={register} errors={errors} required id="name" label="Name" />
          )}
          <Input register={register} errors={errors} required id="email" label="Email address" type="email" />
          <Input register={register} errors={errors} required id="password" label="Password" type="password" />
          <div className={styles.buttonWrapper}>
            <Button type="submit" fullWidth>
              {variant === 'LOGIN' ? 'Sign in' : 'Register'}
            </Button>
          </div>
        </form>

        <div className={styles.divider}>
          <div className={styles.dividerText}>Or continue with</div>
        </div>

        <div className={styles.footerText}>
          <div>{variant === 'LOGIN' ? 'New to Chat?' : 'Already have an account?'}</div>
          <div onClick={toggleVariant} className={styles.footerLink}>
            {variant === 'LOGIN' ? 'Create an account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
