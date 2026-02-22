import { useEffect, useState } from "react";
import Card from "../components/Card";

const API = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function Dashboard() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${API}/dashboard`)
            .then(res => {
                if (!res.ok) {
                    throw new Error("Failed to load dashboard data");
                }
                return res.json();
            })
            .then(setData)
            .catch(() => setError("Unable to connect to server"))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div>
            <h2>HRMS Dashboard</h2>

            <Card>
                {loading && <p>Loading dashboard...</p>}

                {error && <p style={{ color: "red" }}>{error}</p>}

                {!loading && !error && data.length === 0 && (
                    <p>No attendance data available.</p>
                )}

                {!loading && !error && data.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Department</th>
                                <th>Present Days</th>
                                <th>Absent Days</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(emp => (
                                <tr key={emp.employee_id}>
                                    <td>{emp.name}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.present_days}</td>
                                    <td>{emp.absent_days}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </Card>
        </div>
    );
}

export default Dashboard;