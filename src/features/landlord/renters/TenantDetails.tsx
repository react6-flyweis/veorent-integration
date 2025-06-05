import { ArrowLeft, Calendar, Users2Icon } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

import penApplicationIcon from "./assets/pen-application.png";
import policyIcon from "./assets/policy.png";
import infoIcon from "./assets/info.png";
import { useGetTenantDetailsQuery } from "./api/queries";
import { useMemo } from "react";
import { CurrencyIcon } from "@/components/CurrencyIcon";
import { formatDate } from "@/utils/formatDate";

// Mock data - in a real app, this would come from an API or store
// const mockTenantData = [
//   {
//     id: "prop-123",
//     name: "William Thorne",
//     address: "123 Main St.",
//     unit: "Unit 1",
//     startDate: "Jan 1, 2023",
//     endDate: "Dec 31, 2023",
//     coTenants: ["Jane Smith"],
//     rent: 1500.0,
//     insuranceStatus: "verified",
//   },
//   {
//     id: "prop-456",
//     name: "Alicia Sandoval",
//     address: "123 Main St.",
//     unit: "Unit 2",
//     startDate: "Feb 15, 2023",
//     endDate: "Feb 14, 2024",
//     rent: 1350.0,
//     insuranceStatus: "waiting",
//   },
// ];

const insuranceStatusMap = {
  verified: {
    text: "Verified",
    color: "text-green-600",
  },
  waiting: {
    text: "Waiting on Proof",
    color: "text-orange-600",
  },
  none: {
    text: "No Insurance",
    color: "text-red-600",
  },
};

export function TenantDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: tenant, isLoading } = useGetTenantDetailsQuery(id || "");
  console.log("tenant", tenant);

  const insuranceStatus: keyof typeof insuranceStatusMap = useMemo(() => {
    // randomly select insurance status for demo
    return Math.random() > 0.5 ? "verified" : "waiting";
  }, []);

  // const formatCurrency = (amount: number) => {
  //   return amount.toLocaleString("en-US", {
  //     style: "decimal",
  //     minimumFractionDigits: 2,
  //     maximumFractionDigits: 2,
  //   });
  // };

  if (!id) {
    return <Navigate to="/landlord/renters/tenants" replace />;
  }

  if (isLoading || !tenant) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/landlord/renters/tenants" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold">{tenant.fullName}</h1>
          <span className="ml-3 text-gray-500">
            ({tenant.propertyDetails?.unitNumber})
          </span>
        </div>
      </div>

      <Card>
        <CardContent>
          <div className="mb-4 flex items-center gap-5">
            <div className="flex size-10 items-center justify-center rounded-full border bg-white shadow-sm">
              <img
                src={penApplicationIcon}
                alt="Upcoming Lease"
                className="h-6 w-6"
              />
            </div>
            <h2 className="text-lg font-semibold uppercase">UPCOMING LEASE</h2>
          </div>

          <div className="mb-3">
            <span className="text-primary font-semibold">
              {tenant.propertyDetails?.streetAddress}
            </span>
            <p className="text-sm text-gray-600">
              {tenant.propertyDetails?.streetAddress},{" "}
              {tenant.propertyDetails?.unitNumber}
            </p>
          </div>

          <div className="mb-2 flex items-center gap-1 text-gray-600">
            <Calendar className="mr-1 h-4 w-4" />
            <span>
              {formatDate(tenant.leaseTerm?.startDate)} -{" "}
              {formatDate(tenant.leaseTerm?.endDate || "")}
            </span>
          </div>

          <div className="mb-2 flex items-center gap-1 text-gray-600">
            <Users2Icon className="mr-1 h-4 w-4" />
            {/* {tenant.coTenants && tenant.coTenants.length > 0 ? (
              <span>
                {tenant.fullName}, {tenant.coTenants.join(", ")}
              </span>
            ) : (
              <span>{tenant.fullName}</span>
            )} */}
            <span>{tenant.fullName}</span>
          </div>

          <div className="mb-4 flex items-center gap-1 text-gray-600">
            <CurrencyIcon size="sm" />
            <span>
              {/* {formatCurrency(tenant.rent)} */}
              0.00
            </span>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Renters Insurance:</span>
                <span
                  className={`font-medium ${insuranceStatusMap[insuranceStatus].color}`}
                >
                  {insuranceStatusMap[insuranceStatus].text}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {insuranceStatus === "verified"
                  ? "The tenant has provided valid proof of renter's insurance coverage."
                  : "The tenant still needs to provide valid proof of renter's insurance."}
              </p>
            </div>
          </div>

          {insuranceStatus === "verified" && (
            <div className="mt-5">
              <div className="flex items-center gap-4">
                <div className="flex size-8 items-center justify-center rounded-full bg-gray-100">
                  <img
                    src={policyIcon}
                    alt="Insurance Policy"
                    className="h-5 w-5"
                  />
                </div>
                <div>
                  <h3 className="font-medium">Insurance Policy</h3>
                  <p className="text-sm text-gray-500">
                    TERM: {formatDate(tenant.leaseTerm?.startDate)} -{" "}
                    {formatDate(tenant.leaseTerm?.endDate || "") || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {insuranceStatus === "verified" && (
        <Card className="mt-6">
          <CardContent className="">
            <div className="mb-4 flex items-center gap-5">
              <div className="flex size-10 items-center justify-center rounded-full border bg-white shadow-sm">
                <img src={infoIcon} alt="Tenant Info" className="h-6 w-6" />
              </div>
              <h2 className="text-lg font-semibold uppercase">TENANT INFO</h2>
            </div>

            <div>
              <h3 className="mb-1 font-medium">Payment Method</h3>
              <p className="text-sm text-gray-500">
                "Bank account added on 01/15/2023"
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default TenantDetails;
