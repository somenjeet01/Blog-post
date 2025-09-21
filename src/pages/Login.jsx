import React from "react";
import { Login as LoginComponent } from "../components";
import { Container } from "../components";

function Login() {
  return (
    <div className="min-h-[60vh] py-2 flex items-center justify-center bg-gradient-to-bl from-blue-100 via-blue to-blue-100">
      <Container>
        <LoginComponent />
      </Container>
    </div>
  );
}

export default Login;
