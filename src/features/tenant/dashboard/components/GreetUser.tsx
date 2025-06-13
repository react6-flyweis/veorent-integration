import { useAuthStore } from "@/store/useAuthStore";

export function GreetUser() {
  const user = useAuthStore((state) => state.user);

  return <h1 className="text-xl font-semibold">Hello, {user?.firstname}</h1>;
}
