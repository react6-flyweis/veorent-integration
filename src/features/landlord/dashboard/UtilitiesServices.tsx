import { useForm, type ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import assets for icons
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateOrUpdateLeaseAgreementMutation } from "./api/mutation";
import maintenanceIcon from "./assets/cog-wrench.png";
import electricityIcon from "./assets/icons/light-bulb.png";
import keyIcon from "./assets/key.png";
import utilitiesIcon from "./assets/utilities.png";

// Import utility icons
import internetIcon from "./assets/icons/internet.png";
import waterIcon from "./assets/icons/water.png";
import cableIcon from "./assets/icons/tv.png";
import gasIcon from "./assets/icons/fire.png";
import trashIcon from "./assets/icons/trash.png";
import sewerIcon from "./assets/icons/seawage.png";
import lawnCareIcon from "./assets/icons/lawn.png";
import snowRemovalIcon from "./assets/icons/snow-removal.png";
import condoIcon from "./assets/icons/condo-ee.png";
import { BuilderLayout } from "./components/BuilderLayout";

// Define schema for the form
const utilitiesServicesSchema = z.object({
  // Utilities section
  electricity: z.enum(["tenant", "landlord", "n/a"]),
  internet: z.enum(["tenant", "landlord", "n/a"]),
  water: z.enum(["tenant", "landlord", "n/a"]),
  cable: z.enum(["tenant", "landlord", "n/a"]),
  gas: z.enum(["tenant", "landlord", "n/a"]),
  trash: z.enum(["tenant", "landlord", "n/a"]),

  // Other services
  sewerSeptic: z.enum(["tenant", "landlord", "n/a"]),
  lawnCare: z.enum(["tenant", "landlord", "n/a"]),
  snowRemoval: z.enum(["tenant", "landlord", "n/a"]),
  hoaCondoFee: z.enum(["tenant", "landlord", "n/a"]),

  // Keys section
  keyType: z.string().min(1, "Key type is required"),
  keyCopies: z.string().min(1, "Number of copies is required"),

  // Maintenance section
  maintenanceOptions: z.enum(["mail", "email", "textmail", "other"]),
});

type UtilitiesServicesValues = z.infer<typeof utilitiesServicesSchema>;

