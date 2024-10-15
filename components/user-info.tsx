import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ExtendedUser } from "@/next-auth";
interface UserINfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo = async ({ user, label }: UserINfoProps) => {
  return (
    <Card className=" w-[600px] shadow-md">
      <CardHeader>
        <p className=" text-2xl">{label}</p>
      </CardHeader>
      <CardContent className=" space-y-4">
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">ID</p>
          <p className=" truncate text-xs max-w-[180ox] font-mono p-1 rounded-md bg-slate-100">
            {user?.id}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Name</p>
          <p className=" truncate text-xs max-w-[180ox] font-mono p-1 rounded-md bg-slate-100">
            {user?.name}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Email</p>
          <p className=" truncate text-xs max-w-[180ox] font-mono p-1 rounded-md bg-slate-100">
            {user?.email}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">Role</p>
          <p className=" truncate text-xs max-w-[180ox] font-mono p-1 rounded-md bg-slate-100">
            {user?.role}
          </p>
        </div>
        <div className=" flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className=" text-sm font-medium">2 factor auth</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "On" : "Off"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
