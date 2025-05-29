import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import setupListingImage from "./assets/setup-listing.gif";
import { PageTitle } from "@/components/PageTitle";

export default function SetupListingPrompt() {
  return (
    <div>
      <PageTitle title="Set Up Your Property Listing" withBack />

      <Card className="mb-5 bg-blue-50 p-3">
        <p className="text-gray-700">
          Creating a property listing helps you attract potential tenants and
          manage your rental efficiently. You'll provide details about your
          property, set rental terms, and upload photos to make your listing
          stand out.
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
          <Button variant="outline" className="w-full">
            Skip For Now
          </Button>
        </Link>
        <Link to="/landlord/properties/setup">
          <Button className="w-full">Set Up My Listing</Button>
        </Link>
      </div>
    </div>
  );
}
