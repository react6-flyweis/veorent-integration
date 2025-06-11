import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BathIcon,
  BedDoubleIcon,
  HomeIcon,
  MapIcon,
  GalleryHorizontalEndIcon,
  CheckCircle2Icon,
  CalendarIcon,
  HouseIcon,
} from "lucide-react";
import { z } from "zod";

import { BackButton } from "@/components/BackButton";
import FormErrors from "@/components/FormErrors";
import { Logo } from "@/components/Logo";
import { PhotoGallery } from "@/components/PhotoGallery";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DateInput } from "@/components/ui/date-input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPropertyByIdQuery } from "@/features/landlord/properties/api/queries";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateBookingMutation } from "./api/mutation";

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
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyByIdQuery(id || "");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { mutateAsync } = useCreateBookingMutation();

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

  const onSubmit = async (values: ApplicationFormValues) => {
    try {
      const bookingData = {
        applyingFor:
          values.role === "tenant"
            ? "Tenant"
            : ("Co-signer" as "Tenant" | "Co-signer"),
        propertyId: id || "",
        personalDetails: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          phone: values.phone,
          dateOfBirth: values.dob.toISOString().split("T")[0], // Format as YYYY-MM-DD
        },
      };

      const booking = await mutateAsync(bookingData);
      navigate(`/tenant/applying/${booking.data.data._id}`);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-between">
        <BackButton />
        <Logo />
      </div>

      <div className="">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="mx-auto grid grid-cols-1 gap-5 md:grid-cols-5">
              {/* Left: Listing Info */}
              <div className="space-y-4 md:col-span-3">
                {isLoading ? (
                  <>
                    <Skeleton className="h-64 w-full rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-5 w-1/2" />
                      <div className="mt-2 flex w-full items-end justify-around">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <div
                            key={i}
                            className="flex flex-col items-center gap-1"
                          >
                            <Skeleton className="size-7 rounded-full" />
                            <Skeleton className="h-4 w-16" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <Skeleton className="h-4 w-40" />
                  </>
                ) : (
                  <>
                    <div className="relative">
                      <Avatar className="h-64 w-full rounded-xl">
                        <AvatarImage
                          src={data?.image?.[0]?.img}
                          alt={data?.name || "Property"}
                          className="h-64 w-full rounded-xl object-cover"
                        />
                        <AvatarFallback className="bg-muted flex h-64 w-full items-center justify-center rounded-xl">
                          <HouseIcon className="text-muted-foreground size-10" />
                        </AvatarFallback>
                      </Avatar>
                      {(data?.image?.length ?? 0) > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          className="absolute right-2 bottom-2 rounded-full bg-white"
                          onClick={() => setIsGalleryOpen(true)}
                        >
                          <GalleryHorizontalEndIcon className="rotate-180" />
                          <span className="font-semibold">
                            {data?.image?.length || 0} photos
                          </span>
                        </Button>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        {data?.name || "Property Name"}
                      </h2>
                      <div className="flex gap-1">
                        <a
                          href="#"
                          className="text-lg tracking-wide text-blue-600"
                        >
                          {data?.addressDetails?.streetAddress ||
                            "Street Address"}
                          , {data?.addressDetails?.city || "City"},{" "}
                          {data?.addressDetails?.region || "Region"}{" "}
                          {data?.addressDetails?.zipCode || "Zip"}
                        </a>
                        <MapIcon className="text-blue-600" />
                      </div>
                      <div className="mt-2 flex w-full items-end justify-around text-gray-700">
                        <div className="flex flex-col items-center gap-1">
                          <BedDoubleIcon className="size-7" />
                          <span>
                            {" "}
                            {data?.rentalDetails?.beds || "N/A"} Beds
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <BathIcon className="size-7" />
                          <span>
                            {" "}
                            {data?.rentalDetails?.baths || "N/A"} Baths
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <HomeIcon className="size-7" />
                          <span>
                            {data?.propertyTypeId?.name || "Property Type"}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <CalendarIcon className="size-7" />
                          <span>
                            Available{" "}
                            {data?.leasingBasics?.Date
                              ? formatDate(data.leasingBasics.Date)
                              : "TBD"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <span className="font-semibold uppercase">Landlord:</span>
                      <span className="">
                        {data?.owner?.firstname && data?.owner?.lastname
                          ? ` ${data.owner.firstname} ${data.owner.lastname}`
                          : " Property Owner"}
                      </span>
                    </div>
                  </>
                )}
              </div>

              {/* Right: Sidebar */}
              <div className="space-y-4 md:col-span-2">
                <Card className="gap-2 rounded p-3">
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
                          <div className="flex gap-2 rounded border p-2">
                            {["tenant", "cosigner"].map((value) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => field.onChange(value)}
                                className={cn(
                                  "rounded-md border px-4 py-1 text-sm",
                                  field.value === value
                                    ? "bg-primary text-white"
                                    : "bg-muted text-foreground",
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

                  <FormErrors errors={form.formState.errors} />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <LoadingButton
                size="lg"
                type="submit"
                className="w-3/5"
                isLoading={form.formState.isSubmitting}
              >
                Next
              </LoadingButton>
            </div>
          </form>
        </Form>
      </div>

      {/* Photo Gallery */}
      <PhotoGallery
        images={data?.image || []}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
