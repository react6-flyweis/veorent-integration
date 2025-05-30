import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import setupListingImage from "./assets/setup-listing.gif";
import { PageTitle } from "@/components/PageTitle";

export default function SetupListingPrompt() {
  return (
    <div>
      <PageTitle title="Set Up Your Property Listing" withBack />

      <Card className="rounded-none border-0 bg-blue-200 p-4">
        <p className="text-primary text-sm">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magnam odio
          omnis explicabo. Fuga adipisci sit totam quam fugit? Officiis autem,
          natus laboriosam cumque pariatur vitae totam id dolores inventore
          suscipit libero aspernatur veniam nobis ullam ipsa ipsum aut beatae
          dolore architecto ut minus maiores quas aliquam? Fugiat asperiores
          veritatis commodi.
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
