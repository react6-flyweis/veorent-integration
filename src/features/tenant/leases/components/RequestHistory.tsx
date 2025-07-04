import { useTranslation } from "react-i18next";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Request = {
  id: number;
  title: string;
  category: string;
  date: string;
  status: string;
};

const groupedData: Record<string, Request[]> = {
  "1/Sep/2024": [
    {
      id: 123456,
      title: "Miscellaneous",
      category: "Misc",
      date: "2024-09-01",
      status: "Work Completed",
    },
  ],
  "21/Sep/2024": [
    {
      id: 123455,
      title: "Pest Control",
      category: "Ants",
      date: "2024-09-21",
      status: "Work Completed",
    },
  ],
  "22/Sep/2024": [
    {
      id: 123455,
      title: "Pest Control",
      category: "Ants",
      date: "2024-09-21",
      status: "Work Completed",
    },
  ],
  "7/Sep/2024": [
    {
      id: 123454,
      title: "Plumbing",
      category: "Toilet",
      date: "2024-09-07",
      status: "Work Completed",
    },
  ],
};

export function RequestHistory() {
  const { t } = useTranslation();
  return (
    <div className="space-y-6">
      {Object.entries(groupedData).map(([date, requests]) => (
        <div key={date}>
          <div className="bg-accent text-primary px-4 py-2 text-lg font-semibold">
            {date}
          </div>
          <ScrollArea>
            {requests.map((req) => (
              <Card key={req.id} className="mt-1 border py-0">
                <CardContent className="flex items-center justify-between p-3!">
                  <div>
                    <p className="text-primary text-lg font-bold">
                      {t("request")} #{req.id}
                    </p>
                    <p className="text-muted-foreground">
                      {t(req.title)} - {t(req.category)}
                    </p>
                  </div>
                  <p className="text-muted-foreground">{t(req.status)}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
        </div>
      ))}
    </div>
  );
}
