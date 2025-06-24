import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";

import listingImage from "../assets/listing.png";
import setupListingImage from "../assets/setup-listing.gif";

interface ListingSuccessScreenProps {
  propertyName?: string;
}

export const ListingSuccessScreen = ({
  propertyName,
}: ListingSuccessScreenProps) => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/landlord/properties");
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-2 flex items-center gap-3">
        <IconRound icon={listingImage} size="sm" />
        <h2 className="text-2xl font-bold">
          Your Listing Is Successfully Published
        </h2>
      </div>

      {propertyName && (
        <div className="text-primary mb-5 text-xl">{propertyName}</div>
      )}

      <div className="flex justify-center">
        <img
          src={setupListingImage}
          alt="Setup Listing"
          className="w-full max-w-md rounded-lg shadow-lg"
        />
      </div>
      <div className="flex items-center justify-center">
        <Button className="w-4/5 @lg:w-3/5" onClick={handleBackClick}>
          {t("back")}
        </Button>
      </div>
    </div>
  );
};