export default function UtilitiesServices() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { state } = useLocation();
  const { mutateAsync, isSuccess } = useCreateOrUpdateLeaseAgreementMutation();

  const form = useForm<UtilitiesServicesValues>({
    resolver: zodResolver(utilitiesServicesSchema),
    defaultValues: {
      electricity: "n/a",
      internet: "n/a",
      water: "n/a",
      cable: "n/a",
      gas: "n/a",
      trash: "n/a",
      sewerSeptic: "n/a",
      lawnCare: "n/a",
      snowRemoval: "n/a",
      hoaCondoFee: "n/a",
      keyType: "",
      keyCopies: "",
      maintenanceOptions: "mail",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UtilitiesServicesValues) => {
    try {
      const valuesToSave: {
        rentalProperty: string;
        utilitiesServices: IUtilitiesServiceAndKeys;
      } = {
        rentalProperty: state.property,
        utilitiesServices: {
          ...values,
          sewer: values.sewerSeptic,
          hoa: values.hoaCondoFee,
          keys: values.keyType,
          copies: values.keyCopies,
          maintenance: values.maintenanceOptions,
        },
      };
      await mutateAsync(valuesToSave);
      setTimeout(() => {
        navigate("/landlord/lease-agreement/provisions-attachments", { state });
      }, 300);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  if (!state || !state.property) {
    // if no property is selected then redirect to select lease
    return <Navigate to="/landlord/lease-agreement" />;
  }

  return (
    <BuilderLayout
      title="Utilities, Services, & Keys"
      description="We automatically filled information we had on file. Please double check it since it will go into the legal agreement."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Utilities Section */}
          <div className="space-y-6">
            <div className="">
              <div className="flex items-center gap-2 font-medium">
                <img src={utilitiesIcon} alt="Utilities" className="size-10" />
                <p className="text-lg sm:text-xl">Utilities & Services</p>
              </div>

              <p className="text-sm font-medium sm:text-base">
                Indicate who is responsible for the followings:
              </p>
            </div>

            <div className="space-y-6 sm:space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:gap-4">
                {[
                  {
                    label: "Electricity",
                    icon: electricityIcon,
                    name: "electricity",
                  },
                  {
                    label: "Internet",
                    icon: internetIcon,
                    name: "internet",
                  },
                  {
                    label: "Water",
                    icon: waterIcon,
                    name: "water",
                  },
                  {
                    label: "Cable",
                    icon: cableIcon,
                    name: "cable",
                  },
                  {
                    label: "Gas",
                    icon: gasIcon,
                    name: "gas",
                  },
                  {
                    label: "Trash",
                    icon: trashIcon,
                    name: "trash",
                  },
                  {
                    label: "Sewer/Septic",
                    icon: sewerIcon,
                    name: "sewerSeptic",
                  },
                  {
                    label: "Lawn Care",
                    icon: lawnCareIcon,
                    name: "lawnCare",
                  },
                  {
                    label: "Snow Removal",
                    icon: snowRemovalIcon,
                    name: "snowRemoval",
                  },
                  {
                    label: "HOA/Condo Fee",
                    icon: condoIcon,
                    name: "hoaCondoFee",
                  },
                ].map((item) => (
                  <FormField
                    control={form.control}
                    name={item.name as keyof UtilitiesServicesValues}
                    key={item.name}
                    render={({ field }) => (
                      <ResponsibilityRadios
                        label={item.label}
                        icon={item.icon}
                        field={field}
                      />
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Keys Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-medium">
              <img src={keyIcon} alt="Keys" className="size-10" />
              <p className="text-lg sm:text-xl">Keys</p>
            </div>

            <p className="mb-2 text-sm sm:text-base">
              Which keys will your tenant(s) receive?
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="keyType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Key Type
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Key Type..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="property">Property</SelectItem>
                          <SelectItem value="garageDoorOpener">
                            Garage Door Opener
                          </SelectItem>
                          <SelectItem value="mailbox">Mailbox</SelectItem>
                          <SelectItem value="other">{t("other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="keyCopies"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm sm:text-base">
                        Copies
                      </FormLabel>
                      <FormControl>
                        <Input type="number" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-medium sm:text-xl">
              <img
                src={maintenanceIcon}
                alt="{t('maintenance')}"
                className="size-10"
              />
              <span>{t("maintenance")}</span>
            </div>

            <p className="text-sm sm:text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>

            <FormField
              control={form.control}
              name="maintenanceOptions"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="grid grid-cols-1 gap-1"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="mail" />
                        </FormControl>
                        <FormLabel className="text-base">Mail</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="email" />
                        </FormControl>
                        <FormLabel className="text-base">E-Mail</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="textmail" />
                        </FormControl>
                        <FormLabel className="text-base">Text Mail</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl>
                          <RadioGroupItem value="other" />
                        </FormControl>
                        <FormLabel className="text-base">
                          {t("other")}
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormErrors errors={form.formState.errors} />

          <div className="flex justify-center pt-6 sm:pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-full max-w-md rounded-lg sm:w-3/5"
              type="submit"
            >
              {isSuccess ? "Saved!" : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}

// Helper component for responsibility radio options
const ResponsibilityRadios = ({
  label,
  icon,
  field,
}: {
  label: string;
  icon: string;
  field: ControllerRenderProps<
    UtilitiesServicesValues,
    keyof UtilitiesServicesValues
  >;
}) => (
  <FormItem>
    <FormLabel>
      <img src={icon} alt={label} className="max-h-7 max-w-7" />
      <span className="text-sm font-medium sm:text-base sm:font-normal">
        {label}
      </span>
    </FormLabel>
    <FormControl>
      <RadioGroup
        onValueChange={field.onChange}
        value={field.value as string}
        className="flex flex-col gap-3 pl-5 sm:flex-row sm:gap-4"
      >
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <RadioGroupItem value="tenant" id={`${field.name}-tenant`} />
          </FormControl>
          <FormLabel
            htmlFor={`${field.name}-tenant`}
            className="cursor-pointer text-sm font-normal sm:text-base"
          >
            Tenant
          </FormLabel>
        </FormItem>
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <RadioGroupItem value="landlord" id={`${field.name}-landlord`} />
          </FormControl>
          <FormLabel
            htmlFor={`${field.name}-landlord`}
            className="cursor-pointer text-sm font-normal sm:text-base"
          >
            Landlord
          </FormLabel>
        </FormItem>
        <FormItem className="flex items-center space-x-2">
          <FormControl>
            <RadioGroupItem value="n/a" id={`${field.name}-na`} />
          </FormControl>
          <FormLabel
            htmlFor={`${field.name}-na`}
            className="cursor-pointer text-sm font-normal sm:text-base"
          >
            N/A
          </FormLabel>
        </FormItem>
      </RadioGroup>
    </FormControl>
  </FormItem>
);
