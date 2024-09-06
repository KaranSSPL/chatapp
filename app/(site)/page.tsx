"use client";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from "axios";

import styles from "./page.module.scss";
import AuthForm from "./components/AuthForm/AuthForm";

type Variant = "LOGIN" | "REGISTER";

const Auth = () => {
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>("LOGIN");

  const toggleVariant = useCallback(() => {
    setVariant(prevVariant => prevVariant === "LOGIN" ? "REGISTER" : "LOGIN");
  }, []);

  const handleSignIn = async (data: FieldValues) => {
    try {
      const callback = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (callback?.error) {
        throw new Error("Invalid credentials");
      }

      if (callback?.ok) {
        router.push("/conversations");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (variant === "REGISTER") {
      try {
        await axios.post("/api/register", data);
        await handleSignIn(data);
      } catch (error) {
        console.error(error);
      }
    } else if (variant === "LOGIN") {
      await handleSignIn(data);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authImageContainer}>
        <h2 className={styles.authTitle}>{variant}</h2>
      </div>
      <AuthForm onSubmit={onSubmit} variant={variant} toggleVariant={toggleVariant} />
    </div>
  );
};

export default Auth;
