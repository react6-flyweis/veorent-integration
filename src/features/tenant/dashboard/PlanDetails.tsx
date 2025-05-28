import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BackButton } from "@/components/BackButton";
import { useNavigate, useLocation } from "react-router-dom";
import { CurrencyIcon } from "@/components/CurrencyIcon";

export default function PlanDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const plan = location.state?.plan;

  if (!plan) {
    return <div>Plan information not found</div>;
  }

  const handleProceedToBuy = () => {
    // You can add logic here to handle the purchase flow
    navigate("/tenant/payment/success", {
      state: {
        type: "insurance",
        details: plan,
      },
    });
  };

  return (
    <div>
      <BackButton />

      <Card className="my-6 flex-col justify-between pb-6 md:flex-row">
        <CardContent className="flex w-full justify-between">
          <div className="mb-4 flex items-center gap-4 md:mb-0">
            <div className="relative h-[50px] min-w-[100px]">
              <img
                src={plan.logo}
                alt={`${plan.name} logo`}
                className="object-contain"
              />
            </div>

            <div>
              <h3 className="text-xl font-bold">Plan Details</h3>
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm text-gray-500">Cover</span>
                <span className="text-lg font-medium">{plan.coverAmount}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex flex-col">
              <span className="text-sm">{plan.name}</span>
              <div className="flex items-center gap-2">
                <CurrencyIcon size="sm" />
                <span className="font-medium">{plan.price}/month</span>
              </div>
              <span className="text-sm">889 paid annually</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum
        asperiores molestias voluptatibus sunt quibusdam accusamus deleniti
        alias nobis nemo animi!
      </p>

      <Card className="mb-4 py-3">
        <CardContent>
          <h4 className="text-lg font-semibold">What's covered?</h4>
        </CardContent>
      </Card>

      <Card className="mb-4 py-3">
        <CardContent>
          <ul className="list-disc">
            {new Array(7)
              .fill(
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              )
              .map((detail) => (
                <li>{detail}</li>
              ))}
          </ul>
        </CardContent>
      </Card>

      <p className="mb-6 text-sm text-gray-500">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s.
      </p>

      <div className="mt-6 flex items-center justify-center">
        <Button
          size="lg"
          className="w-4/5 @lg:w-3/5"
          onClick={handleProceedToBuy}
        >
          Proceed to buy
        </Button>
      </div>
    </div>
  );
}
