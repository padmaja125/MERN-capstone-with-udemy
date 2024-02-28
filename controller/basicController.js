//nanoid is used for creating a unique id without affecting the url
import { nanoid } from "nanoid";

let jobs = [
  { id: nanoid(), company: "apple", position: "front-end" },
  { id: nanoid(), company: "google", position: "front-end" },
];

export const addJob = async (req, res) => {
  console.log("req-->", req?.body);
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: "please provide proper data" });
  }
  const id = nanoid();
  const job = { id, company, position };
  jobs.push(job);
  res.status(200).json({ STATUS: "success", job });
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id == id);
  if (!job) {
    res.status(500).json({ STATUS: "no job available to delete" });
  }
  let newjobs = jobs.find((job) => job.id != id);
  res.status(200).json({ STATUS: "success", newjobs });
};

export const updateJob = async (req, res) => {
  const { company, position } = req.body;
  if (!company || !position) {
    res.status(400).json({ msg: `no data present in the ${id}` });
  }
  const { id } = req.params;
  const job = jobs.find((job) => job.id == id);
  if (!job) {
    res.status(404).json({ msg: "no job is available" });
  }
  job.company = company;
  job.position = position;
  res.status(200).json({ STATUS: "success", job });
};
// crud - create, retrieve, update, delete

// // create new job
// app.post("/api/v1/jobs");

// //retrieve all jobs

// app.get("/api/v1/jobs");

// // retrieve one job
// app.get("/api/v1/job/:id");

// // update the job
// app.patch("/api/v1/job/:id");

// // delete one the job
// app.delete("/api/v1/job/:id");
