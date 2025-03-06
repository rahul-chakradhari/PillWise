import "./App.css";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
function App() {
  return (
    <div className="app">
      <Navbar />
      <Home />
      <About />
    </div>
  );
}

export default App;
