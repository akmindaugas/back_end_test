// console.log("test veikia");

// // 1. Isirašyti express framework;
// // 2. Pasileisti savo serverį;
// // 3. Per thunder client kreiptis į endpointą bei gauti atgal duomenis;
// // 4. Pasirašy endpointą kuris gražina miestą bei to miesto orų prognozės objektą;
// // 5. Pasirašyt endpointą kuris gražiną sugeneruota id; // naudot uuid lib.
// // 6. Applikacijoje įrašyt cors biblioteką kuri leis front-end applikacijoms kreiptis į backend serverį;
// // 7. Pasirašyt front-end applikaciją kuri pasiims iš backend'o sugeneruota id, bei jį atvaizduot browserio ekrane. // front end applikacija;
// // 8. Pasitobulint savo endpointą. kad prieš gražinant sugeneruota id jį taip pat atspauzdintu backendo consolė;
// // // nepamiršt killint bei iš naujo runnint applikacijos
// const express = require("express");
// const app = express();
// const { v4: uuidv4 } = require("uuid");
// uuidv4();
// app.use(express.json());

// // app.get("/", function (req, res) {
// //   res.send("Hello World");
// // });

// var cors = require("cors");

// app.use(cors());

// // ============================================
// const tasks = [];
// // =======================================
// app.get("/", function (req, res) {
//   res.json({ status: "all good" });
// });
// // +++++++++//////////////////////////////////////
// app.get("/getRandomId", function (req, res) {
//   const id = uuidv4();
//   console.log("log", id);
//   return res.status(400).json({ id: id });
// });
// // =======================================================
// app.post("/insertUserName", function (req, res) {
//   console.log("req", req.body.name);

//   res.status(200).json({ status: "all good" });
// });
// // =================================================
// app.post("/createTask", function (req, res) {
//   const task = {
//     id: req.body.id,
//     title: req.body.title,
//   };
//   tasks.push(task);
//   return res.status(201).json({ status: "task was created", task: task });
// });

// // ===============================================
// app.get("/getAllTasks", function (req, res) {
//   return res.json({ tasks: tasks });
// });

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
// app.listen(3000, function () {
//   console.log("CORS-enabled web server listening on port 3000");
// });

// 1. Parašyt endpointą kuris leistu atspauzdint concolėje filmo rekomendacijos objektą, filmo rekomendacija susideda iš: id, title, raiting, description, imdbLink. Filmo rekomendacija turi būt atsiųsta per body;
// 2. Pamodifikuot endpointą, sugebėtu išsaugoti filmo rekomendaciją į masyvo kintamąjį; // Reiks rekomandaciją supushint;
// 3. Parašyt endpointą kuris parsiųstu visas išsaugotas rekomendacijas;
// 4. Parašyt endpointą kuris gražintu visas rekomendacijas išrikiuotas mažėjimo tvarka pagal reitingą;
// 5. Parašyt endpointą kuris ištrintų visas rekomendacijas;
// 6. Patobulint add movie endpointą, kad jus neleistu pridėti filmo su jau egzistuojančiu id;
// 7. Patobulint savo endpointą bei bei jei masyvas yra tuščias - gražinti 200 statusa su žinute "Data not exist".
// 8. CAO;
// =================================================================
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
uuidv4();
app.use(express.json());

var cors = require("cors");

app.use(cors());

movies = [];

app.post("/postMovie", function (req, res) {
  console.log(req.body);
  const movie = {
    id: req.body.id,
    title: req.body.title,
    rate: req.body.rate,
    description: req.body.description,
    imdbLink: req.body.imdbLink,
  };

  function checkId(id, movies) {
    return movies.some((movie) => movie.id === id);
  }

  if (checkId(movie.id, movies)) {
    return res.json({ status: "such id exists", movie: movie });
  } else {
    // const jsonMovieData = JSON.parse(movie);
    // console.log(jsonMovieData);
    console.log(movie);
    movies.push(movie);
    return res.status(300).json({ status: "Movie was created" });
  }
});

// =============================================
app.get("/getAllMovies", function (req, res) {
  return res.json({ movies: movies });
});

app.post("/sortAllMovies", function (req, res) {
  const sortedMovies = movies.sort(function (a, b) {
    return parseInt(a.rate) - parseInt(b.rate);
  });

  return res.json({ sortedMovies: sortedMovies });
});

app.post("/deleteAllMovies", function (req, res) {
  movies.length = 0;
  return res.json({ status: "all Movie entries were deleted" });
});

// ==========================================================
app.use((req, res) => {
  return res.status(404).json({ status: "endpoint does not exists" });
});

app.listen(3000, function () {
  console.log("CORS-enabled web server listening on port 3000");
});
