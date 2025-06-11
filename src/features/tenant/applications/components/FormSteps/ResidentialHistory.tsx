import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircleIcon, XIcon } from "lucide-react";
import { z } from "zod";

import fileIcon from "@/assets/icons/file.png";
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
import { AddressEditor, addressSchema, type IAddress } from "../AddressEditor";
import { AddressSummaryCard } from "../AddressSummaryCard";

const residentialHistorySchema = z
  .object({
    currentAddress: addressSchema.optional(),
    pastAddress: z.any().optional(),
    pastNotApplicable: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.pastNotApplicable && !data.pastAddress) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please provide past address, Or check not applicable.",
        path: ["pastAddress"],
      });
    }
  });

type FormSchemaType = z.infer<typeof residentialHistorySchema>;

const AddressDialog = ({
  title,
  open,
  setOpen,
  address,
  setAddress,
}: {
  title: "Current" | "Past";
  open: boolean;
  setOpen: (show: boolean) => void;
  address: IAddress | undefined;
  setAddress: (address: IAddress) => void;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="h-screen min-w-screen overflow-scroll [&>button:last-child]:hidden">
        <DialogHeader className="flex-row items-center gap-3">
          <DialogClose className="flex size-9 items-center justify-center rounded-full border">
            <XIcon />
          </DialogClose>
          <DialogTitle className="text-2xl">
            {address ? "Edit" : "Add"} {title} address
          </DialogTitle>
        </DialogHeader>
        <AddressEditor
          data={address}
          onSubmit={(add) => {
            setAddress(add);
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export function ResidentialHistory({
  bookingData,
  onSuccess,
}: {
  bookingData?: IBooking;
  onSuccess: () => void;
}) {
  const { id } = useParams<{ id: string }>();
  const { mutateAsync, isPending } = useUpdateBookingMutation(id || "");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(residentialHistorySchema),
    defaultValues: {
      currentAddress: bookingData?.currentAddress,
      pastAddress: bookingData?.pastAddress,
      pastNotApplicable:
        bookingData?.currentAddress?.pastAddressNotApplicable ?? false,
    },
  });

  const pastNotApplicableWatch = useWatch({
    control: form.control,
    name: "pastNotApplicable",
  });

  const [currentOpen, setCurrentOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  const submitHandler = async (data: FormSchemaType) => {
    try {
      await mutateAsync({
        currentAddress: {
          ...data.currentAddress,
          streetAddress: data.currentAddress?.streetAddress || "",
          city: data.currentAddress?.city || "",
          unit: data.currentAddress?.unit || "",
          region: data.currentAddress?.region || "",
          zipCode: data.currentAddress?.zipCode || "",

          monthlyRent: data.currentAddress?.monthlyRent || "",

          residence: "current",
          pastAddressNotApplicable: data.pastNotApplicable,
          month: "",
          year: false,
          whyMove: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        pastAddress: data.pastNotApplicable ? undefined : data.pastAddress,
      });
      onSuccess();
    } catch (error) {
      form.setError("root", {
        message: getErrorMessage(error),
      });
    }
  };

  return (
    <div className="space-y-5">
      <div className="">
        <div className="flex items-center gap-3">
          <IconRound icon={fileIcon} size="sm" />
          <h2 className="text-2xl font-bold text-blue-900">
            Residential history
          </h2>
        </div>

        <p className="text-muted-foreground text-sm @lg:text-base">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5">
          {/* Current Address */}
          <FormField
            control={form.control}
            name="currentAddress"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel> Current Address</FormLabel>
                <FormControl>
                  <div className="">
                    {field.value ? (
                      <AddressSummaryCard
                        address={field.value}
                        onEdit={() => setCurrentOpen(true)}
                        onDelete={() => field.onChange(undefined)}
                      />
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setCurrentOpen(true)}
                        type="button"
                      >
                        <PlusCircleIcon className="size-5" />
                        <span>Add Current Address</span>
                      </Button>
                    )}
                    <AddressDialog
                      title="Current"
                      open={currentOpen}
                      setOpen={setCurrentOpen}
                      address={field.value}
                      setAddress={(address) => field.onChange(address)}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Past Address */}
          <div className="space-y-1">
            <h3 className="text-primary text-xl font-semibold">Past Address</h3>

            <FormField
              control={form.control}
              name="pastNotApplicable"
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
              name="pastAddress"
              render={({ field }) => (
                <FormItem className="">
                  <FormControl>
                    <div className="">
                      {!pastNotApplicableWatch &&
                        (field.value ? (
                          <AddressSummaryCard
                            address={field.value}
                            onEdit={() => setPastOpen(true)}
                            onDelete={() => field.onChange(undefined)}
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
                      <AddressDialog
                        title="Past"
                        open={pastOpen}
                        setOpen={setPastOpen}
                        address={form.getValues("pastAddress")}
                        setAddress={(address) =>
                          form.setValue("pastAddress", address)
                        }
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AddressDialog
              title="Past"
              open={pastOpen}
              setOpen={setPastOpen}
              address={form.getValues("pastAddress")}
              setAddress={(address) => form.setValue("pastAddress", address)}
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
    </div>
  );
}
