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
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/useAlertToast";

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
  const { showToast } = useToast();
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
    showToast("Move in process completed successfully!", "success");
    navigate("/tenant");
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

          <MultiStepperStep onValidate={() => form.trigger("selectedUnitId")}>
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
                      className="grid gap-5 @lg:grid-cols-2"
                    >
                      {units.map((unit) => (
                        <Label key={unit.id} className="w-full cursor-pointer">
                          <RadioGroupItem
                            value={unit.id.toString()}
                            className="sr-only"
                          />
                          <Card
                            className={cn(
                              "w-full p-2",
                              field.value === unit.id.toString() &&
                                "border-primary border-2",
                            )}
                          >
                            <CardHeader className="px-2">
                              <CardTitle className="text-lg">
                                {unit.propertyName}
                              </CardTitle>
                              <CardDescription>{unit.address}</CardDescription>
                            </CardHeader>
                            <CardContent className="px-2">
                              <div className="text-primary flex justify-between font-semibold">
                                <span>{unit.unitName}</span>
                                <span>No. of Units</span>
                              </div>
                              <div className="text-muted-foreground flex justify-between text-sm">
                                <span>{unit.type}</span>
                                <span>{unit.totalUnits}</span>
                              </div>
                            </CardContent>
                            <CardFooter className="flex justify-between border-t px-2 pt-2">
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

          <MultiStepperStep onValidate={() => form.trigger("action")}>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </MultiStepperStep>

          <MultiStepperStep>
            <div className="space-y-6">
              <h3 className="text-primary text-2xl font-semibold">Lease</h3>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-medium">Kaiya Lipshultz</h3>
                  {form.watch("selectedUnitId") && (
                    <div className="text-muted-foreground text-sm">
                      {
                        units.find(
                          (unit) =>
                            unit.id.toString() === form.watch("selectedUnitId"),
                        )?.propertyName
                      }
                      <br />
                      {
                        units.find(
                          (unit) =>
                            unit.id.toString() === form.watch("selectedUnitId"),
                        )?.unitName
                      }
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 @lg:flex-row">
                <div className="grid flex-1 gap-6">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-muted-foreground mb-4 text-sm font-medium">
                      Draft Lease
                    </h4>
                    <div>
                      <div className="font-medium">Lease Name</div>
                      <div className="text-muted-foreground text-sm">
                        {
                          units.find(
                            (unit) =>
                              unit.id.toString() ===
                              form.watch("selectedUnitId"),
                          )?.propertyName
                        }
                        ,
                        {
                          units.find(
                            (unit) =>
                              unit.id.toString() ===
                              form.watch("selectedUnitId"),
                          )?.unitName
                        }
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="">
                        <div className="font-medium">Lease Term</div>
                        <div className="text-muted-foreground text-sm">
                          Start Date - End Date
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Rent</div>
                        <div className="text-muted-foreground text-sm">
                          2000 F.CFA/Month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid flex-1 gap-6">
                  <div className="rounded-lg border p-4">
                    <h4 className="text-muted-foreground mb-4 text-sm font-medium">
                      Ending Soon
                    </h4>
                    <div>
                      <div className="font-medium">Lease Name</div>
                      <div className="text-muted-foreground text-sm">
                        {
                          units.find(
                            (unit) =>
                              unit.id.toString() ===
                              form.watch("selectedUnitId"),
                          )?.propertyName
                        }
                        ,
                        {
                          units.find(
                            (unit) =>
                              unit.id.toString() ===
                              form.watch("selectedUnitId"),
                          )?.unitName
                        }
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <div className="">
                        <div className="font-medium">Lease Term</div>
                        <div className="text-muted-foreground text-sm">
                          Start Date - End Date
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">Rent</div>
                        <div className="text-muted-foreground text-sm">
                          2000 F.CFA/Month
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </MultiStepperStep>

          <MultiStepperButton>
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button" className="w-4/5 @lg:w-3/5">
                  Move In
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 pb-2">
                    <Avatar>
                      <AvatarImage src="" alt="Tenant avatar" />
                      <AvatarFallback>KL</AvatarFallback>
                    </Avatar>
                    <h3 className="text-lg font-semibold">Kaiya Lipshutz</h3>
                  </div>

                  <div className="rounded-lg border px-3 py-2">
                    <h4 className="mb-1 font-semibold text-blue-900">Unit</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-blue-900">
                          Property Name
                        </p>
                        <p className="text-sm text-gray-500">
                          Address line 1 region
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Unit Name</p>
                        <p className="text-sm text-gray-500">Type Of Unit</p>
                        <p className="text-sm text-gray-500">No.of unit</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border px-3 py-2">
                    <h4 className="mb-1 font-semibold text-blue-900">Lease</h4>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-blue-900">
                          Peter Shop Jan
                        </p>
                        <p className="text-sm text-gray-500">
                          Peter shop, Shop number 305
                        </p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Rent</p>
                        <p className="text-sm text-gray-500">50 FCFA/day</p>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">
                          Lease term
                        </p>
                        <p className="text-sm text-gray-500">Month - Month</p>
                      </div>
                    </div>
                  </div>

                  <Button
                    className="mt-2 w-full"
                    type="submit"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Move IN
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </MultiStepperButton>
        </MultiStepper>
      </form>
    </Form>
  );
}
