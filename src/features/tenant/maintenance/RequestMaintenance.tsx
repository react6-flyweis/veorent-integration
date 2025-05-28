import { Button } from "@/components/ui/button";
import { MaintenanceRequestForm } from "./components/MaintenanceRequestForm";
import { XIcon } from "lucide-react";
import { IconRound } from "@/components/IconRound";
import pullImg from "@/assets/images/pull.png";
import { useGoBack } from "@/hooks/useGoBack";

export default function RequestMaintenance() {
  const goBack = useGoBack();
  return (
    <div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          className="size-8 rounded-full"
          onClick={goBack}
        >
          <XIcon className="size-5!" />
        </Button>
        <h2 className="text-2xl">Create A New Request</h2>
      </div>
      <div className="my-4 flex items-center gap-2">
        <IconRound icon={pullImg} size="xs" />
        <h3 className="text-2xl font-bold">New Request</h3>
      </div>
      <div>
        <p className="text-primary text-xl font-semibold">
          Please provide us with some information about your issue.
        </p>
        <MaintenanceRequestForm />
      </div>
    </div>
  );
}
