'use client';

import { HiPaperAirplane } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import useConversation from "@/app/hooks/useConversation";
import styles from "./page.module.scss";

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
      message: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', {
      ...data,
      conversationId: conversationId
    });
  };

  const handleUpload = (result: any) => {
    axios.post('/api/messages', {
      image: result.info.secure_url,
      conversationId: conversationId
    });
  };

  return ( 
    <div className={styles.formContainer}>
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex items-center gap-2 lg:gap-4 w-full"
      >
        <MessageInput 
          id="message" 
          register={register} 
          errors={errors} 
          required 
          placeholder="Write a message"
        />
        <button 
          type="submit" 
          className={styles.submitButton}
        >
          <HiPaperAirplane
            size={18}
            className={styles.icon}
          />
        </button>
      </form>
    </div>
  );
};

export default Form;
