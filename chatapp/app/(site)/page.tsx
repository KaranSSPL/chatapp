import Image from "next/image";
import AuthForm from "./components/AuthForm/AuthForm";
import styles from './page.module.scss';

const Auth = () => {
  return (
    <div className={styles['auth-container']}>
      <div className={styles['auth-image-container']}>
        <h2 className={styles['auth-title']}>
          Sign in to your account
        </h2>
      </div>
      <AuthForm />      
    </div>
  );
}

export default Auth;
