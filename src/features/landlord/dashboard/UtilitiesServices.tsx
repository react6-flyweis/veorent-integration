import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { LoadingButton } from "@/components/ui/loading-button";
import { BuilderLayout } from "./components/BuilderLayout";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import assets for icons
import utilitiesIcon from "./assets/utilities.png";
import keyIcon from "./assets/key.png";
import maintenanceIcon from "./assets/cog-wrench.png";

// Import utility icons
import electricityIcon from "./assets/icons/light-bulb.png";
import internetIcon from "./assets/icons/internet.png";
import waterIcon from "./assets/icons/water.png";
import cableIcon from "./assets/icons/tv.png";
import gasIcon from "./assets/icons/fire.png";
import sewerIcon from "./assets/icons/seawage.png";
import lawnCareIcon from "./assets/icons/lawn.png";
import snowRemovalIcon from "./assets/icons/snow-removal.png";
import condoIcon from "./assets/icons/condo-ee.png";

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
  maintenanceOptions: z.array(z.string()),
});

type UtilitiesServicesValues = z.infer<typeof utilitiesServicesSchema>;

export default function UtilitiesServices() {
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
      maintenanceOptions: [],
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values: UtilitiesServicesValues) => {
    try {
      console.log(values);
      // TODO: Save utilities and services information and move to next step
    } catch (error) {
      console.error("Error saving information:", error);
    }
  };

  // Helper component for responsibility radio options
  const ResponsibilityRadios = ({
    name,
  }: {
    name: Exclude<keyof UtilitiesServicesValues, "maintenanceOptions">;
  }) => (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex flex-col gap-3 pl-5 sm:flex-row sm:gap-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="tenant" />
                </FormControl>
                <FormLabel className="text-sm font-normal sm:text-base">
                  Tenant
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="landlord" />
                </FormControl>
                <FormLabel className="text-sm font-normal sm:text-base">
                  Landlord
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="n/a" />
                </FormControl>
                <FormLabel className="text-sm font-normal sm:text-base">
                  N/A
                </FormLabel>
              </FormItem>
            </RadioGroup>
          </FormControl>
        </FormItem>
      )}
    />
  );

  return (
    <BuilderLayout
      title="Utilities, Services, & Keys"
      description="Specify who will be responsible for utilities and services, and detail key arrangements."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 sm:space-y-8"
        >
          {/* Utilities Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 font-medium">
              <img src={utilitiesIcon} alt="Utilities" className="size-10" />
              <p className="text-lg sm:text-xl">Utilities & Services</p>
            </div>

            <p className="mb-6 text-sm font-medium sm:text-base">
              Indicate who is responsible for the followings:
            </p>

            <div className="space-y-6 sm:space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:gap-4">
                {/* Electricity */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={electricityIcon}
                      alt="Electricity"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Electricity
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="electricity" />
                  </div>
                </div>

                {/* Internet */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={internetIcon}
                      alt="Internet"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Internet
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="internet" />
                  </div>
                </div>

                {/* Water */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={waterIcon}
                      alt="Water"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Water
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="water" />
                  </div>
                </div>

                {/* Cable */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={cableIcon}
                      alt="Cable"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Cable
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="cable" />
                  </div>
                </div>

                {/* Gas */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img src={gasIcon} alt="Gas" className="max-h-7 max-w-7" />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Gas
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="gas" />
                  </div>
                </div>

                {/* Trash */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <span className="text-lg">🗑️</span>
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Trash
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="trash" />
                  </div>
                </div>

                {/* Sewer/Septic */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={sewerIcon}
                      alt="Sewer/Septic"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Sewer/Septic
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="sewerSeptic" />
                  </div>
                </div>

                {/* Lawn Care */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={lawnCareIcon}
                      alt="Lawn Care"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Lawn Care
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="lawnCare" />
                  </div>
                </div>

                {/* Snow Removal */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={snowRemovalIcon}
                      alt="Snow Removal"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      Snow Removal
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="snowRemoval" />
                  </div>
                </div>

                {/* HOA/Condo Fee */}
                <div className="flex flex-col gap-3 rounded-lg bg-gray-50 p-3 sm:flex-row sm:items-center sm:gap-4 sm:rounded-none sm:bg-transparent sm:p-0">
                  <div className="flex w-full items-center gap-2 sm:w-32">
                    <img
                      src={condoIcon}
                      alt="HOA/Condo Fee"
                      className="max-h-7 max-w-7"
                    />
                    <span className="text-sm font-medium sm:text-base sm:font-normal">
                      HOA/Condo Fee
                    </span>
                  </div>
                  <div className="flex-1">
                    <ResponsibilityRadios name="hoaCondoFee" />
                  </div>
                </div>
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
                        <SelectItem value="house">House Key</SelectItem>
                        <SelectItem value="apartment">Apartment Key</SelectItem>
                        <SelectItem value="mailbox">Mailbox Key</SelectItem>
                        <SelectItem value="garage">Garage Key</SelectItem>
                        <SelectItem value="gate">Gate Key</SelectItem>
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
                      <Input {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Maintenance Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-medium sm:text-xl">
              <img
                src={maintenanceIcon}
                alt="Maintenance"
                className="size-10"
              />
              <span>Maintenance</span>
            </div>

            <Card className="bg-blue-50 p-4 text-xs text-blue-800 sm:p-3 sm:text-sm">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
            </Card>

            <FormField
              control={form.control}
              name="maintenanceOptions"
              render={() => (
                <FormItem>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-3">
                    <div className="flex items-center space-x-2 p-2 sm:p-0">
                      <Checkbox id="mail" value="mail" />
                      <label htmlFor="mail" className="text-sm font-medium">
                        Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 sm:p-0">
                      <Checkbox id="email" value="email" />
                      <label htmlFor="email" className="text-sm font-medium">
                        E-Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 sm:p-0">
                      <Checkbox id="textmail" value="textmail" />
                      <label htmlFor="textmail" className="text-sm font-medium">
                        Text Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2 p-2 sm:p-0">
                      <Checkbox id="other" value="other" />
                      <label htmlFor="other" className="text-sm font-medium">
                        Other
                      </label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-center pt-6 sm:pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-full max-w-md rounded-lg sm:w-3/5"
              type="submit"
            >
              {isSubmitting ? "Saving..." : "Save & Next"}
            </LoadingButton>
          </div>
        </form>
      </Form>
    </BuilderLayout>
  );
}
