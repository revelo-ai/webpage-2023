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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const formRef = useRef<HTMLFormElement>(null);
  const { error, success, loading, onSubmit, clearStatus } = usePostForm(
    formRef,
    reset
  );

  return (
    <div id="contact" className="section section-contact">
      <div className="container">
        {success ? (
          <div className="contact-form section-contact-form contact-success">
            <div className="success-icon" aria-hidden="true">
              &#10003;
            </div>
            <h2>{form.success_title}</h2>
            <div className="subtitle" role="status">
              {form.success}
            </div>
            <div className="submit-wrapper">
              <button
                type="button"
                className="cta-button cta-button-md"
                onClick={clearStatus}
              >
                {form.send_another}
              </button>
            </div>
          </div>
        ) : (
          <fieldset disabled={loading}>
            <form
              ref={formRef}
              className="contact-form section-contact-form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <h2>{form.title}</h2>

              <div className="subtitle">{form.content}</div>

              {/* For emailjs */}
              <input type="hidden" name="contact_number" />

              <div className="form-row">
                <div className="input-wrapper">
                  <label htmlFor="user_first_name">{form.firstname}</label>
                  <input
                    id="user_first_name"
                    type="text"
                    aria-invalid={!!errors.user_first_name}
                    {...register("user_first_name", { required: true })}
                  ></input>
                  {errors.user_first_name && (
                    <span className="field-error">{form.required}</span>
                  )}
                </div>
                <div className="input-wrapper">
                  <label htmlFor="user_last_name">{form.lastname}</label>
                  <input
                    id="user_last_name"
                    type="text"
                    {...register("user_last_name", { required: false })}
                  ></input>
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrapper">
                  <label htmlFor="user_email">{form.email}</label>
                  <input
                    id="user_email"
                    type="email"
                    aria-invalid={!!errors.user_email}
                    {...register("user_email", {
                      required: form.required,
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: form.invalid_email,
                      },
                    })}
                  ></input>
                  {errors.user_email && (
                    <span className="field-error">
                      {errors.user_email.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-row">
                <div className="input-wrapper">
                  <label htmlFor="message">{form.msg}</label>
                  <textarea
                    id="message"
                    placeholder={form.msg_placeholder}
                    aria-invalid={!!errors.message}
                    {...register("message", { required: true })}
                  ></textarea>
                  {errors.message && (
                    <span className="field-error">{form.required}</span>
                  )}
                </div>
              </div>

              {error && (
                <div className="warning" role="alert">
                  {form.error}
                </div>
              )}

              <div className="submit-wrapper">
                <input
                  className="cta-button cta-button-md"
                  type="submit"
                  value={loading ? form.sending : form.button}
                ></input>
              </div>
            </form>
          </fieldset>
        )}
      </div>
    </div>
  );
}

export const usePostForm = (
  formRef: React.RefObject<HTMLFormElement>,
  reset: () => void
) => {
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState(false);

  const onSubmit: SubmitHandler<Inputs> = React.useCallback(async () => {
    if (!formRef.current) return;

    setLoading(true);
    setSuccess(false);
    setError(false);

    try {
      await emailjs.sendForm(
        "service_szxyguf",
        "template_9436lwn",
        formRef.current,
        "AEqBsn2qnH8oumudM"
      );
      reset();
      setSuccess(true);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [formRef, reset]);

  const clearStatus = React.useCallback(() => {
    setSuccess(false);
    setError(false);
  }, []);

  return {
    error,
    success,
    loading,
    onSubmit,
    clearStatus,
  };
};
