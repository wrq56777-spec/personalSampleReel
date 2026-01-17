import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Page2 from "@/pages/Page2";
import Page3 from "@/pages/Page3";
import Page4 from "@/pages/Page4";
import Page5 from "@/pages/Page5";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navigation />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
          <Route path="/page4" element={<Page4 />} />
          <Route path="/page5" element={<Page5 />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
