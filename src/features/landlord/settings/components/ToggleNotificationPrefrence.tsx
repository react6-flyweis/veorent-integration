import { useId, useState, type FC } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BellIcon, MailIcon, PhoneIcon, type LucideIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const titleMap: Record<string, string> = {
  push: "Push Notifications",
  email: "Email Notifications",
  call: "Call Notifications",
};

const iconMap: Record<string, LucideIcon> = {
  push: BellIcon,
  email: MailIcon,
  call: PhoneIcon,
};

export interface NotificationPreference {
  type?: string;
  label?: string;
  description?: string;
}

export const SingleTogglePreference: FC<{
  preference: NotificationPreference;
  onChange: (id: string, isEnabled: boolean) => void;
}> = ({ preference }) => {
  const id = useId();
  const [isEnabled, setIsEnabled] = useState<boolean>(false);
  const title = titleMap[preference.type || ""] || null;
  const Icon = iconMap[preference.type || ""];

  const description =
    preference.type === "summary"
      ? "Lorem ipsum dolor sit amet consectetur adipisicing elit"
      : null;

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex gap-3">
        {Icon && (
          <div className="">
            <Icon className="size-4" />
          </div>
        )}
        <div className="flex flex-col">
          <Label
            className={cn(
              "font-semibold",
              preference.type !== "summary" && "text-base",
            )}
            htmlFor={`${id}-toggle`}
          >
            {title || preference.label}
          </Label>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
      </div>
      <RadioGroup
        defaultValue={isEnabled ? "on" : "off"}
        onValueChange={(value) => setIsEnabled(value === "on")}
        className="flex items-center space-x-2"
      >
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="off" id={`${id}-off`} />
          <Label htmlFor={`${id}-off`}>Off</Label>
        </div>
        <div className="flex items-center space-x-1">
          <RadioGroupItem value="on" id={`${id}-on`} />
          <Label htmlFor={`${id}-on`}>On</Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export interface ToggleNotificationPreferencesProps {
  preferences: NotificationPreference[];
}
export const ToggleNotificationPreferences: FC<
  ToggleNotificationPreferencesProps
> = ({ preferences }) => {
  const summaries = preferences.filter(
    (preference) => preference.type === "summary",
  );
  const nonSummaries = preferences.filter(
    (preference) => preference.type !== "summary",
  );
  return (
    <div className="space-y-1">
      {nonSummaries.map((preference) => (
        <SingleTogglePreference onChange={() => {}} preference={preference} />
      ))}
      {summaries.length ? (
        <div className="">
          <Separator className="my-1" />
          <div className="flex gap-3">
            <MailIcon className="size-4" />
            <p className="font-semibold">Email Summary</p>
          </div>
          <div className="pl-7">
            {summaries.map((preference) => (
              <SingleTogglePreference
                key={preference.label}
                onChange={() => {}}
                preference={preference}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

// Original interface for backward compatibility
export interface NotificationChannelProps {
  channelType: "push" | "email" | "call" | "summary";
  summaryType?: string;
  summaryLabel?: string;
  isEnabled: boolean;
  onChange: (value: boolean) => void;
}
