import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export function CreateButton({ label }: { label?: string }) {
  return (
    <Button
      size="icon"
      variant="outline"
      className="group flex items-center justify-center gap-0 rounded-full px-1 shadow-[0_3px_4px_rgba(0,0,0,0.4),inset_0_3px_4px_rgba(0,0,0,0.4)] transition-[width,justify-content] duration-400 ease-in-out hover:w-36 hover:justify-between"
    >
      {label && (
        <div className="max-w-0 overflow-hidden font-semibold whitespace-nowrap opacity-0 transition-all duration-300 ease-in-out group-hover:mr-1 group-hover:max-w-sm group-hover:opacity-100">
          <span className="pl-2"> {label}</span>
        </div>
      )}
      <PlusIcon className="size-6 transition-all duration-300 ease-in-out group-hover:-rotate-90" />
    </Button>
  );
}
