import { useState } from "react";
import { Button } from "@/components/ui/button";
import { IconRound } from "@/components/IconRound";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

// You may want to replace this with an actual phone icon
import infoIcon from "@/assets/icons/info.png";

interface PhoneVerificationFormProps {
  onSuccess: () => void;
  onSkip?: () => void;
  address?: string;
}

export const PhoneVerificationForm = ({
  onSuccess,
  onSkip,
  address = "123 Main St.",
}: PhoneVerificationFormProps) => {
  const [phone, setPhone] = useState("");
  const [verificationMethod, setVerificationMethod] = useState("text");
  const [isSending, setIsSending] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // 6-digit OTP

  const handleSendCode = async () => {
    if (!phone.trim()) return;

    setIsSending(true);
    try {
      // Simulate API call to send code
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setOtpSent(true);
    } finally {
      setIsSending(false);
    }
  };

  const handleVerify = async () => {
    if (otp.some((digit) => !digit.trim())) return;

    setIsSending(true);
    try {
      // Simulate API call to verify OTP
      await new Promise((resolve) => setTimeout(resolve, 1000));
      onSuccess();
    } finally {
      setIsSending(false);
    }
  };

  const handleSkip = async () => {
    setIsSkipping(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      if (onSkip) onSkip();
      else onSuccess();
    } finally {
      setIsSkipping(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.slice(0, 1);
    }

    // Only allow numbers
    if (value && !/^[0-9]$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && index > 0 && !otp[index]) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center">
        <IconRound icon={infoIcon} size="sm" />
        <h2 className="ml-2 text-xl font-semibold">
          Verify Your Phone to Publish the Listing
        </h2>
      </div>

      <div>
        <p className="text-muted-foreground mb-6">{address}</p>
        <p className="text-muted-foreground mb-6 text-sm">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        {!otpSent ? (
          <>
            <div className="mb-6">
              <h3 className="mb-4 text-base font-medium">
                How would you like to receive the verification code?
              </h3>
              <RadioGroup
                defaultValue={verificationMethod}
                onValueChange={setVerificationMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="text" id="text-option" />
                  <Label htmlFor="text-option" className="font-normal">
                    Send a text message
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="call" id="call-option" />
                  <Label htmlFor="call-option" className="font-normal">
                    Call my phone
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="mb-6">
              <Label
                htmlFor="phone"
                className="mb-2 block text-base font-medium"
              >
                Phone
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(123) 456-7890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleSkip}
                disabled={isSending || isSkipping}
              >
                Skip Marketing For Now
              </Button>
              <Button
                className="flex-1"
                onClick={handleSendCode}
                disabled={!phone.trim() || isSending || isSkipping}
              >
                Send Code
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="mb-4 text-base font-medium">Enter OTP</h3>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-input-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="h-12 w-12 text-center text-lg"
                  />
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={handleSkip}
                disabled={isSending || isSkipping}
              >
                Skip Marketing For Now
              </Button>
              <Button
                className="flex-1"
                onClick={handleVerify}
                disabled={
                  otp.some((digit) => !digit.trim()) || isSending || isSkipping
                }
              >
                Please Verify
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
