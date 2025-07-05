import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdatePropertyMutation } from "../api/mutation";
import acIcon from "../assets/ac.png";
import amenititesIcon from "../assets/amenitites.png";
import appliancesIcon from "../assets/appliances.png";
import floorCoveringIcon from "../assets/floor-covering.png";
import utilitiesIcon from "../assets/utilities.png";

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
  defaultValues?: IAmenities;
  onSuccess: (data: AmenitiesFormValues) => void;
  propertyName?: string;
  completionStatus?: IFormCompletionStatus;
}

const amenitiesFields = [
  { name: "accessibility", label: "accessibility" },
  { name: "alarmSystem", label: "alarmSystem" },
  { name: "bicycleParking", label: "bicycleParking" },
  { name: "cableReady", label: "cableReady" },
  { name: "lawn", label: "lawn" },
  { name: "onSiteLaundry", label: "onSiteLaundry" },
  { name: "swimmingPool", label: "swimmingPool" },
  { name: "fencedYard", label: "fencedYard" },
  { name: "fireplace", label: "fireplace" },
  { name: "fitnessCenter", label: "fitnessCenter" },
  { name: "furnished", label: "furnished" },
  { name: "nearPark", label: "nearPark" },
  { name: "secureBuilding", label: "secureBuilding" },
  { name: "vaultedCeiling", label: "vaultedCeiling" },
  { name: "garage", label: "garage" },
  { name: "hotTubSpa", label: "hotTubSpa" },
  { name: "intercom", label: "intercom" },
  { name: "laundryHookups", label: "laundryHookups" },
  { name: "offStreetParking", label: "offStreetParking" },
  { name: "securityCameras", label: "securityCameras" },
  { name: "wiredForInternet", label: "wiredForInternet" },
] as const;

const appliancesFields = [
  { name: "dishwasher", label: "dishwasher" },
  { name: "dryer", label: "dryer" },
  { name: "freezer", label: "freezer" },
  { name: "garbageDisposal", label: "garbageDisposal" },
  { name: "microwave", label: "microwave" },
  { name: "oven", label: "oven" },
  { name: "refrigerator", label: "refrigerator" },
  { name: "washer", label: "washer" },
] as const;

const floorCoveringsFields = [
  { name: "carpet", label: "carpet" },
  { name: "concrete", label: "concrete" },
  { name: "hardwood", label: "hardwood" },
  { name: "laminate", label: "laminate" },
  { name: "linoleumVinyl", label: "linoleumVinyl" },
  { name: "slate", label: "slate" },
  { name: "softwood", label: "softwood" },
  { name: "tile", label: "tile" },
  { name: "other", label: "other" },
] as const;

