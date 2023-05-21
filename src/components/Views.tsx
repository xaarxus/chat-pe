import { Route, Routes } from "react-router-dom"
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Views = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="*" element={<SignIn />} />
    </Routes>
  );
}

export default Views;
