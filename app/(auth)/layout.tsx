import { ReactNode } from "react";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <div className=" bg-red-500">navbar</div>
      {children}
    </div>
  );
};

export default AuthLayout;
