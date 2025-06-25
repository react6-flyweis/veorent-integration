import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { Twitter, Facebook, Linkedin } from "lucide-react";

import { CurrencyIcon } from "@/components/CurrencyIcon";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Social media icons

import { useAuthStore } from "@/store/useAuthStore";

import referralCycleImage from "./assets/referral-cycle.png";
import InviteByEmail from "./components/InviteByEmail";

export default function Referral() {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const user = useAuthStore((state) => state.user);
  const referralLink = user?.refferalCode
    ? `https://veorent.com/r/${user.refferalCode}`
    : "";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="">
      <PageTitle title={t("referral")} />

      <div className="">
        <div className="mb-4 flex items-center gap-3">
          <img
            src={referralCycleImage}
            alt="Referral Cycle"
            className="max-h-7 max-w-7"
          />
          <div className="flex items-center gap-1">
            <span className="font-bold">{t("give")}</span>
            <CurrencyIcon size="sm" />
            <span className="font-bold">100</span>
            <CurrencyIcon size="sm" />
            <span className="font-bold">100</span>
          </div>
        </div>

        <h2 className="mb-2 text-xl font-bold">{t("shareYourReferralLink")}</h2>
        <p className="mb-2 text-sm">{t("copyYourLink")}</p>

        <div className="mb-6 flex justify-between gap-2">
          <Input
            value={referralLink}
            readOnly
            className="flex-1 text-blue-500 @md:max-w-1/2"
          />
          <Button onClick={handleCopyLink} className="whitespace-nowrap">
            {copied ? t("copied") : t("copyLink")}
          </Button>
        </div>

        <div className="mb-6 flex flex-col items-center gap-2 @lg:flex-row">
          <p className="text-sm">{t("shareYourLinkOn")}</p>
          <div className="flex gap-2">
            <TwitterShareButton url={referralLink} title={t("checkOutVeoRent")}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black text-white hover:bg-gray-800"
              >
                <Twitter className="h-4 w-4" />
              </Button>
            </TwitterShareButton>
            <FacebookShareButton url={referralLink}>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
              >
                <Facebook className="h-4 w-4" />
              </Button>
            </FacebookShareButton>
            <LinkedinShareButton
              url={referralLink}
              title={t("veoRent")}
              summary={t("yourGoToRentalSolution")}
              source={t("veoRent")}
            >
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-blue-700 text-white hover:bg-blue-800"
              >
                <Linkedin className="h-4 w-4" />
              </Button>
            </LinkedinShareButton>
          </div>
        </div>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-gray-200"></div>
          <span className="px-3 text-sm text-gray-500">{t("or")}</span>
          <div className="h-px flex-1 bg-gray-200"></div>
        </div>

        <InviteByEmail />
      </div>
    </div>
  );
}
