import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";

import { IconRound } from "@/components/IconRound";
import {
  MultiStepper,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
} from "@/components/MultiStepper";
import personImgIcon from "@/assets/icons/person.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const units = [
  {
    id: 1,
    propertyName: "Property Name",
    address: "Address line 1 region",
    unitName: "Unit Name",
    type: "Type Of Unit",
    totalUnits: 1,
    availableUnits: 20,
  },
  {
    id: 2,
    propertyName: "Property Name",
    address: "Address line 1 region",
    unitName: "Unit Name",
    type: "Type Of Unit",
    totalUnits: 1,
    availableUnits: 20,
  },
];

const formSchema = z.object({
  selectedUnitId: z.string({ required_error: "Please select a unit" }),
  action: z.enum(["deny", "active"], {
    required_error: "Please select an action",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MoveInProcess() {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      selectedUnitId: undefined,
      action: undefined,
    },
  });

  function onSubmit(values: FormValues) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <MultiStepper>
          <MultiStepperIndicator
            showCount={false}
            routeBack={() => navigate(-1)}
          />
          <MultiStepperHeader>
            <div className="flex items-center gap-3">
              <IconRound icon={personImgIcon} size="sm" />
              <h2 className="text-2xl font-bold text-blue-900">
                Move in Process
              </h2>
            </div>
          </MultiStepperHeader>

          <MultiStepperStep>
            <FormField
              control={form.control}
              name="selectedUnitId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select a Unit</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="grid grid-cols-2 gap-5"
                    >
                      {units.map((unit) => (
                        <Label key={unit.id} className="cursor-pointer w-full">
                          <RadioGroupItem
                            value={unit.id.toString()}
                            className="sr-only"
                          />
                          <Card
                            className={cn(
                              "p-2 w-full",
                              field.value === unit.id.toString() &&
                                "border-primary border-2"
                            )}
                          >
                            <CardHeader className="px-2">
                              <CardTitle className="text-lg">
                                {unit.propertyName}
                              </CardTitle>
                              <CardDescription>{unit.address}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-2">
                              <div className="flex justify-between font-semibold text-primary">
                                <span>{unit.unitName}</span>
                                <span>No. of Units</span>
                              </div>
                              <div className="flex justify-between text-sm text-muted-foreground">
                                <span>{unit.type}</span>
                                <span>{unit.totalUnits}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between px-2 pt-2 border-t">
                              <p className="text-sm">
                                <span>Available No. of Units: </span>
                                <span className="font-bold">
                                  {unit.availableUnits}
                                </span>
                              </p>
                            </CardFooter>
                          </Card>
                        </Label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />
          </MultiStepperStep>

          <MultiStepperStep>
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Other Applicants</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <Label className="flex items-center gap-2">
                        <RadioGroupItem value="deny" />
                        <span className="text-sm">
                          Deny and send a Notification
                        </span>
                      </Label>
                      <Label className="flex items-center gap-2">
                        <RadioGroupItem value="active" />
                        <span className="text-sm">
                          Keep as an Active Applicant
                        </span>
                      </Label>
                    </RadioGroup>
                  </FormControl>
                  <FormDescription>
                    All Denied applicants will be automatically archived
                  </FormDescription>
                </FormItem>
              )}
            />
          </MultiStepperStep>

          <MultiStepperStep>Final</MultiStepperStep>

          <MultiStepperButton />
        </MultiStepper>
      </form>
    </Form>
  );
}
