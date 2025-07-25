import { useTranslation } from "react-i18next";

import { PageTitle } from "@/components/PageTitle";

import { SignatureCard } from "./components/SignCard";

const signatureDocuments = [
  {
    title: "Enclosed Garage Addendum",
    signer: "Kaiya Lipshutz",
    role: "Lessee",
  },
  {
    title: "Pet Policy Agreement",
    signer: "Jordan Smith",
    role: "Tenant",
  },
  {
    title: "Lease Termination Notice",
    signer: "Emily Johnson",
    role: "Occupant",
  },
];

function SignDocuments() {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <PageTitle title={t("documents")} />
      <div className="space-y-4">
        {signatureDocuments.map((doc) => (
          <SignatureCard
            title={doc.title}
            signer={doc.signer}
            role={doc.role}
          />
        ))}
      </div>
    </div>
  );
}

export default SignDocuments;
