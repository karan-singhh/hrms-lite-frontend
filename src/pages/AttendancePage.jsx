import { useEffect, useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";

const API = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function AttendancePage() {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("Present");
    const [records, setRecords] = useState([]);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState("");

    const [loadingEmployees, setLoadingEmployees] = useState(true);
    const [loadingRecords, setLoadingRecords] = useState(false);

    // Load employees
    useEffect(() => {
        fetch(`${API}/employees`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(setEmployees)
            .catch(() => setError("Failed to load employees"))
            .finally(() => setLoadingEmployees(false));
    }, []);

    const fetchAttendance = async (empId) => {
        setLoadingRecords(true);
        try {
            const res = await fetch(`${API}/attendance/${empId}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setRecords(data);
        } catch {
            setError("Failed to load attendance");
        } finally {
            setLoadingRecords(false);
        }
    };

    const fetchSummary = async (empId) => {
        if (!empId) return;

        try {
            const res = await fetch(`${API}/attendance/summary/${empId}`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setSummary(data);
        } catch {
            setSummary(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch(`${API}/attendance`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                employee_id: selectedEmployee,
                date,
                status
            }),
        });

        if (!res.ok) {
            const err = await res.json();
            setError(err.detail || "Failed to mark attendance");
            return;
        }

        // refresh both
        fetchAttendance(selectedEmployee);
        fetchSummary(selectedEmployee);
    };

    return (
        <div>
            <h2>Attendance Management</h2>

            <Card>
                {loadingEmployees ? (
                    <p>Loading employees...</p>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <select
                            required
                            value={selectedEmployee}
                            onChange={(e) => {
                                const id = e.target.value;
                                setSelectedEmployee(id);
                                fetchAttendance(id);
                                fetchSummary(id);
                            }}
                        >
                            <option value="">Select Employee</option>
                            {employees.map(emp => (
                                <option key={emp.employee_id} value={emp.employee_id}>
                                    {emp.name} ({emp.employee_id})
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            required
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                        </select>

                        <Button type="submit">Mark Attendance</Button>
                    </form>
                )}

                {error && <p style={{ color: "red" }}>{error}</p>}

                {summary && (
                    <div style={{ marginTop: "20px" }}>
                        <h4>Attendance Summary</h4>
                        <p><strong>Present Days:</strong> {summary.present_days}</p>
                        <p><strong>Absent Days:</strong> {summary.absent_days}</p>
                        <p><strong>Total Days:</strong> {summary.total_days}</p>
                    </div>
                )}
            </Card>

            {selectedEmployee && (
                <Card>
                    {loadingRecords && <p>Loading attendance...</p>}

                    {!loadingRecords && records.length === 0 && (
                        <p>No attendance records found.</p>
                    )}

                    {!loadingRecords && records.length > 0 && (
                        <table>
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {records.map((r, i) => (
                                    <tr key={i}>
                                        <td>{r.date}</td>
                                        <td>{r.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </Card>
            )}
        </div>
    );
}

export default AttendancePage;