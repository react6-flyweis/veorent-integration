import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Navigate, useLocation, useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import personImgIcon from "@/assets/icons/person.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import {
  MultiStepper,
  MultiStepperButton,
  MultiStepperHeader,
  MultiStepperIndicator,
  MultiStepperStep,
} from "@/components/MultiStepper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { LoadingButton } from "@/components/ui/loading-button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/useAlertToast";
import { formatDate } from "@/utils/formatDate";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useCreateMoveRequestMutation } from "./api/mutations";

const formSchema = z.object({
  action: z.enum(["deny", "active"], {
    required_error: "Please select an action",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MoveInProcess() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const { state } = useLocation();

  const { mutateAsync } = useCreateMoveRequestMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const dataToSubmit: IMoveIn = {
        ...state.data,
        availableUnit: state.data.availableUnit || "",
        allocateUnit: state.data.allocateUnit || "",
        otherApplicants:
          values.action === "deny"
            ? "Deny-And-Send-A-Notification"
            : "Keep-As-An-Active-Applicant",
      };

      await mutateAsync(dataToSubmit);
      showToast("Move in process completed successfully!", "success");
      navigate("/tenant");
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  if (!state || !state.data) {
    return <Navigate to="/tenant" replace />;
  }

  const data = state.data as Omit<
    IMoveIn,
    "availableUnit" | "allocateUnit" | "otherApplicants"
  >;

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
              <h2 className="text-primary text-2xl font-bold">
                Move in Process
              </h2>
            </div>
          </MultiStepperHeader>

          <MultiStepperStep onValidate={() => true}>
            <h3 className="text-primary text-2xl font-bold">Units</h3>
            <div className="flex gap-5">
              <Card className="w-full p-2">
                <CardHeader className="px-2">
                  <CardTitle className="text-lg">
                    {data.destinationProperty.streetAddress}
                  </CardTitle>
                  <CardDescription>
                    {data.destinationProperty.streetAddress}
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-2">
                  <div className="text-primary flex justify-between font-semibold">
                    <span>{data.destinationProperty.unitNumber}</span>
                    <span>No. of Units</span>
                  </div>
                  <div className="text-muted-foreground flex justify-between text-sm">
                    <span>{t("type")}</span>
                    <span>1</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t px-2 pt-2">
                  <p className="text-sm">
                    <span>Available No. of Units: </span>
                    <span className="font-bold">1</span>
                  </p>
                </CardFooter>
              </Card>
            </div>
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
              <div>
                <h3 className="text-primary text-2xl font-bold">Lease</h3>
              </div>

              <div className="flex items-center gap-3">
                <Avatar className="size-14">
                  <AvatarImage src="" alt="Tenant avatar" />
                  <AvatarFallback>TN</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-primary font-semibold">Current Tenant</p>
                  <p className="text-sm text-gray-500">
                    {data.currentProperty.streetAddress}
                  </p>
                  <p className="text-sm text-gray-500">
                    {data.currentProperty.unitNumber}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {[
                  {
                    id: "draft",
                    status: "Draft",
                    leaseName: "New Lease",
                    propertyName: `${data.destinationProperty.streetAddress}, ${data.destinationProperty.unitNumber}`,
                    term: `${formatDate(data.destinationPropertyLeaseTerm.startDate)} - ${formatDate(data.destinationPropertyLeaseTerm.endDate)}`,
                    rent: "2000 F.CFA/Month",
                  },
                  {
                    id: "endingSoon",
                    status: "Ending Soon",
                    leaseName: "Current Lease",
                    propertyName: `${data.currentProperty.streetAddress}, ${data.currentProperty.unitNumber}`,
                    term: `${formatDate(data.currentPropertyLeaseTerm.startDate)} - ${formatDate(data.currentPropertyLeaseTerm.endDate)}`,
                    rent: "2000 F.CFA/Month",
                  },
                ].map((lease) => (
                  <Card key={lease.id} className="w-full p-3">
                    <CardHeader className="mb-2 p-0">
                      <p className="text-sm text-gray-500">{lease.status}</p>
                      <CardTitle className="text-primary text-lg">
                        {lease.leaseName}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {lease.propertyName}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2 p-0">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-gray-500">Lease term</p>
                          <p className="text-primary text-sm font-semibold">
                            {lease.term}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Rent</p>
                          <p className="text-primary text-sm font-semibold">
                            {lease.rent}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </MultiStepperStep>

          <MultiStepperButton>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" type="button" className="w-3/5">
                  {t("next")}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Confirm Move In</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src="" alt="Tenant avatar" />
                      <AvatarFallback>TN</AvatarFallback>
                    </Avatar>
                    <div className="">
                      <div className="text-lg font-bold">Current Tenant</div>
                      <div className="text-muted-foreground mb-1 text-xs">
                        Move Date: {formatDate(data.moveDate, true)}
                      </div>
                      <div className="mb-2 text-sm font-semibold text-gray-700">
                        {data.currentProperty.streetAddress},{" "}
                        {data.currentProperty.unitNumber}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">{t("unit")}</h3>
                    <Card className="gap-1 p-3">
                      <CardContent className="space-y-2 p-0">
                        <div>
                          <p className="text-primary font-bold">
                            Destination Property
                          </p>
                          <p className="text-sm text-gray-500">
                            {data.destinationProperty.streetAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Unit Name</p>
                          <p className="text-sm text-gray-500">
                            {data.destinationProperty.unitNumber}
                          </p>
                          <p className="text-sm text-gray-500">No.of.unit</p>
                          <p className="text-sm text-gray-500">1</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div>
                    <h3 className="text-primary mb-1 text-lg font-bold">
                      Lease
                    </h3>
                    <Card className="gap-1 p-3">
                      <CardContent className="space-y-2 p-0">
                        <div>
                          <p className="text-primary font-bold">New Lease</p>
                          <p className="text-sm text-gray-500">
                            Destination property,{" "}
                            {data.destinationProperty.streetAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Rent</p>
                          <p className="text-sm text-gray-500">50 F.CFA/day</p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Lease term</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(
                              data.destinationPropertyLeaseTerm.startDate,
                            )}{" "}
                            -{" "}
                            {formatDate(
                              data.destinationPropertyLeaseTerm.endDate,
                            )}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <FormErrors
                      className="mt-2"
                      errors={form.formState.errors}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <LoadingButton
                    type="button"
                    className="w-full"
                    onClick={form.handleSubmit(onSubmit)}
                    isLoading={form.formState.isSubmitting}
                  >
                    Move IN
                  </LoadingButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </MultiStepperButton>
        </MultiStepper>
      </form>
    </Form>
  );
}
