import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { IconRound } from "@/components/IconRound";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import utilitiesIcon from "../assets/utilities.png";
import amenititesIcon from "../assets/amenitites.png";
import appliancesIcon from "../assets/appliances.png";
import floorCoveringIcon from "../assets/floor-covering.png";
import acIcon from "../assets/ac.png";
import { LoadingButton } from "@/components/ui/loading-button";

const amenitiesSchema = z.object({
  accessibility: z.boolean(),
  alarmSystem: z.boolean(),
  bicycleParking: z.boolean(),
  cableReady: z.boolean(),
  lawn: z.boolean(),
  onSiteLaundry: z.boolean(),
  swimmingPool: z.boolean(),
  fencedYard: z.boolean(),
  fireplace: z.boolean(),
  fitnessCenter: z.boolean(),
  furnished: z.boolean(),
  nearPark: z.boolean(),
  secureBuilding: z.boolean(),
  vaultedCeiling: z.boolean(),
  garage: z.boolean(),
  hotTubSpa: z.boolean(),
  intercom: z.boolean(),
  laundryHookups: z.boolean(),
  offStreetParking: z.boolean(),
  securityCameras: z.boolean(),
  wiredForInternet: z.boolean(),

  // Appliances fields
  appliances: z.object({
    dishwasher: z.boolean(),
    garbageDisposal: z.boolean(),
    refrigerator: z.boolean(),
    dryer: z.boolean(),
    microwave: z.boolean(),
    washer: z.boolean(),
    freezer: z.boolean(),
    oven: z.boolean(),
  }),

  // Floor Coverings fields
  floorCoverings: z.object({
    carpet: z.boolean(),
    concrete: z.boolean(),
    hardwood: z.boolean(),
    laminate: z.boolean(),
    linoleumVinyl: z.boolean(),
    slate: z.boolean(),
    softwood: z.boolean(),
    tile: z.boolean(),
    other: z.boolean(),
  }),

  // HVAC fields
  hvac: z.object({
    airConditioning: z.boolean(),
    heating: z.boolean(),
  }),
});

export type AmenitiesFormValues = z.infer<typeof amenitiesSchema>;

interface AmenitiesFormProps {
  defaultValues?: Partial<AmenitiesFormValues>;
  onSuccess?: (data: AmenitiesFormValues) => void;
  address?: string;
}

export const AmenitiesForm = ({
  defaultValues,
  onSuccess,
  address,
}: AmenitiesFormProps) => {
  const form = useForm<AmenitiesFormValues>({
    resolver: zodResolver(amenitiesSchema),
    defaultValues: {
      // Utilities defaults
      accessibility: false,
      alarmSystem: false,
      bicycleParking: false,
      cableReady: false,
      lawn: false,
      onSiteLaundry: false,
      swimmingPool: false,
      fencedYard: false,
      fireplace: false,
      fitnessCenter: false,
      furnished: false,
      nearPark: false,
      secureBuilding: false,
      vaultedCeiling: false,
      garage: false,
      hotTubSpa: false,
      intercom: false,
      laundryHookups: false,
      offStreetParking: false,
      securityCameras: false,
      wiredForInternet: false,

      // Appliances defaults
      appliances: {
        dishwasher: false,
        garbageDisposal: false,
        refrigerator: false,
        dryer: false,
        microwave: false,
        washer: false,
        freezer: false,
        oven: false,
      },

      // Floor Coverings defaults
      floorCoverings: {
        carpet: false,
        concrete: false,
        hardwood: false,
        laminate: false,
        linoleumVinyl: false,
        slate: false,
        softwood: false,
        tile: false,
        other: false,
      },

      // HVAC defaults
      hvac: {
        airConditioning: false,
        heating: false,
      },
      ...defaultValues,
    },
  });

  const handleSubmit = (data: AmenitiesFormValues) => {
    onSuccess?.(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div>
          <div className="mb-6 flex items-center gap-2">
            <IconRound icon={utilitiesIcon} size="sm" />
            <h2 className="text-xl font-semibold text-gray-800">
              Utilities & Amenities
            </h2>
          </div>

          {address && (
            <div className="mb-6 text-sm text-gray-600">{address}</div>
          )}

          <div className="space-y-6">
            {/* Amenities Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={amenititesIcon} size="xs" />
                <h3 className="text-base font-medium">Amenities</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {/* ...existing amenities code... */}
                <FormField
                  control={form.control}
                  name="accessibility"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Accessibility
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="alarmSystem"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Alarm System
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bicycleParking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Bicycle Parking
                      </FormLabel>
                    </FormItem>
                  )}
                />

                {/* Continue with rest of .. */}
                <FormField
                  control={form.control}
                  name="cableReady"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Cable-Ready
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lawn"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Lawn
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="onSiteLaundry"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        On-Site Laundry
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="swimmingPool"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Swimming Pool
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fencedYard"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Fenced Yard
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fireplace"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Fireplace
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fitnessCenter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Fitness Center
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="furnished"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Furnished
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nearPark"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Near Park
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="secureBuilding"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Secure Building
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="vaultedCeiling"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Vaulted Ceiling
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="garage"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Garage
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hotTubSpa"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Hot Tub/Spa
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="intercom"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Intercom
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="laundryHookups"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Laundry Hookups
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="offStreetParking"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Off-Street Parking
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="securityCameras"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Security Cameras
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wiredForInternet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Wired For Internet
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Appliances Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={appliancesIcon} size="xs" />
                <h3 className="text-base font-medium">Appliances</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                <FormField
                  control={form.control}
                  name="appliances.dishwasher"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Dishwasher
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.dryer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Dryer
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.freezer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Freezer
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.garbageDisposal"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Garbage Disposal
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.microwave"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Microwave
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.oven"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Oven
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.refrigerator"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Refrigerator
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="appliances.washer"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Washer
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Floor Coverings Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={floorCoveringIcon} size="xs" />
                <h3 className="text-base font-medium">Floor Coverings</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                <FormField
                  control={form.control}
                  name="floorCoverings.carpet"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Carpet
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.concrete"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Concrete
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.hardwood"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Hardwood
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.laminate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Laminate
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.linoleumVinyl"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Linoleum / Vinyl
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.slate"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Slate
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.softwood"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Softwood
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.tile"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Tile
                      </FormLabel>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="floorCoverings.other"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        Other
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* HVAC Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={acIcon} size="xs" />
                <h3 className="text-base font-medium">
                  Air Conditioning & Heating
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Air Conditioning
                  </p>
                  <div className="flex items-center gap-6">
                    <FormField
                      control={form.control}
                      name="hvac.airConditioning"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            value={field.value ? "true" : "false"}
                            className="flex items-center gap-4"
                          >
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </div>
                      )}
                    />
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-700">
                    Heating
                  </p>
                  <div className="flex items-center gap-6">
                    <FormField
                      control={form.control}
                      name="hvac.heating"
                      render={({ field }) => (
                        <div className="flex items-center gap-2">
                          <RadioGroup
                            onValueChange={(value) =>
                              field.onChange(value === "true")
                            }
                            value={field.value ? "true" : "false"}
                            className="flex items-center gap-4"
                          >
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="true" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                Yes
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                No
                              </FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <LoadingButton
                type="submit"
                className="w-4/5 @lg:w-3/5"
                isLoading={form.formState.isSubmitting}
                size="lg"
              >
                Next
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
