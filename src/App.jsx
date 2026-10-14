import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Services from "./pages/services";
import Appointment from "./pages/appointments";


const App = () => {
  return (
    <div className="flex min-h-screen bg-[#F5F7FA]">
      <Navbar />
      <main className="min-w-0 flex-1">
        <Routes>
          <Route path="/services" element={<Services  />} />

          <Route path="/appointment" element={<Appointment />} />

          <Route path="*" element={<Navigate to="/services" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
