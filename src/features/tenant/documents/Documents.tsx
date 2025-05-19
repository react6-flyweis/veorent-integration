import { PageTitle } from "@/components/PageTitle";
import { DocumentCard } from "./components/DocumentCard";

const documents = [
  {
    date: "2/28/2024",
    description: "Bluemoon Lease Documents",
    fileName: "Attachment_htpk5478_BluemoonLeaseDocuments.pdf",
  },
  {
    date: "2/16/2024",
    description: "Renewal",
    fileName: "Attachment_htpk5478_BluemoonRenewalDocuments.pdf",
  },
  {
    date: "1/09/2024",
    description: "Bluemoon Addendum Documents",
    fileName: "Attachment_htpk5478_BluemoonAddendumDocuments.pdf",
  },
  {
    date: "1/08/2024",
    description: "Bluemoon Lease Documents",
    fileName: "Attachment_htpk5478_BluemoonLeaseDocuments.pdf",
  },
];

export default function Documents() {
  return (
    <div className="space-y-4">
      <PageTitle title="Documents" />
      <div className="space-y-4">
        {documents.map((doc) => (
          <DocumentCard
            name={doc.fileName}
            date={doc.date}
            description={doc.description}
          />
        ))}
      </div>
    </div>
  );
}
