import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { HouseIcon } from "lucide-react";

import { CreateButton } from "@/components/CreateButton";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";

import { PropertyCard } from "./components/PropertyCard";
import { useGetProperties } from "../api/queries";

export default function Properties() {
  const { t } = useTranslation();

  const { data: properties, isLoading } = useGetProperties();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <PageTitle title={t("properties")} className="mb-0" />
        <Link to="/landlord/properties/add">
          <CreateButton label={t("addNewProperty")} />
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <div className="flex w-full items-center justify-center">
            <p className="text-lg text-gray-500">{t("loadingProperties")}</p>
          </div>
        ) : properties?.length ? (
          properties?.map((property) =>
            property.propertyTypeId?.name === "Multiple" ? (
              <PropertyCard property={property} />
            ) : (
              <Link
                to={`/landlord/properties/${property._id}`}
                key={property._id}
              >
                <PropertyCard property={property} />
              </Link>
            ),
          )
        ) : (
          <div className="flex w-full items-center justify-center">
            <p className="text-lg text-gray-500">{t("noPropertiesFound")}</p>
          </div>
        )}
      </div>

      <Link to="/landlord/properties/add">
        <Button
          className="mt-6 flex h-24 w-full flex-col items-center justify-center gap-2 border-dashed"
          variant="outline"
        >
          <HouseIcon className="size-7" />
          <span className="font-medium tracking-wide uppercase">
            {t("addProperty")}
          </span>
        </Button>
      </Link>
    </div>
  );
}
