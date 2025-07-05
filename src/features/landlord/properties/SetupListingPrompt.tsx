import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import setupListingImage from "./assets/setup-listing.gif";

export default function SetupListingPrompt() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  return (
    <div>
      <PageTitle title={t("setUpYourPropertyListing")} withBack />

      <Card className="rounded-none border-0 bg-blue-200 p-4">
        <p className="text-primary text-sm">
          {t("setUpListingPromptDescription")}
        </p>
      </Card>

      <div className="flex justify-center">
        <img
          src={setupListingImage}
          alt="Property listing illustration"
          className="h-68 w-68 object-contain"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link to="/landlord/properties">
          <Button variant="outlinePrimary" className="w-full">
            {t("skipForNow")}
          </Button>
        </Link>
        <Link to={`/landlord/properties/${id}/setup`}>
          <Button className="w-full">{t("setUpMyListing")}</Button>
        </Link>
      </div>
    </div>
  );
}
