import "../../../static/styles/mainlayout/styles.css";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="dashboard">{children}</div>
      <Footer />
      <ToastContainer />
    </div>
  );
}
