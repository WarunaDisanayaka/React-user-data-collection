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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can handle form submission and data processing
    // For example, you can send the form data to a backend API
    console.log(formData);
  };

  return (
    <div className="container-fluid mt-5">
      <h1 className="text-center">Add Users</h1>
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
          <label>Polling Station</label>
          <input type="text" className="form-control" name="pollingStation" value={formData.pollingStation} onChange={handleChange} />
        </div>
        <div className="mt-3 text-right">
          <button type="submit" className="btn btn-primary">
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}

export default Addusers;
