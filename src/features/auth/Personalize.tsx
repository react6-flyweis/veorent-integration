import tenantIcon from "@/assets/icons/tenant.png";
import landlordIcon from "@/assets/icons/landlord.png";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Personalize() {
  return (
    <div className="h-full pt-10">
      <div className="flex justify-between items-center mb-8 gap-5">
        <img src="/logo-dark.png" alt="Veorent Logo" className="h-6" />
        <div className="rounded border border-primary flex justify-center items-center px-3 py-2">
          <span className="text-xl font-semibold">Tenant Login</span>
        </div>
        <div className="rounded border border-primary flex justify-center items-center px-3 py-2">
          <span className="text-xl font-semibold">Landlord Login</span>
        </div>
      </div>
      <h2 className="text-3xl font-semibold my-5">
        Lets personalize your experience.
      </h2>

      <RadioGroup defaultValue="tenant">
        <div className="flex gap-5 px-5 justify-between">
          <label htmlFor="tenant" className="cursor-pointer flex-1">
            <div className="rounded-2xl border border-primary flex flex-col justify-center items-center px-3 py-2 cursor-pointer">
              <div className="w-full">
                <RadioGroupItem value="tenant" id="tenant" />
              </div>
              <img className="size-11" src={tenantIcon} alt="" />
              <span className="text-2xl font-semibold">Tenant Login</span>
            </div>
          </label>

          <label htmlFor="landlord" className="cursor-pointer flex-1">
            <div className="rounded-2xl  border border-primary flex flex-col justify-center items-center px-3 py-2 cursor-pointer">
              <div className="w-full">
                <RadioGroupItem value="landlord" id="landlord" />
              </div>
              <img className="size-11" src={landlordIcon} alt="" />
              <span className="text-2xl font-semibold">Landlord Login</span>
            </div>
          </label>
        </div>
      </RadioGroup>

      <div className="flex justify-center py-10">
        <Button className="w-3/5" size="lg">
          Continue
        </Button>
      </div>
    </div>
  );
}
