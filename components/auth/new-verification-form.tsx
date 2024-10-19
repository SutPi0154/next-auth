"use client";
import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token") as string;
  const router = useRouter();
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        if (data.success) {
          toast.success("Please login again!", { position: "bottom-right" });
          router.push("/auth/login");
        }
        setError(data.error);
      })
      .catch(() => setError("Something went wrong!"));
  }, [token, success, error, router]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
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
