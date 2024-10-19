"use client";

import { admin } from "@/actions/admin";
import RoleGate from "@/components/auth/role-gate";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hooks/use-current-role";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const role = useCurrentRole() as UserRole;
  const onServerActionClick = async () => {
    await admin().then((data) => {
      if (data.success) {
        return toast.success(data.success, { position: "bottom-right" });
      } else if (data.error) {
        return toast.error(data.error, { position: "bottom-right" });
      }
    });
  };
  const onApiRouteCLick = async () => {
    await fetch("/api/admin").then((response) => {
      if (response.ok) {
        toast.success("Allowed api route", { position: "bottom-right" });
      } else {
        toast.error("Forbidden  API route", { position: "bottom-right" });
      }
    });
  };
  return (
    <Card className=" w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allow to see this content" />
        </RoleGate>
        <div className="flex justify-between items-center flex-row rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Only Admin api route</p>
          <Button onClick={onApiRouteCLick}>Click to test </Button>
        </div>
        <div className="flex justify-between items-center flex-row rounded-lg border p-3 shadow-md">
          <p className=" text-sm font-medium">Only Admin api route</p>
          <Button onClick={onServerActionClick}>Click to test </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
