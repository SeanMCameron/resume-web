import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar> </Navbar>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/resume-web/about" element={<About />} />
          <Route path="/resume-web/contact" element={<Contact />} />
          <Route path="/resume-web/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
