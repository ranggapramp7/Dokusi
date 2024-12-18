require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const socketIo = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const config = require("./config");
const UserModel = require("./userModel");
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});
const Dokumen = require("./model");

const dbUrl = config.URL_DB;
const port = config.PORT || 3000;

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.get("/user", async (req, res) => {
  const userAvailable = await UserModel.find();
  return res.status(200).json({
    message: "success get users",
    data: userAvailable,
  });
});

app.post("/user", async (req, res) => {
  try {
    const { name } = req.body;

    const userAvailable = await UserModel.findOne({ name: name });
    console.log(userAvailable)
    if (userAvailable) {
      return res.status(200).json({
        message: "success user is available user",
        data: userAvailable,
      });
    }
    const newUser = await UserModel.create({
      name: name,
    });
    return res.status(200).json({
      message: "success create newuser",
      data: newUser,
    });

    
  } catch (error) {
    return res.status(400).json({
      message: "error on user",
      data: error,
    });
  }
});

app.get("/dokumen", async (req, res) => {
  try {
    const dokumen = await Dokumen.find().sort({ updatedAt: -1 });
    return res.status(200).json({
      message: "success get document",
      data: dokumen,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error get document",
      data: error,
    });
  }
});

app.get("/dokumen/:id", async (req, res) => {
  try {
    const dokumen = await Dokumen.findById(req.params.id);
    return res.status(200).json({
      message: "success get document",
      data: dokumen,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error get document",
      data: error,
    });
  }
});

app.delete("/dokumen/:id", async (req, res) => {
  try {
    const dokumen = await Dokumen.deleteOne({ _id: req.params.id });
    return res.status(200).json({
      message: "success delete document",
      data: dokumen,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error delete document",
      data: error,
    });
  }
});

app.post("/dokumen", async (req, res) => {
  try {
    const { judul } = req.body;
    const newDokumen = await Dokumen.create({
      judul: judul,
      content: "",
    });
    await newDokumen.save();
    return res.status(200).json({
      message: "success create dokumen",
      data: newDokumen,
    });
  } catch (error) {
    return res.status(400).json({
      message: "error creating document",
      data: error,
    });
  }
});

app.put("/dokumen/rubah-judul/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { judul } = req.body;

    const updatedDokumen = await Dokumen.findByIdAndUpdate(
      id,
      { judul },
      { new: true }
    );

    io.emit(`update-${id}`, updatedDokumen);

    return res.json(updatedDokumen);
  } catch (error) {
    return res.status(400).json({
      message: "error update document",
      data: error,
    });
  }
});

app.put("/dokumen/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const updatedDokumen = await Dokumen.findByIdAndUpdate(
      id,
      { content },
      { new: true }
    );

    io.emit(`update`, updatedDokumen);

    return res.json(updatedDokumen);
  } catch (error) {
    return res.status(400).json({
      message: "error update document",
      data: error,
    });
  }
});

server.listen(port, () => {
  console.log("Server listening on port " + port);
});

io.on("connection", (socket) => {
  console.log("User connected, >> ", socket.id);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
