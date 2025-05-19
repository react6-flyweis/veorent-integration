import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlusCircleIcon, XIcon } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import fileIcon from "@/assets/icons/file.png";
import { IconRound } from "@/components/IconRound";
import { AddressSummaryCard } from "../AddressSummaryCard";

import { z } from "zod";
import { AddressEditor, addressSchema, type IAddress } from "../AddressEditor";

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

export function ResidentialHistory({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(residentialHistorySchema),
    defaultValues: {
      pastNotApplicable: false,
    },
  });

  const pastNotApplicableWatch = useWatch({
    control: form.control,
    name: "pastNotApplicable",
  });

  const [currentOpen, setCurrentOpen] = useState(false);
  const [pastOpen, setPastOpen] = useState(false);

  const submitHandler = (data: FormSchemaType) => {
    console.log(data);
    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="space-y-5">
        <div className="flex items-center gap-3">
          <IconRound icon={fileIcon} size="sm" />
          <h2 className="text-2xl font-bold text-blue-900">Application Info</h2>
        </div>

        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
        </p>

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
          <h3 className="text-xl text-primary font-semibold">Past Address</h3>

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

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="w-3/5">
            Save & Next
          </Button>
        </div>
      </form>
    </Form>
  );
}

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
        <DialogHeader className="flex-row gap-3 items-center">
          <DialogClose className="rounded-full flex justify-center items-center size-9 border">
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
