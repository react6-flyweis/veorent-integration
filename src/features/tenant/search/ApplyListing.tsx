import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
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

import type { TFunction } from "i18next";

const createApplicationSchema = (t: TFunction) =>
  z.object({
    role: z.enum(["tenant", "cosigner"], {
      required_error: t("applyListing.roleRequired"),
    }),
    firstName: z.string().min(2, t("applyListing.firstNameRequired")),
    lastName: z.string().min(2, t("applyListing.lastNameRequired")),
    email: z.string().email(t("applyListing.emailInvalid")),
    phone: z.string().min(10, t("applyListing.phoneRequired")),
    dob: z.date({ required_error: t("applyListing.dobRequired") }),
  });

export default function ApplyListing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useGetPropertyByIdQuery(id || "");
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { mutateAsync } = useCreateBookingMutation();

  const applicationSchema = createApplicationSchema(t);
  type ApplicationFormValues = z.infer<typeof applicationSchema>;

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

  const coords = data?.currentLocation?.coordinates;
  const mapUrl =
    Array.isArray(coords) && coords.length === 2
      ? `https://www.google.com/maps?q=${coords[1]},${coords[0]}`
      : "#";

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
                            {data?.image?.length || 0} {t("listing.photos")}
                          </span>
                        </Button>
                      )}
                    </div>

                    <div>
                      <h2 className="text-xl font-semibold">
                        {data?.name || t("listing.propertyNamePlaceholder")}
                      </h2>
                      <div className="flex gap-1">
                        <a
                          href={mapUrl}
                          className="text-lg tracking-wide text-blue-600"
                        >
                          {data?.addressDetails?.streetAddress ||
                            t("listing.streetAddressPlaceholder")}
                          ,{" "}
                          {data?.addressDetails?.city ||
                            t("listing.cityPlaceholder")}
                          ,{" "}
                          {data?.addressDetails?.region ||
                            t("listing.regionPlaceholder")}{" "}
                          {data?.addressDetails?.zipCode ||
                            t("listing.zipCodePlaceholder")}
                        </a>
                        <MapIcon className="text-blue-600" />
                      </div>
                      <div className="mt-2 flex w-full items-end justify-around text-gray-700">
                        <div className="flex flex-col items-center gap-1">
                          <BedDoubleIcon className="size-7" />
                          <span>
                            {" "}
                            {data?.rentalDetails?.beds ||
                              t("listingCard.na")}{" "}
                            {t("listing.beds")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <BathIcon className="size-7" />
                          <span>
                            {" "}
                            {data?.rentalDetails?.baths ||
                              t("listingCard.na")}{" "}
                            {t("listing.baths")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <HomeIcon className="size-7" />
                          <span>
                            {data?.propertyTypeId?.name ||
                              t("listing.propertyTypePlaceholder")}
                          </span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <CalendarIcon className="size-7" />
                          <span>
                            {t("listing.available")}{" "}
                            {data?.leasingBasics?.Date
                              ? formatDate(data.leasingBasics.Date)
                              : t("listing.tbd")}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="">
                      <span className="font-semibold uppercase">
                        {t("listingCard.landlord")}
                      </span>
                      <span className="">
                        {data?.owner?.firstname && data?.owner?.lastname
                          ? ` ${data.owner.firstname} ${data.owner.lastname}`
                          : ` ${t("listing.propertyOwnerPlaceholder")}`}
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
                      {t("applyListing.startApplication")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1">
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>{t("applyListing.easySaveResume")}</span>
                      </li>
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>{t("applyListing.takesLessThan11Min")}</span>
                      </li>
                      <li className="flex gap-1">
                        <CheckCircle2Icon className="text-green-500" />
                        <span>{t("applyListing.noCreditScoreImpact")}</span>
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
                          {t("applyListing.roleLabel")}
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
                                {value === "tenant"
                                  ? t("applyListing.tenant")
                                  : t("applyListing.cosigner")}
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
                          <FormLabel>{t("profileForm.firstName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                "applyListing.placeholders.firstName",
                              )}
                              {...field}
                            />
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
                          <FormLabel>{t("profileForm.lastName")}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={t(
                                "applyListing.placeholders.lastName",
                              )}
                              {...field}
                            />
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
                          <FormLabel>{t("profileForm.email")}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder={t("applyListing.placeholders.email")}
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
                          <FormLabel>{t("profileForm.mobileNumber")}</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder={t("applyListing.placeholders.phone")}
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
                        <FormLabel>{t("applyListing.dobLabel")}</FormLabel>
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
                {t("saveAndNext")}
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
