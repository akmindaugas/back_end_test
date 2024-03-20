console.log("test veikia");

// 1. Isirašyti express framework;
// 2. Pasileisti savo serverį;
// 3. Per thunder client kreiptis į endpointą bei gauti atgal duomenis;
// 4. Pasirašy endpointą kuris gražina miestą bei to miesto orų prognozės objektą;
// 5. Pasirašyt endpointą kuris gražiną sugeneruota id; // naudot uuid lib.
// 6. Applikacijoje įrašyt cors biblioteką kuri leis front-end applikacijoms kreiptis į backend serverį;
// 7. Pasirašyt front-end applikaciją kuri pasiims iš backend'o sugeneruota id, bei jį atvaizduot browserio ekrane. // front end applikacija;
// 8. Pasitobulint savo endpointą. kad prieš gražinant sugeneruota id jį taip pat atspauzdintu backendo consolė;
// // nepamiršt killint bei iš naujo runnint applikacijos
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
uuidv4();
app.use(express.json());

// app.get("/", function (req, res) {
//   res.send("Hello World");
// });

var cors = require("cors");

app.use(cors());

// ============================================
const tasks = [];
// =======================================
app.get("/", function (req, res) {
  res.json({ status: "all good" });
});
// +++++++++//////////////////////////////////////
app.get("/getRandomId", function (req, res) {
  const id = uuidv4();
  console.log("log", id);
  return res.status(400).json({ id: id });
});
// =======================================================
app.post("/insertUserName", function (req, res) {
  console.log("req", req.body.name);

  res.status(200).json({ status: "all good" });
});
// =================================================
app.post("/createTask", function (req, res) {
  const task = {
    id: req.body.id,
    title: req.body.title,
  };
  tasks.push(task);
  return res.status(201).json({ status: "task was created", task: task });
});

// ===============================================
app.get("/getAllTasks", function (req, res) {
  return res.json({ tasks: tasks });
});

// ================================================
// app.post("/createTask", function (req, res) {
//   const task = {
//     id: req.body.id,
//     title: req.body.title,
//   };

//   console.log("task", task);
// });

// task.push(task);
// ===================================================
// app.post("/getAllTasks", function (req, res) {
//   return res.json({ tasks: tasks });
// });

// task.push(task);
// --------------------------------------------------------------
app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});

app.use((req, res) => {
  return res.status(404).json({ status: "endpoint does not exists" });
});
