import { useState } from "react";
import EmployeesPage from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";
import Dashboard from "./pages/Dashboard";

function App() {
  const [page, setPage] = useState("employees");

  const navStyle = {
    background: "#1f2937",
    padding: "12px 20px",
    color: "white",
    display: "flex",
    gap: "12px",
    alignItems: "center",
  };

  const buttonStyle = {
    background: "#374151",
    color: "white",
    border: "none",
    padding: "8px 14px",
    cursor: "pointer",
    borderRadius: "4px",
  };

  return (
    <div>
      <div style={navStyle}>
        <button style={buttonStyle} onClick={() => setPage("employees")}>
          Employees
        </button>

        <button style={buttonStyle} onClick={() => setPage("attendance")}>
          Attendance
        </button>

        <button style={buttonStyle} onClick={() => setPage("dashboard")}>
          Dashboard
        </button>
      </div>

      <div className="container">
        {page === "dashboard" && <Dashboard />}
        {page === "employees" && <EmployeesPage />}
        {page === "attendance" && <AttendancePage />}
      </div>
    </div>
  );
}

export default App;