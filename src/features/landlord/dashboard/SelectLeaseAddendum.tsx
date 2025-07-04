import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";

import {
  MultiStepper,
  MultiStepperBackButton,
  MultiStepperStep,
  type MultiStepperRef,
} from "@/components/MultiStepper";
import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import balanceIcon from "./assets/balance.png";
import fingerSnapIcon from "./assets/finger-snap.png";
import smoothPenIcon from "./assets/smooth-pen.png";
import { PropertiesSelector } from "./components/PropertiesSelector";

export default function SelectLeaseAddendum() {
  const { t } = useTranslation();

  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const stepperRef = useRef<MultiStepperRef>(null);
  const handleContinue = () => {
    if (stepperRef.current) {
      stepperRef.current.goNext();
    }
  };

  return (
    <MultiStepper ref={stepperRef}>
      <MultiStepperStep>
        <div className="flex flex-col">
          <PageTitle title={t("selectLeaseAddendum.title")} withBack />

          <div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                {t("selectLeaseAddendum.leaseLabel")}
              </label>
              <PropertiesSelector
                value={selectedAddress}
                onChange={setSelectedAddress}
                placeholder={t("selectLeaseAddendum.leasePlaceholder")}
              />
            </div>
            <div className="flex justify-center">
              <Button
                className="w-3/5"
                size="lg"
                disabled={!selectedAddress}
                onClick={handleContinue}
              >
                {t("continue")}
              </Button>
            </div>
          </div>
        </div>
      </MultiStepperStep>
      <MultiStepperStep>
        <div className="flex flex-col">
          <div className="mb-2 flex items-center gap-5">
            <MultiStepperBackButton />
            <h2 className="text-2xl font-semibold">
              {t("selectLeaseAddendum.selectAddendum")}
            </h2>
          </div>
          <p className="font-semibold">{t("selectLeaseAddendum.intro")}</p>
          <div className="mt-6 flex flex-col space-y-6">
            <Card className="gap-0 rounded-lg bg-blue-200 py-2">
              <CardHeader>
                <CardTitle className="text-lg font-bold">
                  {t("selectLeaseAddendum.commonReasonsTitle")}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col justify-center">
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item} className="flex items-center">
                      <div className="mt-1 mr-2 h-4 w-4 rounded-sm bg-orange-400"></div>
                      <p className="text-sm">
                        {t(`selectLeaseAddendum.commonReason${item}`)}
                      </p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <div className="space-y-2">
              <h3 className="text-xl font-bold">
                {t("selectLeaseAddendum.whyUseTitle")}
              </h3>

              <div className="space-y-6">
                {[
                  {
                    icon: fingerSnapIcon,
                    title: t("selectLeaseAddendum.easyToFill"),
                    description: t("selectLeaseAddendum.easyToFillDesc"),
                  },
                  {
                    icon: balanceIcon,
                    title: t("selectLeaseAddendum.legalConfidence"),
                    description: t("selectLeaseAddendum.legalConfidenceDesc"),
                  },
                  {
                    icon: smoothPenIcon,
                    title: t("selectLeaseAddendum.fastToSign"),
                    description: t("selectLeaseAddendum.fastToSignDesc"),
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="mr-4 max-h-12 max-w-12 flex-shrink-0"
                    />
                    <div>
                      <h4 className="text-xl font-semibold">{item.title}</h4>
                      <p className="text-primary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <Button className="w-3/5" size="lg" asChild>
                <Link
                  state={{ property: selectedAddress }}
                  to="/landlord/lease-addendum/create"
                >
                  {t("selectLeaseAddendum.soundsGood")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </MultiStepperStep>
    </MultiStepper>
  );
}
