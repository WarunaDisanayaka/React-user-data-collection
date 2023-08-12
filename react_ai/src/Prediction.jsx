import React, { useState } from 'react';

function Prediction() {
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedStation, setSelectedStation] = useState('');
  const [csvFile, setCsvFile] = useState(null);

  // Mock data for select options
  const provinces = ['Central', 'North Central', 'Northern','Eastern','North Western','Southern','Uva','Sabaragamuwa','Western'];
  const districts = ['District X', 'District Y', 'District Z'];
  const divisions = ['Division 1', 'Division 2', 'Division 3'];
  const stations = ['Station A', 'Station B', 'Station C'];

  const handleCsvFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleUpload = () => {
    // Handle the upload logic here
    console.log('Upload button clicked');
    console.log('Selected Province:', selectedProvince);
    console.log('Selected District:', selectedDistrict);
    console.log('Selected Division:', selectedDivision);
    console.log('Selected Station:', selectedStation);
    console.log('CSV File:', csvFile);
  };

  return (
    <div className="container mt-4">
      <h2>Prediction Upload</h2>
      <div className="section">
        <h4>Location Details</h4>
        <div className="row">
          <div className="col-md-6">
            <label>Select Province:</label>
            <select className="form-control" value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
              <option value="">Select</option>
              {provinces.map((province, index) => (
                <option key={index} value={province}>
                  {province}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Select District:</label>
            <select className="form-control" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
              <option value="">Select</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label>Select Polling Division:</label>
            <select className="form-control" value={selectedDivision} onChange={(e) => setSelectedDivision(e.target.value)}>
              <option value="">Select</option>
              {divisions.map((division, index) => (
                <option key={index} value={division}>
                  {division}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>Select Polling Station:</label>
            <select className="form-control" value={selectedStation} onChange={(e) => setSelectedStation(e.target.value)}>
              <option value="">Select</option>
              {stations.map((station, index) => (
                <option key={index} value={station}>
                  {station}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="section mt-3">
        <h4>Upload CSV File</h4>
        <div className="row">
          <div className="col-md-6">
            <label>Choose a CSV file:</label>
            <input type="file" className="form-control-file" accept=".csv" onChange={handleCsvFileChange} />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload
          </button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-success" >
            Predict
          </button>
        </div>
      </div>
    </div>
  );
}

export default Prediction;
