import { BackButton } from "@/components/BackButton";
import { useNavigate } from "react-router";
import { LeasingBasicsForm } from "./components/LeasingBasicsForm";

export default function EditPropertyBasics() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="border-primary mb-5 border-b-6 pb-3">
        <BackButton />
      </div>
      <h3 className="text-primary mb-3 text-xl">123 Main St.</h3>
      <LeasingBasicsForm
        onSuccess={() => navigate("/landlord/properties/1/edit")}
      />
    </div>
  );
}
