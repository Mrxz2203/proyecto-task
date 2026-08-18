import "./theme.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome  from "./components/Welcome";
import Login    from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";
import Section from "./components/Section";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"   element={<Welcome />}  />
         <Route path="/section"   element={<Section />}  />
        <Route path="/login"     element={<Login />}    />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;