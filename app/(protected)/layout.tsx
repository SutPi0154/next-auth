import React from "react";
import Navbar from "./_components/navbar";

const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-sky-400 to-blue-800 h-full flex flex-col gap-y-10 items-center  justify-center">
      <Navbar />
      {children}
    </div>
  );
};

export default ProtectedLayout;
