// EmployeeList.jsx
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import 'react-toastify/dist/ReactToastify.css';
// import "../styles/EmployeeList.css";

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
    <div className="space-y-8">
      {/* Add New Employee Section */}
      <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-600/50 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white">Add New Employee</h4>
        </div>
        
        <div className="space-y-4" onSubmit={handleAddEmployee}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-stone-300 mb-2">Name *</label>
              <input 
                type="text"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-stone-300 mb-2">Email *</label>
              <input 
                type="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-stone-300 mb-2">Password *</label>
              <input 
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
              />
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleAddEmployee}
              className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-500 hover:to-amber-500 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-yellow-500/20"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              <span>Add Employee</span>
            </button>
          </div>
        </div>
      </div>

      {/* Employee List Section */}
      <div className="bg-stone-900/50 backdrop-blur-sm border border-stone-600/50 rounded-xl p-6">
        <div className="flex items-center mb-6">
          <div className="w-8 h-8 bg-gradient-to-r from-yellow-600 to-amber-600 rounded-full flex items-center justify-center mr-3">
            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-white">Employee List</h4>
          <span className="ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-900/30 text-yellow-300 border border-yellow-700/30">
            {employees.length} {employees.length === 1 ? 'Employee' : 'Employees'}
          </span>
        </div>
        
        <div className="space-y-3">
          {employees.length > 0 ? (
            employees.map(emp => (
              <div key={emp.id} className="bg-stone-800/50 border border-stone-700/50 rounded-lg p-4 hover:border-yellow-400/30 transition-colors duration-200">
                {editingId === emp.id ? (
                  <div className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleEditSave(emp.id); }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">Name</label>
                        <input 
                          name="name" 
                          value={editForm.name} 
                          onChange={handleEditChange} 
                          placeholder="Name" 
                          required 
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">Email</label>
                        <input 
                          name="email" 
                          value={editForm.email} 
                          onChange={handleEditChange} 
                          placeholder="Email" 
                          required 
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">Phone</label>
                        <input 
                          name="phone" 
                          value={editForm.phone || ''} 
                          onChange={handleEditChange} 
                          placeholder="Phone" 
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">Address</label>
                        <input 
                          name="address" 
                          value={editForm.address || ''} 
                          onChange={handleEditChange} 
                          placeholder="Address" 
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">Role</label>
                        <select 
                          name="role" 
                          value={editForm.role} 
                          onChange={handleEditChange} 
                          required 
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        >
                          <option value="employee">Employee</option>
                          <option value="admin">Admin</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-stone-300 mb-1">New Password</label>
                        <input 
                          name="password" 
                          value={editForm.password} 
                          onChange={handleEditChange} 
                          placeholder="New Password (optional)" 
                          type="password"
                          className="w-full px-3 py-2 bg-stone-700/50 border border-stone-600/50 rounded-lg text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400/50 transition-all duration-200"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3 pt-4 border-t border-stone-600/30">
                      <button 
                        onClick={() => handleEditSave(emp.id)}
                        className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Save</span>
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="flex items-center space-x-2 px-4 py-2 bg-stone-600/50 hover:bg-stone-500/50 text-stone-300 hover:text-white font-medium rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Cancel</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-full flex items-center justify-center border border-yellow-600/30">
                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-white font-medium">{emp.name}</h5>
                        <p className="text-stone-400 text-sm">{emp.email}</p>
                        {emp.role && (
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                            emp.role === 'admin' 
                              ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-700/30' 
                              : 'bg-blue-900/30 text-blue-400 border border-blue-700/30'
                          }`}>
                            {emp.role.charAt(0).toUpperCase() + emp.role.slice(1)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleEditClick(emp)} 
                        className="p-2 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/30 hover:border-yellow-500/50 text-yellow-400 hover:text-yellow-300 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Edit Employee"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(emp.id, emp.name)} 
                        className="p-2 bg-red-600/20 hover:bg-red-600/30 border border-red-600/30 hover:border-red-500/50 text-red-400 hover:text-red-300 rounded-lg transition-all duration-200 hover:scale-105"
                        title="Delete Employee"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-stone-500 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              <p className="text-stone-400 text-lg">No employees found</p>
              <p className="text-stone-500 text-sm mt-1">Add your first employee using the form above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  // return (
  //   <div className="employee-list-container">
  //     <h4>Add a New Employee</h4>
  //     <form onSubmit={handleAddEmployee} className="employee-form">
  //       <div className="form-group">
  //         <input 
  //           type="text"
  //           placeholder="name"
  //           value={name}
  //           onChange={(e) => setName(e.target.value)}
  //           required
  //         />
  //       </div>
  //       <div className="form-group">
  //         <input 
  //             type="email"
  //             placeholder="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //           />
  //       </div>
      
  //       <div className="form-group">
  //         <input 
  //           type="password"
  //           placeholder="password"
  //           value={password}
  //           onChange={(e) => setPassword(e.target.value)}
  //           required
  //         />
  //       </div>
        
  //       <button type="submit">Add Employee</button>
  //     </form>

  //     <h4>List of employees</h4>
  //     <ul>
  //       {employees.length > 0 ? (
  //         employees.map(emp => (
  //           <li key={emp.id}>
  //             {editingId === emp.id ? (
  //               <form className="employee-form full-width" onSubmit={(e) => { e.preventDefault(); handleEditSave(emp.id); }}>
  //                 <input name="name" value={editForm.name} onChange={handleEditChange} placeholder="Name" required />
  //                 <input name="email" value={editForm.email} onChange={handleEditChange} placeholder="Email" required />
  //                 <input name="phone" value={editForm.phone || ''} onChange={handleEditChange} placeholder="Phone" />
  //                 <input name="address" value={editForm.address || ''} onChange={handleEditChange} placeholder="Address" />
  //                 <select name="role" value={editForm.role} onChange={handleEditChange} required>
  //                   <option value="employee">Employee</option>
  //                   <option value="admin">Admin</option>
  //                 </select>
  //                 <input name="password" value={editForm.password} onChange={handleEditChange} placeholder="New Password (optional)" />
  //                 <button type="submit">Save</button>
  //                 <button type="button" onClick={handleCancelEdit}>Cancel</button>
  //               </form>
  //             ) : (
  //               <>
  //                 <span>{emp.name} ({emp.email})</span>
  //                 <div>
  //                   <button onClick={() => handleEditClick(emp)} className="icon-btn">
  //                     <EditOutlinedIcon fontSize="small" />
  //                   </button>
  //                   <button onClick={() => handleDelete(emp.id, emp.name)} className="icon-btn">
  //                     <DeleteForeverOutlinedIcon fontSize="small" />
  //                   </button>
  //                 </div>
  //               </>
  //             )}
  //           </li>
  //         ))
  //       ) : (
  //         <li>No Employees found.</li>
  //       )}
  //     </ul>
  //   </div>
  // );
};

export default EmployeeList;