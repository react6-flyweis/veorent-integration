import { Button } from "@/components/ui/button";
import { useGoBack } from "@/hooks/useGoBack";
import checkAnimation from "./assets/check-celebrate.gif";

const ScreeningReportSoon = () => {
  const goBack = useGoBack();

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-white p-6">
      <div className="flex flex-col items-center text-center">
        <img src={checkAnimation} alt="Check Animation" className="size-28" />
        <h1 className="mb-6 text-3xl font-bold text-gray-800">
          The screening report will be available soon!
        </h1>
        <p className="mb-8 text-left text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
        </p>
        <Button size={"lg"} className="w-full py-3 md:w-3/5" onClick={goBack}>
          Sounds Good
        </Button>
      </div>
    </div>
  );
};

export default ScreeningReportSoon;
