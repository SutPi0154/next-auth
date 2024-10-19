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
    <main className=" flex flex-col h-full justify-center items-center bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 flex flex-col text-center">
        <h1
          className={cn(
            " text-6xl m-0 font-semibold text-white drop-shadow-md",
            font.className
          )}
        >
          Auth
        </h1>
        <p className={cn(" text-white text-lg mt-0 mb-3", font.className)}>
          A simple authentication service{" "}
        </p>
        <LoginButton asChild>
          <Button variant={"secondary"} size={"lg"} className=" text-md">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </main>
  );
}
