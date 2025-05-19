import { z } from "zod";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import {
  MultiStepper,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
} from "@/components/MultiStepper";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { IconRound } from "@/components/IconRound";

import legacyIconImg from "@/assets/icons/legacy.png";
import marketingImg from "@/assets/images/marketing.png";
import sofaImg from "@/assets/images/sofa.png";
import apartmentImg from "@/assets/images/apartment.png";
import townhouseImg from "@/assets/images/townhouse.png";
import villaImg from "@/assets/images/villa.png";
import skyscraperImg from "@/assets/images/skyscraper.png";
import factoryImg from "@/assets/images/factory.png";
import requestImg from "@/assets/images/request.png";
import { zodResolver } from "@hookform/resolvers/zod";

const propertyTypes = [
  {
    label: "Marketing",
    image: marketingImg,
    key: "marketing",
  },
  {
    label: "Furnished Home",
    image: sofaImg,
    key: "furnished-home",
  },
  {
    label: "Apartment",
    image: apartmentImg,
    key: "apartment",
  },
  {
    label: "Townhouse",
    image: townhouseImg,
    key: "townhouse",
  },
  {
    label: "Condo",
    image: villaImg,
    key: "condo",
  },
  {
    label: "Multi-Family",
    image: skyscraperImg,
    key: "multi-family",
  },
  {
    label: "Manufactured",
    image: factoryImg,
    key: "manufactured",
  },
  {
    label: "Other",
    image: requestImg,
    key: "other",
  },
];

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number is too long"),

  propertyType: z.string().min(1, "Please select a property type"),

  street: z.string().min(1, "Street is required"),
  unit: z.string().optional(),
  city: z.string().min(1, "City is required"),
  region: z.string().min(1, "Region is required"),
  zipCode: z
    .string()
    .min(4, "Zip code is too short")
    .max(10, "Zip code is too long"),

  beds: z.number().min(0, "Beds cannot be negative"),
  bath: z.number().min(0, "Bathrooms cannot be negative"),
  squareFeet: z.number().min(0, "Square footage cannot be negative"),

  year: z
    .string()
    .regex(/^\d{4}$/, "Enter a valid 4-digit year")
    .refine((val) => +val <= new Date().getFullYear(), {
      message: "Year must not be in the future",
    }),
});

export default function HomeInsuranceForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      propertyType: "",
      street: "",
      unit: "",
      city: "",
      region: "",
      zipCode: "",
      beds: 0,
      bath: 0,
      squareFeet: 0,
      year: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <MultiStepper>
            <MultiStepperIndicator
              showCount={false}
              routeBack={() => navigate(-1)}
            />
            <MultiStepperHeader>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <IconRound icon={legacyIconImg} size="sm" />
                  <h2 className="text-2xl font-bold text-blue-900">
                    Let&apos;s simplify your home insurance
                  </h2>
                </div>
                <div className="text-muted-foreground">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s,
                </div>
              </div>
            </MultiStepperHeader>
            <MultiStepperStep>
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            </MultiStepperStep>

            <MultiStepperStep>
              <FormField
                control={form.control}
                name="propertyType"
                render={({ field }) => (
                  <div>
                    <FormLabel>Property Type</FormLabel>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-4 gap-4 mt-2"
                    >
                      {propertyTypes.map((type) => (
                        <label htmlFor={type.key} className="cursor-pointer">
                          <Card
                            key={type.key}
                            className={`cursor-pointer border gap-0 p-2 border-input ${
                              field.value === type.key &&
                              "border-primary bg-blue-50"
                            }`}
                          >
                            <RadioGroupItem value={type.key} id={type.key} />
                            <CardContent className="flex flex-col items-center justify-center gap-2">
                              <img
                                src={type.image}
                                alt=""
                                className="size-12"
                              />
                              <span className="text-lg text-primary">
                                {type.label}
                              </span>
                            </CardContent>
                          </Card>
                        </label>
                      ))}
                    </RadioGroup>
                    <FormMessage />
                  </div>
                )}
              />
            </MultiStepperStep>

            <MultiStepperStep>
              <div className="grid grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="street"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <FormLabel>Street</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="region"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Region</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input type="number" min={6} max={6} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="beds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beds</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="bath"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Baths</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="squareFeet"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Square Feet</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </MultiStepperStep>
            <MultiStepperButton />
          </MultiStepper>
        </form>
      </Form>
    </div>
  );
}
