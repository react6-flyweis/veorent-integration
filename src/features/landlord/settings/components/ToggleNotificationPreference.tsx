import { useId, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BellIcon, MailIcon, PhoneIcon, type LucideIcon } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/Loader";

const titleMap: Record<keyof INotificationChannel, string> = {
  PushNotification: "Push Notifications",
  Email: "Email Notifications",
  Call: "Call Notifications",
};

const iconMap: Record<keyof INotificationChannel, LucideIcon> = {
  PushNotification: BellIcon,
  Email: MailIcon,
  Call: PhoneIcon,
};

export interface NotificationPreference {
  type: keyof INotificationChannel;
  isEnabled?: boolean;
  onChange?: (isEnabled: boolean) => void;
}

export function SingleTogglePreference({
  type,
  isEnabled,
  onChange,
}: NotificationPreference) {
  const id = useId();
  const [isToggleEnabled, setIsEnabled] = useState(isEnabled ?? false);
  const title = titleMap[type];
  const Icon = iconMap[type];

  const handleToggle = (value: string) => {
    const newValue = value === "on";
    setIsEnabled(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // const description =
  //   type === "summary"
  //     ? "Lorem ipsum dolor sit amet consectetur adipisicing elit"
  //     : null;

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
              "text-base font-semibold",
              // type === "summary" && "text-lg",
            )}
            htmlFor={`${id}-toggle`}
          >
            {title}
          </Label>
          {/* {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )} */}
        </div>
      </div>
      <div className="flex gap-2">
        {isEnabled !== isToggleEnabled && <Loader size="sm" />}
        <RadioGroup
          disabled={isEnabled !== undefined && isEnabled !== isToggleEnabled}
          defaultValue={isToggleEnabled ? "on" : "off"}
          onValueChange={handleToggle}
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
    </div>
  );
}

// export interface ToggleNotificationPreferencesProps {
//   preferences: NotificationPreference[];
// }

// export const ToggleNotificationPreferences: FC<> = ({ preferences }) => {
//   // const summaries = preferences.filter(
//   //   (preference) => preference.type === "summary",
//   // );
//   // const nonSummaries = preferences.filter(
//   //   (preference) => preference.type !== "summary",
//   // );
//   return (
//     <div className="space-y-1">
//       {preferences.map((preference) => (
//         <SingleTogglePreference onChange={() => {}} preference={preference} />
//       ))}
//       {/* {summaries.length ? (
//         <div className="">
//           <Separator className="my-1" />
//           <div className="flex gap-3">
//             <MailIcon className="size-4" />
//             <p className="font-semibold">Email Summary</p>
//           </div>
//           <div className="pl-7">
//             {summaries.map((preference) => (
//               <SingleTogglePreference
//                 key={preference.label}
//                 onChange={() => {}}
//                 preference={preference}
//               />
//             ))}
//           </div>
//         </div>
//       ) : (
//         ""
//       )} */}
//     </div>
//   );
// };
