import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";
import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import houseOwnerIcon from "./assets/house-owner.png";
import houseIcon from "./assets/house.png";
import { BuilderLayout } from "./components/BuilderLayout";

// Define Zod validation schema
const formSchema = z
  .object({
    addTenantsLater: z.boolean(),
    tenantSearch: z.string().optional(),
    hasAdditionalOccupants: z.boolean(),
    occupantType: z.enum(["individual", "company"]),
    // Company fields
    companyName: z.string().optional(),
    // Common fields
    landlordFirstName: z.string(),
    landlordLastName: z.string(),
    landlordEmail: z.string().email("Invalid email address"),
    landlordPhone: z.string().min(1, "Phone number is required"),
    addAnotherLandlord: z.boolean(),
    // Landlord mailing address fields
    landlordStreetAddress: z.string().optional(),
    landlordUnit: z.string().optional(),
    landlordCity: z.string().optional(),
    landlordRegion: z.string().optional(),
    landlordZipCode: z.string().optional(),
    hasDifferentAddress: z.boolean(),
    hasAdditionalSigners: z.boolean(),
    // Add fields for additional signers
    additionalSignerFirstName: z.string().optional(),
    additionalSignerLastName: z.string().optional(),
    additionalSignerEmail: z
      .string()
      .email("Invalid email")
      .optional()
      .or(z.literal("")),
    // Additional occupant fields
    occupantFullName: z.string().optional(),
    occupantRelationship: z.string().optional(),
    occupantAge: z.string().optional(),
  })
  .refine(
    (data) => {
      // If type is individual, require first and last name
      if (data.occupantType === "individual") {
        return (
          data.landlordFirstName &&
          data.landlordFirstName.trim().length > 0 &&
          data.landlordLastName &&
          data.landlordLastName.trim().length > 0
        );
      }
      // If type is company, require company name
      if (data.occupantType === "company") {
        return data.companyName && data.companyName.trim().length > 0;
      }
      return true;
    },
    {
      message: "Please complete all required fields",
      path: ["occupantType"],
    },
  );

type FormValues = z.infer<typeof formSchema>;

