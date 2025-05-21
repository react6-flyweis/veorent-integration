import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRef, useState } from "react";

import fingerSnapIcon from "./assets/finger-snap.png";
import balanceIcon from "./assets/balance.png";
import smoothPenIcon from "./assets/smooth-pen.png";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PageTitle } from "@/components/PageTitle";

export default function SelectLeaseAddendum() {
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>();
  const stepperRef = useRef<MultiStepperRef>(null);
  const handleContinue = () => {
    if (stepperRef.current) {
      stepperRef.current.goNext();
    }
  };

  // Mock addresses - replace with actual data in production
  const addresses = [
    "123 Main St, Apt 4, City, State 12345",
    "456 Elm St, City, State 12345",
    "789 Oak Ave, City, State 12345",
  ];

  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperStep>
        <div className="flex flex-col">
          <PageTitle title="Select Which Lease Needs an Addendum" withBack />

          <div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">Lease</label>
              <Select
                value={selectedAddress}
                onValueChange={setSelectedAddress}
              >
                <SelectTrigger className="w-full rounded-md border p-3">
                  <SelectValue placeholder="Choose an address" />
                </SelectTrigger>
                <SelectContent>
                  {addresses.map((address, index) => (
                    <SelectItem key={index} value={address}>
                      {address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-center">
              <Button
                className="w-3/5"
                size="lg"
                disabled={!selectedAddress}
                onClick={handleContinue}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </MultiStepperStep>
      <MultiStepperStep>
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-5">
            <MultiStepperBackButton />
            <h2 className="text-2xl font-semibold">
              Select Your Lease Addendum
            </h2>
          </div>
          <p className="font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard
          </p>
          <div className="mt-6 flex flex-col space-y-6">
            <Card className="gap-0 rounded-lg bg-blue-200 py-2">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  The most common reasons for using an addendum are:
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center">
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className="flex items-center">
                      <div className="mt-1 mr-2 h-4 w-4 rounded-sm bg-orange-400"></div>
                      <p className="text-sm">
                        Lorem ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">Why use our addendum?</h3>

              <div className="space-y-6">
                {[
                  {
                    icon: fingerSnapIcon,
                    title: "Easy to Fill Out",
                    description:
                      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
                  },
                  {
                    icon: balanceIcon,
                    title: "Legal Confidence",
                    description:
                      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
                  },
                  {
                    icon: smoothPenIcon,
                    title: "Fast to Sign",
                    description:
                      "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="mr-4 max-h-8 max-w-9 flex-shrink-0"
                    />
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-primary text-sm">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button
                className="w-3/5 bg-blue-950 text-white"
                size="lg"
                onClick={() => {}}
              >
                Sounds Good
              </Button>
            </div>
          </div>
        </div>
      </MultiStepperStep>
    </MultiStepper>
  );
}
