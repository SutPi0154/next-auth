"use client";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { signOut } from "next-auth/react";

const SettingPage = () => {
  const session = useCurrentUser();

  console.log(session);
  return (
    <div>
      <form>
        <Button
          type="submit"
          onClick={() => {
            signOut;
          }}
        >
          sing out
        </Button>
      </form>
    </div>
  );
};

export default SettingPage;
