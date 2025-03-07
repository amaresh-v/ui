import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  AppBar,
  Toolbar,
  Tabs,
  Tab
} from "@mui/material";
import "./App.css";
const SERVER_IP="65.2.5.124"

const App = () => {
  const [tab, setTab] = useState(0);

  // Hospital State
  const [hospitals, setHospitals] = useState([]);
  const [hospitalId, setHospitalId] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [location, setLocation] = useState("");
  const [capacity, setCapacity] = useState("");

  // Patient State
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
const [gender,setGender] = useState("");
const [contact,setContact] = useState("");


  // Appointment State
  const [appointments, setAppointments] = useState([]);
  const [appointmentId, setAppointmentId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
const [assignedDoctor,setAssignedDoctor] = useState("");


  useEffect(() => {
    fetchHospitals();
    fetchPatients();
    fetchAppointments();
  }, []);

  // Fetch Data
  const fetchHospitals = async () => {
    const url = `http://${SERVER_IP}:8080/get-hospitals`;
    console.log(url);
    const res = await axios.get(`http://${SERVER_IP}:8080/get-hospitals`);
    setHospitals(res.data);
  };

  const fetchPatients = async () => {
    const res = await axios.get(`http://${SERVER_IP}:8080/get-patients`);
    setPatients(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get(`http://${SERVER_IP}:8080/get-appointments`);
    setAppointments(res.data);
  };

  // Add Data
  const addHospital = async () => {
    await axios.post(`http://${SERVER_IP}:8080/add-hospital`, { hospital_id: hospitalId, name: hospitalName, location, capacity });
    fetchHospitals();
  };

  const addPatient = async () => {
    await axios.post(`http://${SERVER_IP}:8080/add-patient`, { patient_id: patientId, name: patientName, age,gender,contact, hospital_id: hospitalId });
    fetchPatients();
  };

  const addAppointment = async () => {
    await axios.post(`http://${SERVER_IP}:8080/add-appointment`, { appointment_id: appointmentId,doctor_name:assignedDoctor,appointment_date: appointmentDate });
    fetchAppointments();
  };

  return (
    <Container maxWidth="lg">
      {/* Navbar */}
      <AppBar position="static" className="appBar">
        <Toolbar>
          <Typography variant="h4" className="appTitle">Aoknos Hospital Management</Typography>
        </Toolbar>
      </AppBar>

      {/* Tabs */}
      <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} centered>
        <Tab label="🏥 Hospitals" />
        <Tab label="👨‍⚕ Patients" />
        <Tab label="📅 Appointments" />
      </Tabs>

      {/* Hospital Tab */}
      {tab === 0 && (
        <>
          <div className="form-container">
            <Typography variant="h5" className="form-title">➕ Add Hospital</Typography>
            <TextField label="Hospital ID" type="number" value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} fullWidth />
            <TextField label="Hospital Name" value={hospitalName} onChange={(e) => setHospitalName(e.target.value)} fullWidth />
            <TextField label="Location" value={location} onChange={(e) => setLocation(e.target.value)} fullWidth />
            <TextField label="Capacity" type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" className="add-button" onClick={addHospital}>Add Hospital</Button>
          </div>
          <Typography variant="h5" className="section-title">🏥 Hospitals List</Typography>
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead>
                <TableRow className="table-header">
                  <TableCell>Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Capacity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {hospitals.map(h => (
                  <TableRow key={h.hospital_id} className="table-row">
                    <TableCell>{h.name}</TableCell>
                    <TableCell>{h.location}</TableCell>
                    <TableCell>{h.capacity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Patient Tab */}
      {tab === 1 && (
        <>
          <div className="form-container">
            <Typography variant="h5" className="form-title">➕ Add Patient</Typography>
            <TextField label="Patient ID" type="number" value={patientId} onChange={(e) => setPatientId(e.target.value)} fullWidth />
            <TextField label="Name" value={patientName} onChange={(e) => setPatientName(e.target.value)} fullWidth />
            <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
            <TextField label="Gender" value={gender} onChange={(e) => setGender(e.target.value)} fullWidth/>
            <TextField label="Contact" value={contact} onChange={(e) => setContact(e.target.value)} fullWidth />
 <TextField label="Hospital ID" type="number" value={hospitalId} onChange={(e) => setHospitalId(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" className="add-button" onClick={addPatient}>Add Patient</Button>
          </div>
 <Typography variant="h5" className="section-title">🏥 Patient list</Typography>
<TableContainer component={Paper} className="table-container">
<Table>
<TableHead>
<TableRow className="table-header">
<TableCell>Name</TableCell>
<TableCell>age</TableCell>
<TableCell>Gender</TableCell>
<TableCell>Contact</TableCell>
<TableCell>HospitalId</TableCell>
</TableRow>
</TableHead>
<TableBody>
{patients.map(h=>(<TableRow key={h.patient_id} className="table-row">
<TableCell>{h.name}</TableCell>
<TableCell>{h.age}</TableCell>
<TableCell>{h.gender}</TableCell>
<TableCell>{h.contact}</TableCell>
<TableCell>{h.hospitalId}</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
        </>
      )}

      {/* Appointment Tab */}
      {tab === 2 && (
        <>
          <div className="form-container">
            <Typography variant="h5" className="form-title">➕ Add Appointment</Typography>
            <TextField label="Appointment ID" type="number" value={appointmentId} onChange={(e) => setAppointmentId(e.target.value)} fullWidth />
 <TextField label="doctor name"  value={assignedDoctor} onChange={(e) => setAssignedDoctor(e.target.value)} fullWidth />
            <TextField label="Date" type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} fullWidth />
            <Button variant="contained" color="primary" className="add-button" onClick={addAppointment}>Add Appointment</Button>
          </div>
<Typography variant="h5" className="section-title">🏥 Patient list</Typography>
<TableContainer component={Paper} className="table-container">
<Table>
<TableHead>
<TableRow className="table-header">
<TableCell>appointmentId</TableCell>
<TableCell>assignedDoctor</TableCell>
<TableCell>date</TableCell>
</TableRow>
</TableHead>
<TableBody>
{appointments.map(h=>(<TableRow key={h.appointment_id} className="table-row">
<TableCell>{h.appointmentId}</TableCell>
<TableCell>{h.assignedDoctor}</TableCell>
<TableCell>{h.date}</TableCell>
</TableRow>
))}
 </TableBody>
  </Table>
 </TableContainer>
 </>
)}
</Container>
);
};
export default App;
