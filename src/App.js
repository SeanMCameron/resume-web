import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Navbar> </Navbar>
        <Routes>
          <Route path="resume-web/" element={<Home />} />
          <Route path="resume-web/about" element={<About />} />
          <Route path="resume-web/contact" element={<Contact />} />
          <Route path="resume-web/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
