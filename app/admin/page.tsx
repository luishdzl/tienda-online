import { LogoutButton } from "@/components/logout/Logoutbutton";
import AdminUserRoleManager from "@/components/AdminUserRoleManager";



export default function Test() {
  return <div><div className="h-screen flex justify-center items-center bg-gray-300">
    <LogoutButton/>
    <h1>You are an Admin</h1>
    </div>
    <div className="h-screen flex justify-center items-center bg-gray-300">
    <AdminUserRoleManager /></div>
    </div>;
}