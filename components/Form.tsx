"use client";

import { ITranslations } from "@/i18n/get-dictionary";
import React, { useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import emailjs from "@emailjs/browser";

type Inputs = {
  user_first_name: string;
  user_last_name: string;
  user_email: string;
  message: string;
};

export default function Form({ dictionary }: { dictionary: ITranslations }) {
  const { form } = dictionary;
  const { register, handleSubmit } = useForm<Inputs>();
  const formRef = useRef<any>();
  const { error, success, loading, onSubmit } = usePostForm(formRef);

  return (
    <div className="section section-contact">
      <div className="container">
        <fieldset disabled={success || loading}>
          <form
            ref={formRef}
            className="contact-form section-contact-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2>{form.title}</h2>

            <div className="subtitle">
              {form.content}{" "}
              <a href="mailto:info@revelo.bi">info@revelo.bi</a>
            </div>

            {/* For emailjs */}
            <input type="hidden" name="contact_number" />

            <div className="form-row">
              <div className="input-wrapper">
                <label>{form.firstname}</label>
                <input
                  type="text"
                  {...register("user_first_name", { required: true })}
                ></input>
              </div>
              <div className="input-wrapper">
                <label>{form.lastname}</label>
                <input
                  type="text"
                  {...register("user_last_name", { required: false })}
                ></input>
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper">
                <label>{form.email}</label>
                <input
                  type="email"
                  {...register("user_email", { required: true })}
                ></input>
              </div>
            </div>

            <div className="form-row">
              <div className="input-wrapper">
                <label>{form.msg}</label>
                <textarea
                  placeholder={form.msg_placeholder}
                  {...register("message", { required: true })}
                ></textarea>
              </div>
            </div>

            {error && <div className="warning">{form.error}</div>}
            {success && <div className="success">{form.success}</div>}

            <div className="submit-wrapper">
              <input
                className="cta-button cta-button-md"
                type="submit"
                value={form.button}
              ></input>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
}

export const usePostForm = (formRef: any) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit: SubmitHandler<any> = React.useCallback(
    async (data) => {
      setLoading(true);
      setSuccess(false);
      setError(false);

      emailjs
        .sendForm(
          "service_szxyguf",
          "template_9436lwn",
          formRef.current,
          "AEqBsn2qnH8oumudM"
        )
        .then(
          (result) => {
            setLoading(false);
            setSuccess(true);
          },
          (error) => {
            setLoading(false);
            setError(true);
          }
        );

      if (data.Status === 400) {
        setError(true);
        return;
      }
    },
    [formRef]
  );

  return {
    error,
    success,
    loading,
    onSubmit,
  };
};
