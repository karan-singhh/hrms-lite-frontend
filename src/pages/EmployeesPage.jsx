import { useEffect, useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

// const API = "http://127.0.0.1:8000";
const API = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"


function EmployeesPage() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        employee_id: "",
        name: "",
        email: "",
        department: "",
    });


    const fetchEmployees = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`${API}/employees`);

            if (!res.ok) {
                throw new Error("Failed to load employees");
            }

            const data = await res.json();
            setEmployees(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle form input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Add employee
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await fetch(`${API}/employees`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || "Failed to add employee");
            }

            // Reset form
            setForm({
                employee_id: "",
                name: "",
                email: "",
                department: "",
            });

            fetchEmployees();
        } catch (err) {
            setError(err.message);
        }
    };

    // Delete employee
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}/employees/${id}`, {
                method: "DELETE",
            });

            if (!res.ok) {
                throw new Error("Failed to delete employee");
            }

            fetchEmployees();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Employee Management</h2>

            {/* Add Employee Form */}
            <Card>
                <form onSubmit={handleSubmit}>
                    <Input
                        name="employee_id"
                        placeholder="Employee ID"
                        value={form.employee_id}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        required
                    />
                    <Input
                        name="department"
                        placeholder="Department"
                        value={form.department}
                        onChange={handleChange}
                        required
                    />

                    <Button type="submit">Add Employee</Button>
                </form>
            </Card>

            {/* UI States */}
            {loading && <p>Loading employees...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && employees.length === 0 && <p>No employees yet.</p>}

            {/* Employee Table */}
            {!loading && employees.length > 0 && (
                <Card>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp) => (
                                <tr key={emp.employee_id}>
                                    <td>{emp.employee_id}</td>
                                    <td>{emp.name}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.department}</td>
                                    <td>
                                        <Button onClick={() => handleDelete(emp.employee_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Card>
            )}
        </div>
    );
}

export default EmployeesPage;