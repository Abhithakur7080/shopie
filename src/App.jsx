import "./App.css";
import Rout from "./routes/Rout";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


const App = () => {
  return (
    <>
    {/* layout of the app */}
      <Navbar />
      <Rout />
      <Footer />
    </>
  );
};

export default App;
