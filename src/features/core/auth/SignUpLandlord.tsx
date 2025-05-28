import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropertyTypeSelection } from "./components/PropertyTypeSelection";
import { StartupOptionSelection } from "./components/StartupOptionSelection";
import { RentalProcessSelection } from "./components/RentalProcessSelection";
import { Form } from "@/components/ui/form";
import {
  MultiStepper,
  MultiStepperHeader,
  MultiStepperStep,
  MultiStepperButton,
} from "@/components/MultiStepper";

const formSchema = z.object({
  fName: z.string().min(2, "First name is required."),
  lName: z.string().optional(),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  startupOption: z.string().min(1, "Please select where you'd like to start"),
  propertyType: z.string().min(1, "Please select a property type"),
  rentalProcess: z.string().min(1, "Please select your rental process stage"),
});

type SignUpFormValues = z.infer<typeof formSchema>;

export default function SignUpLandlord() {
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      startupOption: "",
      propertyType: "",
      rentalProcess: "",
    },
  });

  const onSubmit = (values: SignUpFormValues) => {
    console.log("Form submitted:", values);
    // Handle form submission
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepper>
            <MultiStepperHeader>
              <div className="mb-6 flex items-center justify-between">
                <img src="/logo-dark.png" alt="Veorent Logo" className="h-8" />
                <div className="border-primary flex items-center justify-center rounded border px-3 py-2">
                  <span className="text-2xl font-semibold">Landlord Login</span>
                </div>
              </div>
            </MultiStepperHeader>

            {/* Step 1: Startup Option Selection */}
            <MultiStepperStep onValidate={() => form.trigger("startupOption")}>
              <StartupOptionSelection
                control={form.control}
                name="startupOption"
                title="Where would you like to start?"
                subtitle="Get started in only a few minutes!"
              />
            </MultiStepperStep>

            {/* Step 2: Property Type Selection */}
            <MultiStepperStep onValidate={() => form.trigger("propertyType")}>
              <PropertyTypeSelection
                control={form.control}
                name="propertyType"
                title="Which best describes your property?"
                subtitle="This allows us to better tailor your experience."
              />
            </MultiStepperStep>

            {/* Step 3: Rental Process Selection */}
            <MultiStepperStep onValidate={() => form.trigger("rentalProcess")}>
              <RentalProcessSelection
                control={form.control}
                name="rentalProcess"
                title="What part of the rental process are you in for"
                subtitle="Your address displays here."
              />
            </MultiStepperStep>
            <MultiStepperButton />
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
