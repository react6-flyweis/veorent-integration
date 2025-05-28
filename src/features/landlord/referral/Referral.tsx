import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

// Social media icons
import { Twitter, Facebook, Linkedin } from "lucide-react";

import referralCycleImage from "./assets/referral-cycle.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";

export default function Referral() {
  const [email, setEmail] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [copied, setCopied] = useState(false);

  const referralLink =
    "https://veorent.com/r/ragmdaj/123/444/fh1sdfsdf/dbvddsg/d";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = () => {
    // Handle sending invite logic here
    console.log("Sending invite to:", email);
    console.log("Custom message:", customMessage);
    // Reset form
    setEmail("");
    setCustomMessage("");
  };

  return (
    <div className="">
      <PageTitle title="Referral" />

      <div className="">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={referralCycleImage}
            alt="Referral Cycle"
            className="max-h-7 max-w-7"
          />
          <div className="flex items-center gap-1">
            <span className="font-bold">Give</span>
            <CurrencyIcon size="sm" />
            <span className="font-bold">100</span>
            <CurrencyIcon size="sm" />
            <span className="font-bold">100</span>
          </div>
        </div>

        <h2 className="mb-2 text-xl font-bold">Share Your Referral Link</h2>
        <p className="mb-2 text-sm">Copy Your Link</p>

        <div className="mb-6 flex justify-between gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 text-blue-500 @md:max-w-1/2"
          />
          <Button onClick={handleCopyLink} className="whitespace-nowrap">
            {copied ? "Copied!" : "Copy Link"}
          </Button>
        </div>

        <div className="mb-6 flex flex-col items-center gap-2 @lg:flex-row">
          <p className="text-sm">SHARE YOUR LINK ON:</p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-black text-white hover:bg-gray-800"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            >
              <Facebook className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-sky-500 text-white hover:bg-sky-600"
            >
              <Twitter className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-blue-700 text-white hover:bg-blue-800"
            >
              <Linkedin className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-500">OR</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <h2 className="mb-4 text-xl font-bold">Invite By Email</h2>
        <p className="mb-4 text-sm text-gray-500">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
        </p>

        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium">
              Custom Message <span className="text-gray-500">(Optional)</span>
            </label>
            <Textarea
              id="message"
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              placeholder="Write your custom message here"
              className="min-h-[120px]"
            />
            <p className="mt-1 text-xs text-gray-500">0/500 characters used</p>
          </div>
          <div className="flex justify-center">
            <Button size={"lg"} className="w-3/5" onClick={handleSendInvite}>
              Send Invite
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
