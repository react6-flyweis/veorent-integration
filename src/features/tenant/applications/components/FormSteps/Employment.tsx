import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { z } from "zod";

import businessmanIcon from "@/assets/icons/businessman.png";
import FormErrors from "@/components/FormErrors";
import { IconRound } from "@/components/IconRound";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoadingButton } from "@/components/ui/loading-button";
import { getErrorMessage } from "@/utils/getErrorMessage";

import { useUpdateBookingMutation } from "../../api/mutation";
import {
  EmployerEditor,
  employerSchema,
  type IEmployer,
} from "../EmployerEditor";
import { EmployerSummaryCard } from "../EmploymentSummaryCard";

const employerDetailsSchema = z
  .object({
    currentEmployer: employerSchema.optional(),
    noCurrent: z.boolean().optional(),
    pastEmployer: employerSchema.optional(),
    noPast: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.noCurrent && !data.currentEmployer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide Current employment, Or check not applicable.",
        path: ["currentEmployer"],
      });
    }
    if (!data.noPast && !data.pastEmployer) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide past employer, Or check not applicable.",
        path: ["pastEmployer"],
      });
    }
  });

type FormSchemaType = z.infer<typeof employerDetailsSchema>;

const EmployerDialog = ({
  title,
  open,
  setOpen,
  employer,
  setEmployer,
}: {
  title: "Current" | "Past";
  open: boolean;
  setOpen: (show: boolean) => void;
  employer: IEmployer | undefined;
  setEmployer: (address: IEmployer) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-screen min-w-screen overflow-scroll [&>button:last-child]:hidden">
        <DialogHeader className="flex-row items-center gap-3">
          <DialogClose className="flex size-9 items-center justify-center rounded-full border">
            <XIcon />
          </DialogClose>
          <DialogTitle className="text-2xl">
            {employer ? "Edit" : "Add"} {title} Employer
          </DialogTitle>
        </DialogHeader>
        <EmployerEditor
          data={employer}
          onSubmit={(add) => {
            setEmployer(add);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export function EmploymentDetails({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(employerDetailsSchema),
    defaultValues: {
      currentEmployer: bookingData?.employment
        ? {
            employerName: bookingData.employment.employer,
            position: bookingData.employment.occuption,
            monthStarted: bookingData.employment.month,
            yearStarted: bookingData.employment.year,
            monthlyIncome: bookingData.employment.income,
            referenceName: bookingData.employment.employemntReferenceName,
            referenceNumber: bookingData.employment.employemntReferenceNumber,
          }
        : undefined,
      pastEmployer: bookingData?.pastEmployment
        ? {
            employerName: bookingData.pastEmployment.employer,
            position: bookingData.pastEmployment.occuption,
            monthStarted: bookingData.pastEmployment.month,
            yearStarted: bookingData.pastEmployment.year,
            monthlyIncome: bookingData.pastEmployment.income,
            referenceName: bookingData.pastEmployment.employemntReferenceName,
            referenceNumber:
              bookingData.pastEmployment.employemntReferenceNumber,
          }
        : undefined,
      noCurrent: !bookingData?.employment,
      noPast: bookingData?.employment?.pastemployemntNotApplicable ?? false,
    },
  });

  const watchNoPast = useWatch({
    control: form.control,
    name: "noPast",
  });

  const watchNoCurrent = useWatch({
    control: form.control,
    name: "noCurrent",
  });

  const [currentOpen, setCurrentOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  const submitHandler = async (data: FormSchemaType) => {
    try {
      await mutateAsync({
        employment: data.noCurrent
          ? undefined
          : {
              currentEmployer: false,
              employer: data.currentEmployer?.employerName || "",
              occuption: data.currentEmployer?.position || "",
              month: data.currentEmployer?.monthStarted || "",
              year: data.currentEmployer?.yearStarted || "",
              income: data.currentEmployer?.monthlyIncome || "",
              employemntReferenceName:
                data.currentEmployer?.referenceName || "",
              employemntReferenceNumber:
                data.currentEmployer?.referenceNumber || "",
              pastemployemntNotApplicable: data.noPast || false,
            },
        pastEmployment: data.noPast
          ? undefined
          : {
              currentEmployer: false,
              employer: data.pastEmployer?.employerName || "",
              occuption: data.pastEmployer?.position || "",
              month: data.pastEmployer?.monthStarted || "",
              year: data.pastEmployer?.yearStarted || "",
              income: data.pastEmployer?.monthlyIncome || "",
              employemntReferenceName: data.pastEmployer?.referenceName || "",
              employemntReferenceNumber:
                data.pastEmployer?.referenceNumber || "",
            },
      });
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5">
        <div className="flex items-center gap-3">
          <IconRound icon={businessmanIcon} size="sm" />
          <h2 className="text-primary text-2xl font-bold">Employment</h2>
        </div>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

        {/*  Current Employer */}
        <div className="space-y-1">
          <h3 className="text-primary text-xl font-semibold">
            Current Employer
          </h3>

          <FormField
            control={form.control}
            name="noCurrent"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(c === true)}
                  />
                </FormControl>
                <FormLabel>Not Applicable</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentEmployer"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="">
                    {!watchNoCurrent &&
                      (field.value ? (
                        <EmployerSummaryCard
                          data={field.value}
                          onEdit={() => setCurrentOpen(true)}
                          onDelete={() => {
                            field.onChange(undefined);
                          }}
                        />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setCurrentOpen(true)}
                          type="button"
                        >
                          <PlusCircleIcon className="size-5" />
                          <span>Add Current Employer</span>
                        </Button>
                      ))}
                    <EmployerDialog
                      title="Current"
                      open={currentOpen}
                      setOpen={setCurrentOpen}
                      employer={field.value}
                      setEmployer={(address) => field.onChange(address)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Past Employer */}
        <div className="space-y-1">
          <h3 className="text-primary text-xl font-semibold">Past Employer</h3>

          <FormField
            control={form.control}
            name="noPast"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={(c) => field.onChange(c === true)}
                  />
                </FormControl>
                <FormLabel>Not Applicable</FormLabel>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="pastEmployer"
            render={({ field }) => (
              <FormItem className="">
                <FormControl>
                  <div className="">
                    {!watchNoPast &&
                      (field.value ? (
                        <EmployerSummaryCard
                          data={field.value}
                          onEdit={() => setPastOpen(true)}
                          onDelete={() => {
                            field.onChange(undefined);
                          }}
                        />
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => setPastOpen(true)}
                          type="button"
                        >
                          <PlusCircleIcon className="size-5" />
                          <span>Add Past Address</span>
                        </Button>
                      ))}
                    <EmployerDialog
                      title="Past"
                      open={pastOpen}
                      setOpen={setPastOpen}
                      employer={form.getValues("pastEmployer")}
                      setEmployer={(address) =>
                        form.setValue("pastEmployer", address)
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <EmployerDialog
            title="Past"
            open={pastOpen}
            setOpen={setPastOpen}
            employer={form.getValues("pastEmployer")}
            setEmployer={(address) => form.setValue("pastEmployer", address)}
          />
        </div>

        <FormErrors errors={form.formState.errors} />

        <div className="flex justify-center">
          <LoadingButton
            type="submit"
            size="lg"
            className="w-4/5 @lg:w-3/5"
            isLoading={isPending}
          >
            Save & Next
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
