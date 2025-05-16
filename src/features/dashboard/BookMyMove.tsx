import { PageTitle } from "@/components/PageTitle";
import { BookMyMoveForm } from "./components/BookMoveForm";

export default function BookMyMove() {
  return (
    <div className="space-y-5">
      <PageTitle title="Book My Move" withBack />
      <BookMyMoveForm />
    </div>
  );
}
