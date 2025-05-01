import { useEffect, useState } from "react";
function EmployeeList() {
  const [ employees, setEmployees ] = useState([]);

  useEffect(() => {
    const fecthEmployees = async () => {
      try {
        const res = await fetch('/api/admin/employees');
        const data = await res.json();
        setEmployees(data);
     } catch(err) {
        console.error('Error fetching employees: ', err);
     }
    };
    fecthEmployees();
  }, []);

  return (
    <div className="employee-list">
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