import { BackButton } from "@/components/BackButton";
import { useNavigate } from "react-router";
import { AmenitiesForm } from "./components/AmenitiesForm";

export default function EditPropertyAmenities() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <h3 className="text-primary mb-3 text-xl">123 Main St.</h3>
      <AmenitiesForm
        onSuccess={() => navigate("/landlord/properties/1/edit")}
      />
    </div>
  );
}