export default function PeopleOnLease() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync, isSuccess } = useCreateOrUpdateLeaseAgreementMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addTenantsLater: false,
      hasAdditionalOccupants: false,
      occupantType: "individual",
      hasDifferentAddress: false,
      hasAdditionalSigners: false,
      addAnotherLandlord: false,
    },
  });

  const { handleSubmit } = form;
  const occupantType = form.watch("occupantType");

  const onSubmit = async (values: FormValues) => {
    // Simulate submission
    try {
      const valuesToSave: {
        rentalProperty: string;
        peopleOnTheLease: IPeopleOnTheLease;
      } = {
        rentalProperty: state.property,
        peopleOnTheLease: {
          ...values,
          renters: "",

          additionalOccupants: false,
          fullName: values.occupantFullName || "",
          relationship: values.occupantRelationship || "",
          age: values.occupantAge || "",

          EntityType: (occupantType.charAt(0).toUpperCase() +
            occupantType.slice(1)) as "Individual" | "Company",
          companyName: occupantType === "company" ? values.companyName : "",

          firstName: values.landlordFirstName,
          lastName: values.landlordLastName,

          email: values.landlordEmail,
          phone: values.landlordPhone,

          companyEmail: occupantType === "company" ? values.landlordEmail : "",
          companyPhone: occupantType === "company" ? values.landlordPhone : "",

          streetAddress: values.landlordStreetAddress || "",
          unit: values.landlordUnit || "",
          city: values.landlordCity || "",
          region: values.landlordRegion || "",
          zipCode: values.landlordZipCode || "",

          poBox: values.hasDifferentAddress,
          poBoxstreetAddress: values.landlordStreetAddress || "",
          poBoxunit: values.landlordUnit || "",
          poBoxcity: values.landlordCity || "",
          poBoxregion: values.landlordRegion || "",
          poBoxzipCode: values.landlordZipCode || "",

          signers: values.hasAdditionalSigners,
          legalFirstName: values.additionalSignerFirstName || "",
          legalLastName: values.additionalSignerLastName || "",
          legalEmail: values.additionalSignerEmail || "",
        },
      };
      await mutateAsync(valuesToSave);
      setTimeout(() => {
        navigate("/landlord/lease-agreement/pet-smoking", { state });
      }, 300);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <BuilderLayout
      title="People on the Lease"
      description="Add all parties to be included on the lease agreement."
    >
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tenants Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img src={houseOwnerIcon} className="size-10" alt="Tenant" />
              <span>{t("tenants")}</span>
            </div>

            <Card className="gap-2 border-0 bg-blue-200 p-4">
              <CardTitle className="text-semibold text-lg">
                Here's what you need to know:
              </CardTitle>
              <CardContent className="p-0">
                <ul className="list-disc space-y-1">
                  {new Array(4)
                    .fill(
                      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
                    )
                    .map((t, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="size-3 bg-orange-400"></div>
                        <span>{t}</span>
                      </li>
                    ))}
                </ul>
              </CardContent>
            </Card>

            <FormField
              control={form.control}
              name="tenantSearch"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-medium">
                    Search for Existing Renters
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Search by name or property"
                      className="max-w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="addTenantsLater"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      id="add-tenants-later"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel
                    htmlFor="add-tenants-later"
                    className="text-primary text-base font-normal"
                  >
                    I'll add my tenants later
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Additional Occupants Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img
                src={houseIcon}
                className="size-10"
                alt="Additional Occupant"
              />
              <span>Additional Occupants</span>
            </div>

            <div>
              <p className="mb-2">Will there be any additional occupants?</p>
              <p className="mb-3 text-sm text-gray-500">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s. This is additional content that is right
                of the main text.
              </p>
              <FormField
                control={form.control}
                name="hasAdditionalOccupants"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        className="flex space-x-4"
                        value={field.value ? "yes" : "no"}
                        onValueChange={(value) =>
                          field.onChange(value === "yes")
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="additional-yes" value="yes" />
                          <label htmlFor="additional-yes">{t("yes")}</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="additional-no" value="no" />
                          <label htmlFor="additional-no">{t("no")}</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Display additional occupant fields when hasAdditionalOccupants is true */}
            {form.watch("hasAdditionalOccupants") && (
              <div className="mt-3">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="occupantFullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("fullName")}
                          </FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupantRelationship"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Relationship
                          </FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="occupantAge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Age
                          </FormLabel>
                          <FormControl>
                            <Input className="mt-1" type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Landlord Section */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-lg font-medium">
                <img src={houseOwnerIcon} className="size-10" alt="Landlord" />
                <span>Landlord</span>
              </div>

              <FormField
                control={form.control}
                name="occupantType"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        className="flex space-x-4"
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem
                            id="individual-type"
                            value="individual"
                          />
                          <label htmlFor="individual-type">Individual</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem id="company-type" value="company" />
                          <label htmlFor="company-type">{t("company")}</label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {occupantType === "individual" ? (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landlordFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Legal First Name
                        </FormLabel>
                        <FormControl>
                          <Input className="mt-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landlordLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("lastName")}
                        </FormLabel>
                        <FormControl>
                          <Input className="mt-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input className="mt-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="landlordEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="landlordPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("phone")}
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {occupantType === "company" && (
                <div className="pt-4">
                  <h3 className="mb-4 text-base font-medium">
                    OWNER INFORMATION
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="landlordFirstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            Legal First Name
                          </FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landlordLastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("lastName")}
                          </FormLabel>
                          <FormControl>
                            <Input className="mt-1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="addAnotherLandlord"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="add-another-landlord"
                        className="mr-2"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel
                      htmlFor="add-another-landlord"
                      className="text-sm font-medium uppercase"
                    >
                      Add another landlord
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {form.watch("addAnotherLandlord") && (
                <div className="mt-4">
                  <h3 className="mb-4 text-base font-medium">
                    LANDLORD MAILING ADDRESS
                  </h3>

                  <FormField
                    control={form.control}
                    name="landlordStreetAddress"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="text-sm font-medium">
                          {t("streetAddress")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="mb-4 grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="landlordUnit"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("unit")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landlordCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("city")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="landlordRegion"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("region")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="landlordZipCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">
                            {t("zipCode")}
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Uncommon Scenarios Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium">
              <img
                src={houseIcon}
                className="size-10"
                alt="Uncommon Scenarios"
              />
              <span>Uncommon Scenarios</span>
            </div>

            <FormField
              control={form.control}
              name="hasDifferentAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block">
                    Will the manager or owner have a mailing address that
                    differs from the rental property address:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="different-address-yes"
                          value="yes"
                        />
                        <label htmlFor="different-address-yes">
                          {t("yes")}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="different-address-no" value="no" />
                        <label htmlFor="different-address-no">{t("no")}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("hasDifferentAddress") && (
              <div className="mt-3">
                <FormField
                  control={form.control}
                  name="landlordStreetAddress"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-sm font-medium">
                        {t("streetAddress")}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mb-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landlordUnit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("unit")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landlordCity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("city")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="landlordRegion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("region")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="landlordZipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("zipCode")}
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="hasAdditionalSigners"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 block">
                    Are there any additional signers?
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      className="flex space-x-4"
                      value={field.value ? "yes" : "no"}
                      onValueChange={(value) => field.onChange(value === "yes")}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          id="additional-signers-yes"
                          value="yes"
                        />
                        <label htmlFor="additional-signers-yes">
                          {t("yes")}
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem id="additional-signers-no" value="no" />
                        <label htmlFor="additional-signers-no">{t("no")}</label>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("hasAdditionalSigners") && (
              <div className="mt-3">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="additionalSignerFirstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          Legal First Name
                        </FormLabel>
                        <FormControl>
                          <Input className="mt-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="additionalSignerLastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">
                          {t("lastName")}
                        </FormLabel>
                        <FormControl>
                          <Input className="mt-1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="additionalSignerEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        {t("email")}
                      </FormLabel>
                      <FormControl>
                        <Input className="mt-1" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center">
            <LoadingButton
              isLoading={form.formState.isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
              type="submit"
            >
              {isSuccess ? "Saved Successfully" : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
