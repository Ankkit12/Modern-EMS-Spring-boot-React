import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeService from '../services/EmployeeService';
import '../styles/EmployeeDetailsPage.css';
import { toast } from 'react-hot-toast';

export default function EmployeeDetailsPage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  useEffect(()=>{
    const load = async ()=>{
      try{
        const data = await EmployeeService.getEmployee(id);
        setEmployee(data);
      } catch (e) {
        toast.error('Failed to load employee');
      }
    };
    load();
  },[id]);

  if(!employee) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">
      <button className="btn" onClick={()=> navigate(-1)}>Back</button>
      <div className="profile-card">
        <h2 className="profile-name">{employee.firstName} {employee.lastName}</h2>

        <div className="profile-row">
          <div>
            <div className="label">Email</div>
            <div className="value">{employee.email}</div>
          </div>

          {employee.department && (
            <div>
              <div className="label">Department</div>
              <div className="value">{employee.department}</div>
            </div>
          )}

          <div>
            <div className="label">ID</div>
            <div className="value">{employee.id}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
