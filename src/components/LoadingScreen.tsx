import { Loader } from "@/components/Loader";

export function LoadingScreen() {
  return (
    <div className="bg-primary flex min-h-screen w-screen items-center justify-center">
      <Loader />
    </div>
  );
}
