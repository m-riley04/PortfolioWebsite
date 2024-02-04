import AnimatedRoutes from "./components/AnimatedRoutes";
import {
  BrowserRouter as Router,
} from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

/** The main app component for the website */
function App() {
  return (
    <div id="app">
        <Router>
          <ScrollToTop/>
          <AnimatedRoutes/>
        </Router>
    </div>
  );
}

export default App
