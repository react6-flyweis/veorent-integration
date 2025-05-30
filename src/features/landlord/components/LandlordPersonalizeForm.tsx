import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState, useEffect } from "react";

export type LandlordFormData = {
  rentalType: string;
  propertiesCount: number;
  managementExperience: string;
  referralSource?: string;
};

interface LandlordPersonalizeFormProps {
  onSubmit: (data: LandlordFormData) => void;
  defaultData?: LandlordFormData;
  submitButtonHidden?: boolean;
}

export function LandlordPersonalizeForm({
  onSubmit,
  defaultData = {
    rentalType: "own",
    propertiesCount: 0,
    managementExperience: "",
    referralSource: "",
  },
  submitButtonHidden = false,
}: LandlordPersonalizeFormProps) {
  const [formData, setFormData] = useState<LandlordFormData>(defaultData);

  // Update form data when props change
  useEffect(() => {
    if (defaultData) {
      setFormData(defaultData);
    }
  }, [defaultData]);

  // Submit form data when it changes
  useEffect(() => {
    onSubmit(formData);
  }, [formData, onSubmit]);

  const handleRentalTypeChange = (value: string) => {
    setFormData({ ...formData, rentalType: value });
  };

  const handlePropertiesCountChange = (change: number) => {
    const newCount = Math.max(0, formData.propertiesCount + change);
    setFormData({ ...formData, propertiesCount: newCount });
  };

  const handleExperienceChange = (value: string) => {
    setFormData({ ...formData, managementExperience: value });
  };

  const handleReferralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, referralSource: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col space-y-6 py-4">
      <div>
        <h3 className="mb-2 text-xl font-medium">Which best describes you?</h3>
        <RadioGroup
          value={formData.rentalType}
          onValueChange={handleRentalTypeChange}
          className="space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="own" id="own" />
            <label htmlFor="own">I manage my own rental(S)</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="others" id="others" />
            <label htmlFor="others">I manage rentals for others</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mix" id="mix" />
            <label htmlFor="mix">I manage a mix of both</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="none" />
            <label htmlFor="none">I don't manage any rentals yet</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="broker" id="broker" />
            <label htmlFor="broker">I'm an apartment or rental broker</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-medium">
          How many properties do you own/manage?
        </h3>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="size-8 rounded-full"
            onClick={() => handlePropertiesCountChange(-1)}
            disabled={formData.propertiesCount <= 0}
          >
            <MinusIcon className="h-5 w-5" />
          </Button>
          <div className="border-primary flex h-10 items-center justify-center rounded-2xl border px-2">
            <span className="w-8 text-center">{formData.propertiesCount}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            type="button"
            className="size-8 rounded-full"
            onClick={() => handlePropertiesCountChange(1)}
          >
            <PlusIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div>
        <h3 className="mb-2 text-xl font-medium">
          How long have you managed rentals?
        </h3>
        <RadioGroup
          value={formData.managementExperience}
          onValueChange={handleExperienceChange}
          className="space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="less-than-1" id="less-than-1" />
            <label htmlFor="less-than-1">Less than a year</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1-4" id="1-4" />
            <label htmlFor="1-4">1-4 years</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5-10" id="5-10" />
            <label htmlFor="5-10">5-10 years</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="more-than-10" id="more-than-10" />
            <label htmlFor="more-than-10">More than 10 years</label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none-yet" id="none-yet" />
            <label htmlFor="none-yet">I don't manage any rentals yet</label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 className="mb-2 font-medium">
          How did you hear about Veorent? (Optional)
        </h3>
        <Input
          type="text"
          placeholder=""
          value={formData.referralSource}
          onChange={handleReferralChange}
        />
      </div>

      {!submitButtonHidden && (
        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={handleSubmit}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}
