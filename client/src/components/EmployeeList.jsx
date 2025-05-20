// EmployeeList.jsx
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("employee");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

  const fetchEmployees = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/employees`);
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
      const res = await fetch(`${BASE_URL}/api/admin/employees`,{
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, password, phone, address, role }),
      });
      
      const data = await res.json();

      if (res.ok) {
        toast.success(`✅ Employee ${data.name} added successfully`);
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setAddress("");
        setRole("employee");
        fetchEmployees();  // Refresh the employee list
      } else {
        toast.error(`❌ ${data.error}`);
      }
    } catch(err) {
        toast.error(`❌ Error: ${err.message}`);
    };
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      const res = await fetch(`${BASE_URL}/api/admin/employees/${id}`, { method: 'DELETE' });
      const data = await res.json();
      console.log("data is: ",data);

      if (res.ok) {
        toast.success(`✅ Employee ${name} deleted successfully`);
        fetchEmployees();  // Refresh the employee list
      } else {
        toast.error(`❌ ${data.error}`);
      }
    } catch(err) {
      toast.error(`❌ Error deleting employee`);
    };
  }

  const handleEditClick = (emp) => {
    setEditingId(emp.id);
    setEditForm({ ...emp, password: '' });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/admin/employees/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editForm),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`✅ ${data.employee.name} updated`);
        setEditingId(null);
        fetchEmployees();
      } else {
        toast.error(`❌ ${data.error}`);
      }
    } catch (err) {
      toast.error('❌ Update failed');
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
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
            <li key={emp.id}>
              {editingId === emp.id ? (
                <form className="employee-form full-width" onSubmit={(e) => { e.preventDefault(); handleEditSave(emp.id); }}>
                  <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Name" required />
                  <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" required />
                  <input name="phone" value={editForm.phone || ''} onChange={handleEditChange} placeholder="Phone" />
                  <input name="address" value={editForm.address || ''} onChange={handleEditChange} placeholder="Address" />
                  <select name="role" value={editForm.role} onChange={handleEditChange} required>
                    <option value="employee">Employee</option>
                    <option value="admin">Admin</option>
                  </select>
                  <input name="password" value={editForm.password} onChange={handleEditChange} placeholder="New Password (optional)" />
                  <button type="submit">Save</button>
                  <button type="button" onClick={handleCancelEdit}>Cancel</button>
                </form>
              ) : (
                <>
                  <span>{emp.name} ({emp.email})</span>
                  <div>
                    <button onClick={() => handleEditClick(emp)} className="icon-btn">
                      <EditOutlinedIcon fontSize="small" />
                    </button>
                    <button onClick={() => handleDelete(emp.id, emp.name)} className="icon-btn">
                      <DeleteForeverOutlinedIcon fontSize="small" />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <li>No Employees found.</li>
        )}
      </ul>
    </div>
  );
};

export default EmployeeList;