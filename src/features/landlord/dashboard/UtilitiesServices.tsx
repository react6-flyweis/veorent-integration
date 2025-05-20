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
              className="flex space-x-4"
            >
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="tenant" />
                </FormControl>
                <FormLabel className="font-normal text-base">Tenant</FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="landlord" />
                </FormControl>
                <FormLabel className="font-normal text-base">
                  Landlord
                </FormLabel>
              </FormItem>
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <RadioGroupItem value="n/a" />
                </FormControl>
                <FormLabel className="font-normal text-base">N/A</FormLabel>
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Utilities Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <img src={utilitiesIcon} alt="Utilities" className="size-10" />
              <p className="text-xl">Utilities & Services</p>
            </div>

            <p className="font-medium mb-4">
              Indicate who is responsible for the followings:
            </p>

            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4">
                {/* Electricity */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">⚡</span>
                    <span>Electricity</span>
                  </div>
                  <ResponsibilityRadios name="electricity" />
                </div>

                {/* Internet */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🌐</span>
                    <span>Internet</span>
                  </div>
                  <ResponsibilityRadios name="internet" />
                </div>

                {/* Water */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">💧</span>
                    <span>Water</span>
                  </div>
                  <ResponsibilityRadios name="water" />
                </div>

                {/* Cable */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">📺</span>
                    <span>Cable</span>
                  </div>
                  <ResponsibilityRadios name="cable" />
                </div>

                {/* Gas */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🔥</span>
                    <span>Gas</span>
                  </div>
                  <ResponsibilityRadios name="gas" />
                </div>

                {/* Trash */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🗑️</span>
                    <span>Trash</span>
                  </div>
                  <ResponsibilityRadios name="trash" />
                </div>

                {/* Sewer/Septic */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🚽</span>
                    <span>Sewer/Septic</span>
                  </div>
                  <ResponsibilityRadios name="sewerSeptic" />
                </div>

                {/* Lawn Care */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🌿</span>
                    <span>Lawn Care</span>
                  </div>
                  <ResponsibilityRadios name="lawnCare" />
                </div>

                {/* Snow Removal */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">❄️</span>
                    <span>Snow Removal</span>
                  </div>
                  <ResponsibilityRadios name="snowRemoval" />
                </div>

                {/* HOA/Condo Fee */}
                <div className="flex items-center gap-4">
                  <div className="w-24 flex items-center gap-2">
                    <span className="text-lg">🏢</span>
                    <span>HOA/Condo Fee</span>
                  </div>
                  <ResponsibilityRadios name="hoaCondoFee" />
                </div>
              </div>
            </div>
          </div>

          {/* Keys Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium">
              <img src={keyIcon} alt="Keys" className="size-10" />
              <p className="text-xl">Keys</p>
            </div>

            <p>Which keys will your tenant(s) receive?</p>

            <FormField
              control={form.control}
              name="keyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="max-w-64">
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
                  <FormLabel>Copies</FormLabel>
                  <FormControl>
                    <Input {...field} className="max-w-64" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Maintenance Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-medium text-lg">
              <img
                src={maintenanceIcon}
                alt="Maintenance"
                className="size-10"
              />
              <span>Maintenance</span>
            </div>

            <Card className="bg-blue-50 p-3 text-sm text-blue-800">
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
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="mail" value="mail" />
                      <label htmlFor="mail" className="text-sm font-medium">
                        Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="email" value="email" />
                      <label htmlFor="email" className="text-sm font-medium">
                        E-Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="textmail" value="textmail" />
                      <label htmlFor="textmail" className="text-sm font-medium">
                        Text Mail
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
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

          <div className="flex justify-center pt-4">
            <LoadingButton
              isLoading={isSubmitting}
              size="lg"
              className="w-3/5 rounded-lg"
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
