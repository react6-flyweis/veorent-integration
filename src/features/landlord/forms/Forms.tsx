import { PageTitle } from "@/components/PageTitle";
import { FormCard } from "./components/FormCard";
import { DownloadableFormCard } from "./components/DownloadableFormCard";
import { Button } from "@/components/ui/button";

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
          url="/landlord/lease-agreement"
        />

        <FormCard
          title="Lease Agreement Addendum"
          description="Amends your lease agreement to change the lease term, rent amount, deposit amounts or other provisions."
          buttonText="Start Addendum"
          url="/landlord/lease-addendum"
        />

        <FormCard
          title="Customizable Condition Report"
          description="Set up spaces specific to your rental. Then, send it to your tenants to document the property's condition or complete it yourself."
          buttonText="Start Report"
        />
      </div>

      {/* Downloadable Forms Section */}
      <div className="mt-16 mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col justify-between @md:flex-row">
            <span className="text-lg font-medium text-blue-500 uppercase">
              DOWNLOADABLE FORMS
            </span>
            <Button>Get The Forms Pack</Button>
          </div>
          <h2 className="mt-1 text-xl font-bold">Essential Forms You Need</h2>
          <p className="mt-2 max-w-3xl text-gray-700">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-sm bg-orange-400"></div>
              <span>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </span>
            </li>
          </ul>
        </div>

        <div className="mt-8">
          <h3 className="mb-4 text-lg font-semibold">Preview the Forms Pack</h3>
          <div className="grid grid-cols-1 gap-5">
            <DownloadableFormCard title="Lease Agreement Addendum" />
            <DownloadableFormCard title="Co-Signer Agreement" />
            <DownloadableFormCard title="Pet Addendum" />
            <DownloadableFormCard title="Security Deposit Closing Statement" />
            <DownloadableFormCard title="Rent Increase Notice" />
            <DownloadableFormCard title="Notice to Pay Rent or Quit" />
            <DownloadableFormCard title="Cleaning Required Notice" />
            <DownloadableFormCard title="Noise Complaint Letter" />
            <DownloadableFormCard title="Notice of Returned Check" />
            <DownloadableFormCard title="Operating Budget Worksheet" />
            <DownloadableFormCard title="Preventative Maintenance Schedule" />
            <DownloadableFormCard title="Property Make-Ready Checklist" />
            <DownloadableFormCard title="Tenant's Notice of Termination" />
            <DownloadableFormCard title="Tenant Estoppel Certificate" />
            <DownloadableFormCard title="Property Rules and Regulations" />
            <DownloadableFormCard title="Trust Account Ledger" />
            <DownloadableFormCard title="Welcome Letter" />
            <DownloadableFormCard title="24 Hour Notice to Enter" />
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-10 rounded-lg bg-blue-200 p-4">
        <h4 className="font-semibold">DISCLAIMER:</h4>
        <p className="text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>
      </div>
    </div>
  );
}
