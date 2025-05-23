import { SwissFrancIcon } from "lucide-react";
import bankIcon from "../assets/bank.png"; // Assuming you have a bank icon

interface InfoCardProps {
  title: string;
  description: string;
  amount: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, amount }) => {
  return (
    <div className="mb-4 overflow-hidden rounded-lg border bg-white shadow">
      <div className="flex justify-between bg-gray-100 p-2">
        <h3 className="font-bold text-black">{title}</h3>
        <p className="flex items-center gap-1 font-bold">
          <div className="flex size-4 items-center justify-center rounded-full border border-black">
            <SwissFrancIcon className="size-3" />
          </div>
          {amount}
          <span className="text-sm">/ mo</span>
        </p>
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default function IncomeEmploymentSection() {
  return (
    <div>
      <InfoCard
        title="Income"
        description="Marketing Consulting"
        amount="3,500"
      />
      <InfoCard
        title="Past Employer"
        description='Applicant selected "Not Applicable"'
        amount="3,500"
      />

      <div className="flex items-center rounded-lg border bg-white p-3 shadow">
        <img
          src={bankIcon}
          alt={"Bank of Africa"}
          className="mr-2 max-h-12 max-w-12"
        />
        <div>
          <p className="text-sm text-gray-500">FINANCIAL INSTITUTION</p>
          <p className="font-semibold text-gray-700">Bank of Africa</p>
        </div>
      </div>
    </div>
  );
}
