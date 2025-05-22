import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import penApplicationIcon from "@/assets/landlord/icons/pen-application.png";

export const FormCard = ({
  title,
  description,
  buttonText,
  onButtonClick,
}: {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => void;
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
        <Button className="w-32" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </CardContent>
    </Card>
  );
};
