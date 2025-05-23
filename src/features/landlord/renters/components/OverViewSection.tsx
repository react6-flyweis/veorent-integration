import occupantsIcon from "../assets/occupants.png";
import coinBagIcon from "../assets/coin-bag.png";
import calendarIcon from "../assets/calendar.png";
import cakeIcon from "../assets/cake.png";
import pawIcon from "../assets/paw.png";
import smokingIcon from "../assets/smoking.png";

interface OverviewItemProps {
  icon: string;
  title: string;
  value: string;
}

const OverviewCard: React.FC<OverviewItemProps> = ({
  icon: Icon,
  title,
  value,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg bg-blue-100 p-4 shadow transition-shadow hover:shadow-md">
      <img src={Icon} alt={title} className="mb-2 max-h-11 max-w-11" />
      <h3 className="font-semibold text-gray-600 uppercase">{title}</h3>
      <p className="text-lg font-bold text-gray-600">{value}</p>
    </div>
  );
};

const overviewData: OverviewItemProps[] = [
  {
    icon: occupantsIcon,
    title: "Occupants",
    value: "1 People",
  },
  {
    icon: coinBagIcon,
    title: "Monthly Income",
    value: "£3,000",
  },
  {
    icon: calendarIcon,
    title: "Desired Move-in",
    value: "08/17/2024",
  },
  {
    icon: cakeIcon,
    title: "Birthday",
    value: "1920/01/01",
  },
  {
    icon: pawIcon,
    title: "Pets",
    value: "Yes",
  },
  {
    icon: smokingIcon,
    title: "Smoking",
    value: "No",
  },
];

const OverViewSection: React.FC = () => {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {overviewData.map((item) => (
        <OverviewCard
          key={item.title}
          icon={item.icon}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default OverViewSection;
