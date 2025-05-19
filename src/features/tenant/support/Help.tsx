import { PageTitle } from "@/components/PageTitle";
import { IconCard } from "@/components/IconCard";

import questionMarkImg from "@/assets/images/question-mark.png";
import customerServiceImg from "@/assets/images/customer-service.png";

export default function Help() {
  return (
    <div className="space-y-5">
      <PageTitle title="Help" />
      <div className="grid grid-cols-2 gap-5">
        <IconCard
          title="Questions About the Rental?"
          description="Lorem Ipsum is simply dummy text"
          icon={questionMarkImg}
          actionText="Message landlord"
          url="/messages"
        />
        <IconCard
          title="Veorent Questions?"
          description="Lorem Ipsum is simply dummy text"
          icon={customerServiceImg}
          actionText="Veorent Support"
          url="/support"
        />
      </div>
    </div>
  );
}
