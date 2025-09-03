import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MiniGames from "./pages/MiniGames";
import PixelClicker from "./pages/PixelClicker";
import PixelFlappy from "./pages/PixelFlappy";
import Pixel2048 from "./pages/Pixel2048";
import PixelBatyrRunner from "./pages/PixelBatyrRunner";
import PixelQazaqQuiz from "./pages/PixelQazaqQuiz.jsx";
import PixelQazaqChess from "./pages/PixelQazaqChess.jsx";
import Footer from "./components/Footer.jsx";
import History from "./pages/History.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Copyright from "./pages/Copyright.jsx";
import LoaderScreen from "./components/LoaderScreen.jsx";
import { ToastProvider } from "./components/ToastProvider.jsx";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [animateOut, setAnimateOut] = useState(false);

  useEffect(() => {
    // Auto hide after 5s
    const t = setTimeout(() => beginHide(), 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const beginHide = () => {
    setAnimateOut(true);
    // Wait for CSS animation end (700ms safety)
    setTimeout(() => setShowLoader(false), 700);
  };

  const skipHandler = () => beginHide();

  return (
    <Router>
      <ToastProvider>
        {showLoader && (
          <LoaderScreen onSkip={skipHandler} animateOut={animateOut} />
        )}
        {!showLoader && <Header />}
        {!showLoader && (
          <>
            <Routes>
              <Route path="/minigames/5" element={<PixelQazaqQuiz />} />
              <Route path="/minigames/chess" element={<PixelQazaqChess />} />
              <Route path="/history" element={<History />} />
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/minigames" element={<MiniGames />} />
              <Route path="/minigames/1" element={<PixelClicker />} />
              <Route path="/minigames/2" element={<PixelFlappy />} />
              <Route path="/minigames/3" element={<Pixel2048 />} />
              <Route path="/minigames/4" element={<PixelBatyrRunner />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/copyright" element={<Copyright />} />
            </Routes>
            <Footer />
          </>
        )}
      </ToastProvider>
    </Router>
  );
}

export default App;