import { PageTitle } from "@/components/PageTitle";
import { FormCard } from "./components/FormCard";

export default function Forms() {
  return (
    <div className="">
      <PageTitle title="Forms" />

      <div className="mt-2 mb-6">
        <span className="text-sm font-medium text-blue-500 uppercase">
          INTERACTIVE FORMS
        </span>
        <h2 className="mt-1 text-xl font-bold">Build Your Own Forms</h2>
        <p className="mt-2 max-w-3xl text-gray-700">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>
      </div>

      <div className="mt-6 space-y-4">
        <FormCard
          title="State-Specific Lease Agreement"
          description="Drafted by a legal professionals to keep you compliant and covered."
          buttonText="Start Lease"
          onButtonClick={() => console.log("Start Lease clicked")}
        />

        <FormCard
          title="Lease Agreement Addendum"
          description="Amends your lease agreement to change the lease term, rent amount, deposit amounts or other provisions."
          buttonText="Start Addendum"
          onButtonClick={() => console.log("Start Addendum clicked")}
        />

        <FormCard
          title="Customizable Condition Report"
          description="Set up spaces specific to your rental. Then, send it to your tenants to document the property's condition or complete it yourself."
          buttonText="Start Report"
          onButtonClick={() => console.log("Start Report clicked")}
        />
      </div>
    </div>
  );
}
