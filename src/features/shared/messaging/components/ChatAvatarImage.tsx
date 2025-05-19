import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-orange-500",
  "bg-teal-500",
];

// Optional: Generate consistent color per user name
const getColorClass = (name: string) => {
  const hash = [...name].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return bgColors[hash % bgColors.length];
};

export function ChatAvatarImage({
  avatar,
  name,
}: {
  name: string;
  avatar: string;
}) {
  return (
    <Avatar className="size-10">
      <AvatarImage src={avatar} />
      <AvatarFallback
        className={`text-white font-semibold ${getColorClass(name)}`}
      >
        {name
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
}
