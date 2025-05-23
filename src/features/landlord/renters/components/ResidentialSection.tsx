interface ResidentialEntryProps {
  type: "Current Address" | "Past Address";
  street: string;
  date: string;
  rentAmount: string;
}

const ResidentialEntry: React.FC<ResidentialEntryProps> = ({
  type,
  street,
  date,
  rentAmount,
}) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border bg-white shadow">
      <div className="bg-gray-100 p-2">
        <h3 className="text-md font-bold text-black">{type}</h3>
      </div>
      <div className="p-3">
        <div className="flex flex-col space-y-2 md:flex-row md:justify-between md:space-y-0">
          <p className="text-sm font-bold">{street}</p>
          <p className="text-sm font-bold">Date: {date}</p>
          <p className="text-sm font-bold">Rent amount: ${rentAmount}</p>
        </div>
      </div>
    </div>
  );
};

const residentialHistoryData: ResidentialEntryProps[] = [
  {
    type: "Current Address",
    street: "1234 E 89th St.",
    date: "08/19/2024",
    rentAmount: "100.00",
  },
  {
    type: "Past Address",
    street: "1234 E 89th St.",
    date: "08/19/2024",
    rentAmount: "100.00",
  },
  {
    type: "Past Address",
    street: "1234 E 89th St.",
    date: "08/19/2024",
    rentAmount: "100.00",
  },
];

export default function ResidentialSection() {
  return (
    <div>
      {residentialHistoryData.map((entry, index) => (
        <ResidentialEntry
          key={index}
          type={entry.type}
          street={entry.street}
          date={entry.date}
          rentAmount={entry.rentAmount}
        />
      ))}
    </div>
  );
}
