import NavigationBar from "./components/NavigationBar";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import {
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <div id="app">
      <Router>
        <NavigationBar/>
        <AnimatedRoutes/>
        <Footer/>
      </Router>
    </div>
  );
}

export default App
