import { Button } from "@/components/ui/button";
import { LeasingRequestForm } from "./components/LeasingRequestForm";
import { XIcon } from "lucide-react";
import { IconRound } from "@/components/IconRound";
import pullImg from "@/assets/images/pull.png";
import { Link } from "react-router";

export default function RequestLeasing() {
  return (
    <div>
      <div className="flex gap-3 items-center">
        <Button variant="outline" className="rounded-full size-8" asChild>
          <Link to="/leases">
            <XIcon className="size-5!" />
          </Link>
        </Button>
        <h2 className="text-2xl">Leasing Request</h2>
      </div>
      <div className="flex items-center gap-2 my-4">
        <IconRound icon={pullImg} size="xs" />
        <h3 className="text-2xl font-bold">New Request</h3>
      </div>
      <div>
        <p className="text-primary text-xl font-semibold">
          Please provide us with some information about your issue.
        </p>
        <LeasingRequestForm />
      </div>
    </div>
  );
}
