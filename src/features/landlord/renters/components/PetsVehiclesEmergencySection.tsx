interface DetailItemProps {
  label: string;
  value1: string;
  value2?: string;
  value3?: string;
  isLink?: boolean;
}

const DetailItem: React.FC<DetailItemProps> = ({
  label,
  value1,
  value2,
  value3,
  isLink,
}) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border bg-white shadow">
      <div className="bg-gray-100 p-2">
        <h3 className="text-md font-bold text-black">{label}</h3>
      </div>
      <div className="p-3">
        <div className="flex flex-col space-y-1 md:flex-row md:justify-between md:space-y-0">
          <p className="text-sm font-bold text-gray-700">{value1}</p>
          {value2 && (
            <p className="text-sm font-bold text-gray-700">{value2}</p>
          )}
          {value3 &&
            (isLink ? (
              <a
                href={`tel:${value3.replace(/\D/g, "")}`}
                className="text-sm font-bold text-blue-600 hover:underline"
              >
                {value3}
              </a>
            ) : (
              <p className="text-sm font-bold text-gray-700">{value3}</p>
            ))}
        </div>
      </div>
    </div>
  );
};

const detailsData: DetailItemProps[] = [
  {
    label: "Pet",
    value1: "Siamese",
    value2: "Cat",
    value3: "10 pounds / 2 years old",
  },
  { label: "Vehicle", value1: "Mazda", value2: "Green / 2015" },
  {
    label: "Emergency Contact",
    value1: "Jane Smith",
    value2: "Relationship: Sister",
    value3: "(303) 987-6543",
    isLink: true,
  },
];

export default function PetsVehiclesEmergencySection() {
  return (
    <div>
      {detailsData.map((item, index) => (
        <DetailItem
          key={index}
          label={item.label}
          value1={item.value1}
          value2={item.value2}
          value3={item.value3}
          isLink={item.isLink}
        />
      ))}
    </div>
  );
}
