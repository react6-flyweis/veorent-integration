import { Button } from "@/components/ui/button";
import { HouseIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ListingSuccessScreenProps {
  address?: string;
}

export const ListingSuccessScreen = ({
  address = "123 Main St.",
}: ListingSuccessScreenProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/landlord/properties");
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-2 flex items-center">
        <div className="rounded-full bg-blue-100 p-2">
          <HouseIcon className="h-6 w-6 text-blue-600" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900">
          Your Listing Is Successfully Published
        </h2>
      </div>
      <p className="text-gray-600">{address}</p>
      <div className="min-h-52 flex-1"></div>
      <div className="flex items-center justify-center">
        <Button className="w-4/5 @lg:w-3/5" onClick={handleBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};
