import React from "react";
import { FormField, Input, RedButton } from "../../components/Component";

function ForgotPassword() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h4 className="typo-h4">Forgot Password</h4>
      </div>
      <div className="flex flex-col gap-2">
        <FormField label="Email" required>
          <Input type="email" placeholder="Enter Email" />
        </FormField>
      </div>
      <RedButton className="typo-cta py-3">Submit</RedButton>
    </>
  );
}

export default ForgotPassword;
