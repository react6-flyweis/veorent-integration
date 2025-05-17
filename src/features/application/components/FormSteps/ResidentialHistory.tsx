import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircleIcon } from "lucide-react";
import fileIcon from "@/assets/icons/file.png";

export function ResidentialHistory() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <IconRound icon={fileIcon} size="sm" />
        <h2 className="text-2xl font-bold text-blue-900">Application Info</h2>
      </div>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and{" "}
      </p>
      <div className="space-y-1">
        <h3 className="text-xl text-primary font-semibold">Current Address</h3>
        <Button size="sm">
          <PlusCircleIcon className="size-5" />
          <span>Add Current Address</span>
        </Button>
      </div>
      <div className="space-y-1">
        <h3 className="text-xl text-primary font-semibold">Past Address</h3>
        <div className="flex items-center gap-2">
          <Checkbox />
          <span> Not Applicable</span>
        </div>

        <Button size="sm">
          <PlusCircleIcon className="size-5" />
          <span>Add Past Address</span>
        </Button>
      </div>

      {/* <div className="flex justify-center">
        <Button type="submit" size="lg" className="w-3/5">
          Save & Next
        </Button>
      </div> */}
    </div>
  );
}
