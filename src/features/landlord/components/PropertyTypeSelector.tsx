import { Card, CardContent } from "@/components/ui/card";

import marketingImg from "@/assets/images/marketing.png";
import sofaImg from "@/assets/images/sofa.png";
import apartmentImg from "@/assets/images/apartment.png";
import townhouseImg from "@/assets/images/townhouse.png";
import villaImg from "@/assets/images/villa.png";
import skyscraperImg from "@/assets/images/skyscraper.png";
import factoryImg from "@/assets/images/factory.png";
import requestImg from "@/assets/images/request.png";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const propertyTypes = [
  {
    label: "Marketing",
    image: marketingImg,
    key: "marketing",
  },
  {
    label: "Furnished Home",
    image: sofaImg,
    key: "furnished-home",
  },
  {
    label: "Apartment",
    image: apartmentImg,
    key: "apartment",
  },
  {
    label: "Townhouse",
    image: townhouseImg,
    key: "townhouse",
  },
  {
    label: "Condo",
    image: villaImg,
    key: "condo",
  },
  {
    label: "Multi-Family",
    image: skyscraperImg,
    key: "multi-family",
  },
  {
    label: "Manufactured",
    image: factoryImg,
    key: "manufactured",
  },
  {
    label: "Other",
    image: requestImg,
    key: "other",
  },
];

const PropertyTypeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <RadioGroup
      onValueChange={onChange}
      defaultValue={value}
      className="mt-2 grid grid-cols-4 gap-4"
    >
      {propertyTypes.map((type) => (
        <label key={type.key} htmlFor={type.key} className="cursor-pointer">
          <Card
            className={`border-input relative cursor-pointer gap-0 border p-2 ${
              value === type.key && "border-primary bg-blue-50"
            }`}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
              <div className="absolute top-4 left-4">
                <RadioGroupItem value={type.key} id={type.key} />
              </div>
              <img src={type.image} alt={type.label} className="size-12" />
              <span className="text-primary text-lg">{type.label}</span>
            </CardContent>
          </Card>
        </label>
      ))}
    </RadioGroup>
  );
};

export default PropertyTypeSelector;
