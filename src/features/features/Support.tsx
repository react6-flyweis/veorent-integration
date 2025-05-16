import { PageTitle } from "@/components/PageTitle";
import ContactForm from "./components/ContactForm";
import supportImg from "@/assets/images/support.jpg";

export default function Support() {
  return (
    <div className="space-y-5">
      <PageTitle title="Support" withBack />
      <img
        src={supportImg}
        className="h-52 w-full object-cover rounded"
        alt=""
      />
      <h2 className="text-xl font-bold text-primary">
        In Veorent we are here for 24x7
      </h2>
      <ContactForm />
    </div>
  );
}
