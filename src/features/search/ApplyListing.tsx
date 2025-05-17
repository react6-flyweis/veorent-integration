import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BathIcon,
  BedDoubleIcon,
  HomeIcon,
  MapIcon,
  GalleryHorizontalEndIcon,
  CheckCircle2Icon,
  CalendarIcon,
} from "lucide-react";
import { BackButton } from "@/components/BackButton";
import { Logo } from "@/components/Logo";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cn } from "@/lib/utils";
import { DateInput } from "@/components/ui/date-input";

const applicationSchema = z.object({
  role: z.enum(["tenant", "cosigner"], {
    required_error: "Please select a role",
  }),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Phone number is required"),
  dob: z.date({ required_error: "Date of birth is required" }),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function ApplyListing() {
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      role: "tenant",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dob: undefined,
    },
  });

  function onSubmit(values: ApplicationFormValues) {
    console.log("Submitted:", values);
  }
  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <BackButton />
        <Logo />
      </div>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-5">
              {/* Left: Listing Info */}
              <div className="md:col-span-3 space-y-4">
                <div className="relative">
                  <img
                    src="/listing.jpg"
                    alt="Brighton Lake"
                    className="w-full h-64 object-cover rounded-xl"
                  />
                  <Button
                    variant="ghost"
                    className="absolute bottom-2 right-2 rounded-full bg-white"
                  >
                    <GalleryHorizontalEndIcon className="rotate-180" />
                    <span className="font-semibold">29 photos</span>
                  </Button>
                </div>

                <div>
                  <h2 className="text-xl font-semibold">
                    Brighton Lake Front Fully Furnished 7 month lease
                  </h2>
                  <div className="flex gap-1">
                    <a href="#" className="text-blue-600 text-lg tracking-wide">
                      3110 Causeway Dr, Brighton, MI 48114
                    </a>
                    <MapIcon className="text-blue-600" />
                  </div>
                  <div className="w-full flex items-end justify-around mt-2 text-gray-700">
                    <div className="flex flex-col items-center gap-1">
                      <BedDoubleIcon className="size-7" />
                      <span> 3 Beds</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <BathIcon className="size-7" />
                      <span> 2 Baths</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <HomeIcon className="size-7" />
                      <span>Single Family</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <CalendarIcon className="size-7" />
                      <span>Available 17/5/24</span>
                    </div>
                  </div>
                </div>

                <div className="">
                  <span className="uppercase font-semibold">Landlord:</span>
                  <span className="">Donna VanAntwerp</span>
                </div>
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-4 md:col-span-2">
                <Card className="gap-2 p-3  rounded">
                  <CardHeader className="px-1">
                    <CardTitle className="text-center text-xl">
                      Start My Application
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>Easy to save and resume at any time</span>
                      </li>
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>Takes less then 11 minutes</span>
                      </li>
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>Will never impact your credit score</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Contact Form */}

                <div className="space-y-1">
                  {/* Radio Group */}
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem className="flex justify-between">
                        <FormLabel className="text-base">
                          What are you applying as?
                        </FormLabel>
                        <FormControl>
                          <div className="flex gap-2 border p-2 rounded">
                            {["tenant", "cosigner"].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => field.onChange(value)}
                                className={cn(
                                  "rounded-md text-sm px-4 py-1 border",
                                  field.value === value
                                    ? "bg-primary text-white"
                                    : "bg-muted text-foreground"
                                )}
                              >
                                {value === "tenant" ? "Tenant" : "Co-Signer"}
                              </button>
                            ))}
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  {/* First & Last Name */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="you@example.com"
                              {...field}
                            />
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
                            <Input
                              type="tel"
                              placeholder="123-456-7890"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Date of Birth */}
                  <FormField
                    control={form.control}
                    name="dob"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Date of Birth</FormLabel>
                        <DateInput isDob {...field} />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" type="submit" className="w-3/5">
                Submit Application
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
