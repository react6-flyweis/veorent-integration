import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ArrowDownIcon, ArrowUp } from "lucide-react";

import { PageTitle } from "@/components/PageTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import formIcon from "./assets/form.png";
import AttachmentsSection from "./components/AttachmentsSection";
import IncomeEmploymentSection from "./components/IncomeEmploymentSection";
import OtherInformationSection from "./components/OtherInformationSection";
import OverViewSection from "./components/OverViewSection";
import PetsVehiclesEmergencySection from "./components/PetsVehiclesEmergencySection";
import ResidentialSection from "./components/ResidentialSection";
import SelfReportedBackgroundSection from "./components/SelfReportedBackgroundSection";

export default function Application() {
  const { t } = useTranslation();

  const applicationSections = [
    {
      id: "overview",
      title: t("overview"),
      content: <OverViewSection />,
    },
    {
      id: "residential-history",
      title: t("residentialHistory"),
      description: t("residentialHistoryDescription"),
      content: <ResidentialSection />,
    },
    {
      id: "income-employment",
      title: t("incomeEmployment"),
      description: t("incomeEmploymentDescription"),
      content: <IncomeEmploymentSection />,
    },
    {
      id: "pets-vehicles-emergency",
      title: t("petsVehiclesEmergency"),
      description: t("petsVehiclesEmergencyDescription"),
      content: <PetsVehiclesEmergencySection />,
    },
    {
      id: "self-reported-background",
      title: t("selfReportedBackground"),
      description: t("selfReportedBackgroundDescription"),
      content: <SelfReportedBackgroundSection />,
    },
    {
      id: "attachments",
      title: t("attachments"),
      description: t("attachmentsDescription"),
      content: <AttachmentsSection />,
    },
    {
      id: "other-information",
      title: t("otherInformation"),
      description: t("otherInformationDescription"),
      content: <OtherInformationSection />,
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => () => {
    const element = document.getElementById(sectionId);
    if (element) {
      // Calculate position to scroll to, considering a fixed header if any
      const offset = 100; // Adjust this offset as needed
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="">
      {/* Header */}
      <div className="mb-6 flex items-center">
        <PageTitle
          title="William Thorne"
          withBack
          className="mb-0 text-2xl font-bold md:text-3xl"
        />
        <Link
          to="#" // Replace with actual link if available
          className="text-primary ml-2 cursor-pointer text-sm font-medium hover:underline md:text-base"
        >
          (700 H St.)
        </Link>
      </div>

      {/* Sub-header: Rental Application Info */}
      <div className="mb-5 flex items-center gap-2">
        <div className="flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
          <img
            src={formIcon}
            alt="Rental Application"
            className="max-h-5 max-w-5"
          />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            {t("rentalApplication")}
          </h2>
          <p className="text-muted-foreground text-xs">
            {t("completedOn")} 08/19/2024
          </p>
        </div>
      </div>

      {/* Table of Contents */}
      <div className="mb-8 w-full rounded-lg bg-blue-200 p-2 shadow">
        {applicationSections.map((section, i) => (
          <Button
            variant="ghost"
            key={section.id}
            onClick={scrollToSection(section.id)}
            className={cn(
              "flex w-full items-center justify-between py-3 transition-colors hover:bg-blue-100",
              i !== applicationSections.length - 1 &&
                "border-b border-gray-400",
            )}
          >
            <span className="text-base font-medium">{section.title}</span>
            <ArrowDownIcon className="text-primary size-5" />
          </Button>
        ))}
      </div>

      {/* Content Sections */}
      <div className="space-y-6">
        {applicationSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className="scroll-mt-20 border-t-2 pt-6"
          >
            {/* Added scroll-mt-20 for offset */}
            <h2 className="mb-2 text-xl font-semibold text-gray-800">
              {section.title}
            </h2>
            {section.description && (
              <p className="mb-4 text-sm font-semibold text-gray-700">
                {section.description}
              </p>
            )}
            {/* Render content based on the section */}
            {section.content}
          </section>
        ))}
      </div>

      {/* Scroll to Top Button */}
      <Button
        size="icon"
        className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 text-white shadow-xl hover:bg-slate-700 focus:ring-2 focus:ring-slate-800 focus:ring-offset-2 focus:outline-none"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="size-6" />
      </Button>
    </div>
  );
}
