import axios from 'axios';
import React, { useState } from 'react';
function Addusers() {

const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    email: '',
    nic: '',
    age: '',
    eduLevel: '',
    gender: '',
    currentCity: '',
    pollingStation: '',
    province: '',
    district: '',
    pollingDivision: '',
    currentPosition: '',
    experience: '',
    currentSalary: '',
    positionType:'',
    institutionName: '',
  });

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((prevData) => ({
  ...prevData,
  [name]: value,
    }));
  };

const [provinces, setProvinces] = useState([]);
const [districts, setDistricts] = useState([]);
const [pollingDivisions, setPollingDivisions] = useState([]);

const handleSubmit = (e) => {
  e.preventDefault();
  axios.post('http://localhost:8081/create', formData)
      .then(res => {
          if (res.data.Status === 'Success') {
              console.log('Data submitted successfully.');
              // Optionally, reset or navigate after successful submission
          } else {
              // Handle the error case
              console.log('Error:', res.data.Error);
          }
      })
      .catch(err => {
          if (err.response) {
              // Handle network or server error
              console.log('Server Error:', err.response.data);
          } else {
              // Handle other types of errors
              console.log('An error occurred:', err.message);
          }
      });

 
  // console.log(formData);
};

return (
<div className="container-fluid mt-5 add-users">
   <h1 className="text-center">Add Users</h1>
   <div className="row justify-content-center">
      {/* Centering the form */}
      <div className="col-md-10">
         <h2>Private Details</h2>
         <form onSubmit={handleSubmit}>
            <div className="form-group">
               <label>Full Name</label>
               <input type="text" className="form-control" name="fullName" value={formData.fullName} onChange={handleChange} />
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Date of Birth</label>
                     <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Email</label>
                     <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-group">
                     <label>NIC</label>
                     <input type="text" className="form-control" name="nic" value={formData.nic} onChange={handleChange} />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-group">
                     <label>Age</label>
                     <input type="number" className="form-control" name="age" value={formData.age} onChange={handleChange} />
                  </div>
               </div>
            </div>
            <div className="form-group">
               <label>Educational Level</label>
               <input type="text" className="form-control" name="eduLevel" value={formData.eduLevel} onChange={handleChange} />
            </div>
            <div className="form-group">
               <label>Gender</label>
               <div>
                  <label className="form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                  Male
                  </label>
                  <label className="form-check-inline">
                  <input type="radio" className="form-check-input" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                  Female
                  </label>
               </div>
            </div>
            <div className="form-group">
               <label>Current City</label>
               <input type="text" className="form-control" name="currentCity" value={formData.currentCity} onChange={handleChange} />
            </div>
            <div className="form-group">
               <label>Province</label>
               <select className="form-control" name="province" value={formData.province} onChange={handleChange}>
                  <option value="">Select Province</option>
                  {provinces.map(province => (
                  <option key={province.id} value={province.id}>
                     {province.name}
                  </option>
                  ))}
               </select>
            </div>
            <div className="form-group">
               <label>District</label>
               <select className="form-control" name="district" value={formData.district} onChange={handleChange}>
                  <option value="">Select District</option>
                  {districts.map(district => (
                  <option key={district.id} value={district.id}>
                     {district.name}
                  </option>
                  ))}
               </select>
            </div>
            <div className="form-group">
               <label>Polling Division</label>
               <select className="form-control" name="pollingDivision" value={formData.pollingDivision} onChange={handleChange}>
                  <option value="">Select Polling Division</option>
                  {pollingDivisions.map(pollingDivision => (
                  <option key={pollingDivision.id} value={pollingDivision.id}>
                     {pollingDivision.name}
                  </option>
                  ))}
               </select>
            </div>
            <div className="form-group">
               <label>Polling Station</label>
               <input type="text" className="form-control" name="pollingStation" value={formData.pollingStation} onChange={handleChange} />
            </div>
            <h2>Service Details</h2>
            <div className="form-group">
               <label>Current Position</label>
               <input
                  type="text"
                  className="form-control"
                  name="currentPosition"
                  value={formData.currentPosition}
                  onChange={handleChange}
                  />
            </div>
            <div className="form-group">
               <label>Experience</label>
               <input
                  type="text"
                  className="form-control"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  />
            </div>
            <div className="form-group">
               <label>Current Salary</label>
               <input
                  type="text"
                  className="form-control"
                  name="currentSalary"
                  value={formData.currentSalary}
                  onChange={handleChange}
                  />
            </div>
            <div className="form-group">
               <label>Name of Institution</label>
               <input
                  type="text"
                  className="form-control"
                  name="institutionName"
                  value={formData.institutionName}
                  onChange={handleChange}
                  />
            </div>
            <div className="form-group">
               <label>Position Type</label>
               <input
                  type="text"
                  className="form-control"
                  name="positionType"
                  value={formData.positionType}
                  onChange={handleChange}
                  />
            </div>
            <div className="mt-3 mb-4 text-right">
               <button type="submit" className="btn btn-primary">
               Add User
               </button>
            </div>
         </form>
      </div>
   </div>
</div>
);
}
export default Addusers;