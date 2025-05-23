import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import penApplicationIcon from "@/assets/landlord/icons/pen-application.png";
import { Link } from "react-router";

export const FormCard = ({
  title,
  description,
  buttonText,
  url,
}: {
  title: string;
  description: string;
  buttonText: string;
  url ?: string;
}) => {
  return (
    <Card className="">
      <CardContent className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={penApplicationIcon} className="size-14" />
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <Button className="w-32" asChild>
          <Link to={url ?? "#"} >
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
