import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconRound } from "@/components/IconRound";

import documentsIcon from "./assets/documents.png";
import applicationIcon from "./assets/application.png";

export default function WhatsNext() {
  return (
    <div className="space-y-6">
      <PageTitle title="What's next for you?" withBack />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {[
          {
            title: "Create a lease agreement",
            icon: documentsIcon,
            description: "Stay compliant with Veorent lease agreements.",
            buttonText: "Get a lease agreement",
            isRecommended: true,
          },
          {
            title: "Store a lease document",
            icon: applicationIcon,
            description:
              "Stay organized by storing all lease documents in one place.",
            buttonText: "Upload a document",
          },
        ].map((item, index) => (
          <Card key={index} className="relative justify-between gap-2 pt-7">
            {item.isRecommended && (
              <div className="absolute top-0 left-1/2 translate-x-[-50%] translate-y-[-50%]">
                <Badge
                  variant="secondary"
                  className="bg-blue-500 font-semibold hover:bg-blue-600"
                >
                  RECOMMENDED
                </Badge>
              </div>
            )}
            <CardContent className="gap flex flex-col items-center px-3 text-center">
              <IconRound icon={item.icon} />
              <h3 className="mb-2 flex-1 text-lg font-bold">{item.title}</h3>
              <p className="text-muted-foreground font-semibold">
                {item.description}
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button size="lg" className="w-full">
                {item.buttonText}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center">
        <Button size="lg" className="w-3/5">
          Skip For Now
        </Button>
      </div>
    </div>
  );
}
