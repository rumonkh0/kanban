import React from "react";
import { FormField, Input, RedButton } from "../../components/Component";

function ForgotPassword() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Forgot Password</h4>
      </div>
      <div className="flex flex-col gap-2">
        <FormField label="OTP" required>
          <Input type="text" placeholder="Enter otp" />
        </FormField>
      </div>
      <RedButton className="typo-cta py-3">Resend</RedButton>
    </>
  );
}

export default ForgotPassword;
