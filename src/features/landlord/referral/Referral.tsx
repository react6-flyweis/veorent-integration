import { useState } from "react";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Social media icons
import { Twitter, Facebook, Linkedin } from "lucide-react";

import referralCycleImage from "./assets/referral-cycle.png";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import InviteByEmail from "./components/InviteByEmail";
import { useAuthStore } from "@/store/useAuthStore";

export default function Referral() {
  const [copied, setCopied] = useState(false);

  const user = useAuthStore((state) => state.user);
  const referralLink = "https://veorent.com/r/" + user?.refferalCode || "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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

        <InviteByEmail />
      </div>
    </div>
  );
}
