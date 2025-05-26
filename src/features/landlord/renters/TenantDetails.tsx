import { ArrowLeft, Calendar, Users2, CircleDollarSign } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";

import penApplicationIcon from "./assets/pen-application.png";
import policyIcon from "./assets/policy.png";
import infoIcon from "./assets/info.png";

// Mock data - in a real app, this would come from an API or store
const mockTenantData = [
  {
    id: "prop-123",
    name: "William Thorne",
    address: "123 Main St.",
    unit: "Unit 1",
    startDate: "Jan 1, 2023",
    endDate: "Dec 31, 2023",
    coTenants: ["Jane Smith"],
    rent: 1500.0,
    insuranceStatus: "verified",
  },
  {
    id: "prop-456",
    name: "Alicia Sandoval",
    address: "123 Main St.",
    unit: "Unit 2",
    startDate: "Feb 15, 2023",
    endDate: "Feb 14, 2024",
    rent: 1350.0,
    insuranceStatus: "waiting",
  },
];

export function TenantDetails() {
  const { id } = useParams<{ id: string }>();
  const [tenant, setTenant] = useState(mockTenantData[0]);

  useEffect(() => {
    const fetchedTenant = mockTenantData.find(
      (t) => t.name.replace(/\s+/g, "-") === id,
    );
    if (fetchedTenant) {
      setTenant(fetchedTenant);
    }
  }, [id]);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const getInsuranceStatusText = () => {
    switch (tenant.insuranceStatus) {
      case "verified":
        return "Verified";
      case "waiting":
        return "Waiting on Proof";
      default:
        return "No Insurance";
    }
  };

  const getInsuranceStatusColor = () => {
    switch (tenant.insuranceStatus) {
      case "verified":
        return "text-green-600";
      case "waiting":
        return "text-orange-600";
      default:
        return "text-red-600";
    }
  };

  return (
    <div className="">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/landlord/renters/tenants" className="mr-4">
            <ArrowLeft className="h-5 w-5 text-gray-700" />
          </Link>
          <h1 className="text-2xl font-bold">{tenant.name}</h1>
          <span className="ml-3 text-gray-500">({tenant.unit})</span>
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
            <Link
              to={`/landlord/properties/${tenant.id}`}
              className="text-primary font-semibold"
            >
              {tenant.address}
            </Link>
            <p className="text-sm text-gray-600">
              {tenant.address}, {tenant.unit}
            </p>
          </div>

          <div className="mb-2 flex items-center gap-1 text-gray-600">
            <Calendar className="mr-1 h-4 w-4" />
            {tenant.startDate && tenant.endDate ? (
              <span>{`${tenant.startDate} - ${tenant.endDate}`}</span>
            ) : (
              <span>undefined - undefined</span>
            )}
          </div>

          <div className="mb-2 flex items-center gap-1 text-gray-600">
            <Users2 className="mr-1 h-4 w-4" />
            {tenant.coTenants && tenant.coTenants.length > 0 ? (
              <span>
                {tenant.name}, {tenant.coTenants.join(", ")}
              </span>
            ) : (
              <span>{tenant.name}</span>
            )}
          </div>

          <div className="mb-4 flex items-center gap-1 text-gray-600">
            <CircleDollarSign className="mr-1 h-4 w-4" />
            <span>${formatCurrency(tenant.rent)}</span>
          </div>

          <div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Renters Insurance:</span>
                <span className={getInsuranceStatusColor()}>
                  {getInsuranceStatusText()}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                {tenant.insuranceStatus === "verified"
                  ? "The tenant has provided valid proof of renter's insurance coverage."
                  : "The tenant still needs to provide valid proof of renter's insurance."}
              </p>
            </div>
          </div>

          {tenant.insuranceStatus === "verified" && (
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
                    TERM: {tenant.startDate} - {tenant.endDate}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {tenant.insuranceStatus === "verified" && (
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
