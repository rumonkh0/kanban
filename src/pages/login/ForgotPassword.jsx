import React, { useState } from "react";
import { FormField, Input, RedButton } from "../../components/Component";
import { useForgotPassword } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

function ForgotPassword() {
  const navigate = useNavigate();
  const forgotPasword = useForgotPassword();
  const [email, setEmail] = useState("");

  const handleForgotPassword = () => {
    forgotPasword.mutate(email, {
      onSuccess: () => {
        toast.success("Email Sent!");
        navigate("/otp", { state: { email } });
      },
      onError: (error) => {
        console.error("Failed to send password reset email:", error);
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Forgot Password</h4>
      </div>
      <div className="flex flex-col gap-2">
        <FormField label="Email" required>
          <Input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(v) => setEmail(v)}
          />
        </FormField>
      </div>
      <RedButton
        onClick={handleForgotPassword}
        className="typo-cta py-3"
        disabled={forgotPasword.isPending}
      >
        {forgotPasword.isPending ? "Sending Mail...." : "Send Mail"}
      </RedButton>
    </>
  );
}

export default ForgotPassword;
