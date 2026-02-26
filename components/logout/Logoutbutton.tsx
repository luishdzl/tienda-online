import { logoutAction } from "./logout-button";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="destructive">
        Cerrar sesión
      </Button>
    </form>
  );
}