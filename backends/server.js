const express = require("express");
const { ClickHouse } = require("clickhouse");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const clickhouse = new ClickHouse({
  url: "http://localhost",
  port: 8123,
  basicAuth: {
    username: "default",
    password: "",
  },
});



app.post("/add-hospital", async (req, res) => {
  const { hospital_id, name, location, capacity } = req.body;
  if (!hospital_id || !name || !location || !capacity) return res.status(400).send("All fields required");

  const query = `INSERT INTO aoknos_hospital.hospitals VALUES (${hospital_id}, '${name}', '${location}', ${capacity})`;
  try {
    await clickhouse.query(query).toPromise();
    res.json({ message: "Hospital added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get("/get-hospitals", async (req, res) => {
  try {
    const result = await clickhouse.query("SELECT * FROM aoknos_hospital.hospitals").toPromise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Patient
app.post("/add-patient", async (req, res) => {
  const { patient_id, name, age, gender, contact, hospital_id } = req.body;
  if (!patient_id || !name || !age || !gender || !contact ) return res.status(400).send("All fields required");

  const query = `INSERT INTO aoknos_hospital.patients VALUES (${patient_id}, '${name}', ${age}, '${gender}', '${contact}', ${hospital_id})`;
  try {
    await clickhouse.query(query).toPromise();
    res.json({ message: "Patient added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Patients
app.get("/get-patients", async (req, res) => {
  try {
    const result = await clickhouse.query("SELECT * FROM aoknos_hospital.patients").toPromise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add Appointment
app.post("/add-appointment", async (req, res) => {
  const { appointment_id, patient_id, hospital_id, doctor_name, appointment_date } = req.body;
  if (!appointment_id ||!doctor_name || !appointment_date) return res.status(400).send("All fields required");
  const query = `INSERT INTO aoknos_hospital.appointments VALUES (${appointment_id}, ${patient_id}, ${hospital_id}, '${doctor_name}', '${appointment_date}')`;
  try {
    await clickhouse.query(query).toPromise();
    res.json({ message: "Appointment added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Appointments
app.get("/get-appointments", async (req, res) => {
  try {
    const result = await clickhouse.query("SELECT * FROM aoknos_hospital.appointments").toPromise();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.listen(5000, () => console.log("Server running on port 5000"));
