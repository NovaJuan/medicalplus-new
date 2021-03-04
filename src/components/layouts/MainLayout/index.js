import "../../../static/styles/mainlayout/styles.css";
import Navbar from "../../shared/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="app-container">
      <Navbar />
      <div className="dashboard">{children}</div>
    </div>
  );
}