export const AmenitiesForm = ({
  defaultValues,
  onSuccess,
  propertyName,
  completionStatus,
}: AmenitiesFormProps) => {
  const { t } = useTranslation();

  const { id } = useParams<{ id: string }>();
  const { mutateAsync } = useUpdatePropertyMutation(id || "");

  const form = useForm<AmenitiesFormValues>({
    resolver: zodResolver(amenitiesSchema),
    defaultValues: {
      // Utilities defaults
      bicycleParking: defaultValues?.biCycleParking || false,
      fencedYard: defaultValues?.fencedyard || false,
      fireplace: defaultValues?.firePlace || false,
      hotTubSpa: defaultValues?.hotTub || false,
      wiredForInternet: defaultValues?.wiredFromInternet || false,
      accessibility: false,
      alarmSystem: false,
      cableReady: false,
      lawn: false,
      onSiteLaundry: false,
      swimmingPool: false,
      fitnessCenter: false,
      furnished: false,
      nearPark: false,
      secureBuilding: false,
      vaultedCeiling: false,
      garage: false,
      intercom: false,
      laundryHookups: false,
      offStreetParking: false,
      securityCameras: false,

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
        ...defaultValues,
      },

      // Floor Coverings defaults
      floorCoverings: {
        carpet: defaultValues?.carPet || false,
        hardwood: defaultValues?.hardWood || false,
        linoleumVinyl: defaultValues?.linoleum || false,
        softwood: defaultValues?.softWood || false,
        laminate: false,
        concrete: false,
        slate: false,
        tile: false,
        other: false,
        ...defaultValues,
      },

      // HVAC defaults
      hvac: {
        airConditioning: defaultValues?.airCondition || false,
        heating: defaultValues?.heating || false,
      },
      ...defaultValues,
    },
  });

  const handleSubmit = async (data: AmenitiesFormValues) => {
    try {
      const amenitiesData: Partial<IAmenities> = {
        accessibility: data.accessibility,
        alarmSystem: data.alarmSystem,
        biCycleParking: data.bicycleParking,
        cableReady: data.cableReady,
        lawn: data.lawn,
        onSiteLaundry: data.onSiteLaundry,
        swimmingPool: data.swimmingPool,
        fencedyard: data.fencedYard,
        firePlace: data.fireplace,
        fitnessCenter: data.fitnessCenter,
        furnished: data.furnished,
        nearPark: data.nearPark,
        secureBuilding: data.secureBuilding,
        vaultedCeiling: data.vaultedCeiling,
        garage: data.garage,
        hotTub: data.hotTubSpa,
        intercom: data.intercom,
        laundryHookups: data.laundryHookups,
        offStreetParking: data.offStreetParking,
        securityCameras: data.securityCameras,
        wiredFromInternet: data.wiredForInternet,

        // Map appliances
        dishwasher: data.appliances.dishwasher,
        garbageDisposal: data.appliances.garbageDisposal,
        refrigerator: data.appliances.refrigerator,
        dryer: data.appliances.dryer,
        microwave: data.appliances.microwave,
        washer: data.appliances.washer,
        freezer: data.appliances.freezer,
        oven: data.appliances.oven,

        // Map floor coverings (note different spellings)
        carPet: data.floorCoverings.carpet,
        concrete: data.floorCoverings.concrete,
        hardWood: data.floorCoverings.hardwood,
        laminate: data.floorCoverings.laminate,
        linoleum: data.floorCoverings.linoleumVinyl,
        slate: data.floorCoverings.slate,
        softWood: data.floorCoverings.softwood,
        tile: data.floorCoverings.tile,
        other: data.floorCoverings.other,

        // Map HVAC
        airCondition: data.hvac.airConditioning,
        heating: data.hvac.heating,
      };

      const valuesToSubmit: IPropertyUpdateData = {
        amenities: amenitiesData as IAmenities,
        formCompletionStatus: {
          ...completionStatus,
          amenities: true,
        },
      };
      await mutateAsync(valuesToSubmit);
      onSuccess(data);
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
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

          {propertyName && (
            <div className="text-primary mb-5 text-xl">{propertyName}</div>
          )}

          <div className="space-y-6">
            {/* Amenities Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={amenititesIcon} size="xs" />
                <h3 className="text-base font-medium">{t("amenities")}</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {amenitiesFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name as keyof AmenitiesFormValues}
                    render={({ field: formField }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={formField.value as boolean}
                            onCheckedChange={formField.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t(field.label)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Appliances Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={appliancesIcon} size="xs" />
                <h3 className="text-base font-medium">Appliances</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {appliancesFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={
                      `appliances.${field.name}` as keyof AmenitiesFormValues
                    }
                    render={({ field: formField }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={formField.value as boolean}
                            onCheckedChange={formField.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t(field.label)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Floor Coverings Section */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <IconRound icon={floorCoveringIcon} size="xs" />
                <h3 className="text-base font-medium">Floor Coverings</h3>
              </div>

              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {floorCoveringsFields.map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={
                      `floorCoverings.${field.name}` as keyof AmenitiesFormValues
                    }
                    render={({ field: formField }) => (
                      <FormItem className="flex flex-row items-center space-y-0 space-x-2">
                        <FormControl>
                          <Checkbox
                            checked={formField.value as boolean}
                            onCheckedChange={formField.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {t(field.label)}
                        </FormLabel>
                      </FormItem>
                    )}
                  />
                ))}
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
                                {t("yes")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {t("no")}
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
                                {t("yes")}
                              </FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-y-0 space-x-2">
                              <FormControl>
                                <RadioGroupItem value="false" />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {t("no")}
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

            <FormErrors errors={form.formState.errors} />

            <div className="flex items-center justify-center">
              <LoadingButton
                type="submit"
                className="w-4/5 @lg:w-3/5"
                isLoading={form.formState.isSubmitting}
                size="lg"
              >
                {t("next")}
              </LoadingButton>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};
