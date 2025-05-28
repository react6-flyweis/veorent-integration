import { PageTitle } from "@/components/PageTitle";
import { BookMyMoveForm } from "./components/BookMoveForm";
import { useNavigate } from "react-router";

export default function BookMyMove() {
  const navigate = useNavigate();
  return (
    <div className="space-y-5">
      <PageTitle title="Book My Move" withBack />
      <BookMyMoveForm onNext={() => navigate("/tenant/move-in-process")} />
    </div>
  );
}
