import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetPropertyTypes } from "../api/queries";

// const propertyTypes = [
//   {
//     label: "Marketing",
//     image: marketingImg,
//     _id: "marketing",
//   },
//   {
//     label: "Furnished Home",
//     image: sofaImg,
//     _id: "furnished-home",
//   },
//   {
//     label: "Apartment",
//     image: apartmentImg,
//     _id: "apartment",
//   },
//   {
//     label: "Townhouse",
//     image: townhouseImg,
//     _id: "townhouse",
//   },
//   {
//     label: "Condo",
//     image: villaImg,
//     _id: "condo",
//   },
//   {
//     label: "Multi-Family",
//     image: skyscraperImg,
//     _id: "multi-family",
//   },
//   {
//     label: "Manufactured",
//     image: factoryImg,
//     _id: "manufactured",
//   },
//   {
//     label: "Other",
//     image: requestImg,
//     _id: "other",
//   },
// ];

export const PropertyTypeSelector = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const { data, isLoading } = useGetPropertyTypes();

  if (isLoading) {
    return (
      <div className="mt-2 grid grid-cols-2 gap-4 @md:grid-cols-3 @lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Card key={index} className="border-input border p-2">
            <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
              <div className="absolute top-4 left-4">
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
              <Skeleton className="size-12" />
              <Skeleton className="h-6 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <RadioGroup
      onValueChange={onChange}
      defaultValue={value}
      className="mt-2 grid grid-cols-2 gap-4 @md:grid-cols-3 @lg:grid-cols-4"
    >
      {data?.map((type) => (
        <label key={type._id} htmlFor={type._id} className="cursor-pointer">
          <Card
            className={`border-input relative cursor-pointer gap-0 border p-2 ${
              value === type._id && "border-primary bg-blue-50"
            }`}
          >
            <CardContent className="flex flex-col items-center justify-center gap-2 p-4">
              <div className="absolute top-4 left-4">
                <RadioGroupItem value={type._id} id={type._id} />
              </div>
              <img src={type.image} alt={type.name} className="size-12" />
              <span className="text-primary text-lg">{type.name}</span>
            </CardContent>
          </Card>
        </label>
      ))}
    </RadioGroup>
  );
};
