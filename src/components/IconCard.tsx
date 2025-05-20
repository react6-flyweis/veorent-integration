import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export const IconCard = ({
  icon,
  title,
  description,
  actionText,
  className,
  onAction,
  url,
  ...props
}: {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  className?: string;
  onAction?: () => void;
  url?: string;
}) => {
  return (
    <Card {...props} className={cn(className)}>
      <CardContent className="flex flex-col items-center">
        <IconRound icon={icon} />
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardContent>
      {actionText && (
        <CardFooter>
          <Button
            size="lg"
            className="w-full"
            onClick={onAction}
            asChild={!!url}
          >
            {url ? (
              <Link to={url}>{actionText}</Link>
            ) : (
              <span> {actionText}</span>
            )}
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
