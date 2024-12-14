import { BrowserRouter } from "react-router-dom";
import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Router from "./Router";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

{
  /* <UserRouter/> */
}
function App() {
  return (
    <div style={{ overflow: "auto" }}>
      <BrowserRouter>
        <Navbar />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
