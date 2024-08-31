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
    if (variant === "LOGIN") {
      setVariant("REGISTER");
    } else {
      setVariant("LOGIN");
    }
  }, [variant]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            throw new Error("Invalid credentials");
          }

          if (callback?.ok) {
            router.push("/conversations");
          }
        })
        .catch(() => console.log("Invalid credentials!"));
    }

    if (variant === "LOGIN") {
      console.log("login");
      signIn("credentials", {
        ...data,
        redirect: false,
      }).then((callback) => {
        if (callback?.error) {
          console.log("Invalid credentials !");
        }

        if (callback?.ok && !callback?.error) {
          router.push("/conversations");
        }
      });
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
