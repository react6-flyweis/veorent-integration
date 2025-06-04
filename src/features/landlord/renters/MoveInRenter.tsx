import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Navigate, useLocation, useNavigate } from "react-router";

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/useAlertToast";
import { getFullName, getInitial } from "@/utils/name";
import { formatDate } from "@/utils/formatDate";

// const units = [
//   {
//     id: 1,
//     propertyName: "Property Name",
//     address: "Address line 1 region",
//     unitName: "Unit Name",
//     type: "Type Of Unit",
//     totalUnits: 1,
//     availableUnits: 20,
//   },
//   {
//     id: 2,
//     propertyName: "Property Name",
//     address: "Address line 1 region",
//     unitName: "Unit Name",
//     type: "Type Of Unit",
//     totalUnits: 1,
//     availableUnits: 20,
//   },
// ];

const formSchema = z.object({
  action: z.enum(["deny", "active"], {
    required_error: "Please select an action",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function MoveInRenter() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { state } = useLocation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: FormValues) {
    try {
      console.log(values);
      showToast("Renter moved successfully", "success");
      navigate("/landlord/renters/applicants");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  if (!state || !state.applicant) {
    return <Navigate to="/landlord/renters/applicants" replace />;
  }

  const applicant = state.applicant as IApplicant;

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
              {[
                {
                  ...applicant.destinationProperty,
                },
              ].map((unit) => (
                <Card className="w-full p-2">
                  <CardHeader className="px-2">
                    <CardTitle className="text-lg">
                      {/* {unit.propertyName} */}
                      {unit.streetAddress}
                    </CardTitle>
                    <CardDescription>{unit.streetAddress}</CardDescription>
                  </CardHeader>
                  <CardContent className="px-2">
                    <div className="text-primary flex justify-between font-semibold">
                      <span>{unit.unitNumber}</span>
                      <span>No. of Units</span>
                    </div>
                    <div className="text-muted-foreground flex justify-between text-sm">
                      {/* <span>{unit.type}</span> */}
                      <span>Type</span>
                      {/* <span>{unit.totalUnits}</span> */}
                      <span>{applicant.allocateUnit}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t px-2 pt-2">
                    <p className="text-sm">
                      <span>Available No. of Units: </span>
                      <span className="font-bold">
                        {applicant.avalibleUnit || "N/A"}
                      </span>
                    </p>
                  </CardFooter>
                </Card>
              ))}
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
                  <AvatarImage
                    src={applicant.userId?.dummyImage[0].img}
                    alt={getFullName(
                      applicant.userId?.firstname,
                      applicant.userId?.lastname,
                    )}
                  />
                  <AvatarFallback>
                    {getInitial(
                      applicant.userId?.firstname +
                        " " +
                        applicant.userId.lastname,
                    )}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-primary font-semibold">
                    {getFullName(
                      applicant.userId?.firstname,
                      applicant.userId?.lastname,
                    )}
                  </p>
                  {/* <p className="text-sm text-gray-500">{applicant.currentProperty.name}</p> */}
                  <p className="text-sm text-gray-500">
                    {applicant.currentProperty.streetAddress}
                  </p>
                  <p className="text-sm text-gray-500">
                    {applicant.currentProperty.streetAddress}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {[
                  {
                    id: "draft",
                    status: "Draft",
                    leaseName: applicant.lease?.leaseNickname,
                    propertyName: "Property Name, Unit Name",
                    term:
                      formatDate(applicant.lease?.startDate) +
                      " - " +
                      formatDate(applicant.lease?.endDate || ""),
                    rent: "2000 F.CFA/Month",
                  },
                  {
                    id: "endingSoon",
                    status: "Ending Soon",
                    leaseName: "Lease Name",
                    propertyName:
                      applicant.currentProperty.streetAddress +
                      ", " +
                      applicant.currentProperty.unitNumber,
                    term:
                      formatDate(applicant.currentPropertyLeaseTerm.startDate) +
                      " - " +
                      formatDate(
                        applicant.currentPropertyLeaseTerm.endDate || "",
                      ),
                    rent: "2000 F.CFA/Month",
                  },
                ].map((lease) => (
                  <Card
                    key={lease.id}
                    className="w-full p-3" // Removed interactive states and border logic
                  >
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
                  Next
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Confirm Move In</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="items-cnter flex gap-5">
                    {/* Avatar */}
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={applicant.userId?.dummyImage[0].img}
                        alt="Kianna Dias"
                      />
                      <AvatarFallback>
                        {getInitial(
                          applicant.userId?.firstname +
                            " " +
                            applicant.userId.lastname,
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="">
                      <div className="text-lg font-bold">
                        {getFullName(
                          applicant.userId?.firstname,
                          applicant.userId?.lastname,
                        )}
                      </div>
                      <div className="text-muted-foreground mb-1 text-xs">
                        Date Submitted: {formatDate(applicant.createdAt, true)}
                      </div>
                      <div className="mb-2 text-sm font-semibold text-gray-700">
                        {applicant.currentProperty.streetAddress},{" "}
                        {applicant.currentProperty.unitNumber}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-1 text-lg font-bold">Unit</h3>
                    <Card className="gap-1 p-3">
                      <CardContent className="space-y-2 p-0">
                        <div>
                          <p className="text-primary font-bold">
                            Destination Property Name
                          </p>
                          <p className="text-sm text-gray-500">
                            {applicant.destinationProperty.streetAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Unit Name</p>
                          <p className="text-sm text-gray-500">
                            {applicant.destinationProperty.unitNumber}
                          </p>
                          <p className="text-sm text-gray-500">No.of.unit</p>
                          <p className="text-sm text-gray-500">
                            {applicant.destinationProperty.unitNumber}
                          </p>
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
                          <p className="text-primary font-bold">
                            {applicant.lease?.leaseNickname}
                          </p>
                          <p className="text-sm text-gray-500">
                            {/* {applicant.destinationProperty.name}, */}
                            Destination property,{" "}
                            {applicant.destinationProperty.streetAddress}
                          </p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Rent</p>
                          <p className="text-sm text-gray-500">50 F.CFA/day</p>
                        </div>
                        <div>
                          <p className="text-primary font-bold">Lease term</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(applicant.lease?.startDate)} -{" "}
                            {formatDate(applicant.lease?.endDate || "")}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    className="w-full"
                    onClick={form.handleSubmit(onSubmit)}
                  >
                    Move IN
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </MultiStepperButton>
        </MultiStepper>
      </form>
    </Form>
  );
}
