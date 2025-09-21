import React from "react";
import { Signup as SignupComponent } from "../components";
import { Container } from "../components";

function Signup() {
  return (
    <div className="min-h-[60vh] py-2 flex items-center justify-center bg-gradient-to-bl from-blue-50 via-white to-blue-50">
      <Container>
        <SignupComponent />
      </Container>
    </div>
  );
}

export default Signup;
