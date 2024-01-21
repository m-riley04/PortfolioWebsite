import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div id="app">
      <Router>
        <ScrollToTop/>
        <AnimatedRoutes/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App
