import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export function BackButton() {
  const navigate = useNavigate();
  const backHandler = () => {
    navigate(-1);
  };
  return (
    <Button
      onClick={backHandler}
      variant="outline"
      className="rounded-full size-9 justify-center items-center"
    >
      <ArrowLeftIcon className="size-5 text-primary" />
    </Button>
  );
}
