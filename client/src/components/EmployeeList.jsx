// EmployeeList.jsx
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import "../../public/styles/EmployeeList.css";

function EmployeeList() {
  const [ employees, setEmployees ] = useState([]);
  const [ name, setName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");


  const fetchEmployees = async () => {
    try {
      const res = await fetch('/api/admin/employees');
      const data = await res.json();
      setEmployees(data);
    } catch(err) {
      toast.error('Error fetching employees: ');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async(e) => {
    e.preventDefault();
   
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      const res = await fetch('/api/admin/employees',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({name, email, password}),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ Employee ${data.name} added successfully`);
        setName("");
        setEmail("");
        setPassword("");
        fetchEmployees();  // Refresh the employee list
      } else {
        toast.error(`❌ ${data.error}`);
      }
    } catch(err) {
        toast.error(`❌ Error: ${err.message}`);
    };
  };

  return (
    <div className="employee-list-container">
      <h4>Add a New Employee</h4>
      <form onSubmit={handleAddEmployee} className="employee-form">
        <div className="form-group">
          <input 
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input 
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
        </div>
      
        <div className="form-group">
          <input 
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Add Employee</button>
      </form>

      <h4>List of employees</h4>
      <ul>
        {employees.length > 0 ? (
          employees.map(emp => (
            <li key={emp.id}>{emp.email}</li>
          ))
        ) : (
          <li>No Employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;