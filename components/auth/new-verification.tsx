"use client";
import { newVerification } from "@/actions/new-verification";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { FormError } from "../form-error";
import { FormSuccess } from "../form-success";
import { CardWrapper } from "./card-wrapper";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => setError("Something went wrong!"));
  }, [token, success, error]);
  useEffect(() => {
    onSubmit();
  }, [onsubmit]);
  return (
    <CardWrapper
      headerLabel="confirm your verification"
      backButtonHref="auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex item-center justify-center w-full">
        <FormSuccess message={success} />
        {!error && !success && <BeatLoader />}
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
