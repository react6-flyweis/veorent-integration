import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      {/* Header and Search */}
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Hello, Kaiya</h1>
        <div className="relative w-full max-w-sm">
          <Input placeholder="Search property" className="pr-10" />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
        </div>
      </header>

      {/* User Card + Rental Application */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Info Card */}
        <Card>
          <CardHeader className="flex flex-row items-center space-x-4">
            <img
              src="/user.jpg"
              alt="Kaiya"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <CardTitle className="text-base">Kaiya Lipshutz</CardTitle>
              <CardDescription>123 Main St. CA 70000</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col">
            <div className="mb-2 text-sm font-medium">Account Balance</div>
            <div className="text-xl font-bold mb-4">£100.00</div>
            <div className="flex gap-2">
              <Button className="flex-1">Make Payment</Button>
              <Button variant="outline" className="flex-1">
                Autopay
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Rental Application Card */}
        <Card className="flex flex-col items-center justify-center text-center p-6">
          <img
            src="/application-icon.png"
            alt="App"
            className="w-12 h-12 mb-4"
          />
          <CardTitle className="text-base">
            Finish the Rental Application
          </CardTitle>
          <CardDescription className="mb-4">
            Lorem Ipsum is simply dummy text
          </CardDescription>
          <Button className="w-full">Finish Application</Button>
        </Card>
      </div>

      {/* Landlord Card */}
      <Card>
        <CardHeader className="flex items-center space-x-4">
          <img
            src="/landlord.jpg"
            alt="Landlord"
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <CardDescription className="uppercase text-xs font-bold">
              Landlord
            </CardDescription>
            <CardTitle className="text-base">Donna VanAntwerp</CardTitle>
            <CardDescription>123 Main St.</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 mt-2">
            <Button variant="outline">Email</Button>
            <Button variant="outline">Call</Button>
            <Button variant="outline">Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
