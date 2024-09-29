import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});
export default function Home() {
  return (
    <main className=" flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-100 to-blue-800">
      <div className="space-y-6 ">
        <h1 className=" text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className={cn(" text-white text-lg", font.className)}>
          A simple authentication service{" "}
        </p>
        <LoginButton>
          <Button variant={"secondary"} size={"lg"} className=" text-md">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
