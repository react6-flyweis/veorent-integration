import { BackButton } from "@/components/BackButton";
import { PropertySizeForm } from "./components/PropertySizeForm";
import { useNavigate } from "react-router";

export default function EditPropertySize() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <PropertySizeForm
        onSuccess={() => navigate("/landlord/properties/1/edit")}
      />
    </div>
  );
}
