import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome  from "./components/Welcome";
import Login    from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<Welcome />}  />
        <Route path="/login"     element={<Login />}    />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/footer" element={<Footer />} />
        {/* próxima ruta */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;