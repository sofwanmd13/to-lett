const express = require("express");
const roommateListCollection = require("../models/roommateList");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const { ObjectId } = require("mongodb");
const UPLOAD_FOLDER = "./public/image";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_FOLDER);
  },
  filename: (req, file, cb) => {
    if (file) {
      const fileExt = path.extname(file.originalname);
      const fileName =
        file.originalname
          .replace(fileExt, "")
          .toLowerCase()
          .split(" ")
          .join("-") +
        "-" +
        Date.now();
      console.log("🚀 ~ fileName:", fileName);
      cb(null, fileName + fileExt);
    }
  },
});

var upload = multer({
  storage: storage,
});

router.get("/roommateList", async (req, res) => {
  try {
    const { search, sort, gender } = req.query;
    let query = {};

    if (search) {
      query = {
        $or: [
          {
            "roomateList.description.location.address": {
              $regex: new RegExp(search, "i"),
            },
          },
          {
            "roomateList.description.location.city": {
              $regex: new RegExp(search, "i"),
            },
          },
        ],
      };
    }

    // Filter by gender
    if (
      gender &&
      (gender.toLowerCase() === "female" || gender.toLowerCase() === "male")
    ) {
      query["roomateList.roomatePreferences.gender"] = gender;
    }

    // Sort by rent (price)
    let sortOption = {};
    if (sort === "High To Low") {
      sortOption = { "roomateList.description.rent": -1 };
    } else if (sort === "Low To High") {
      sortOption = { "roomateList.description.rent": 1 };
    }

    const data = await roommateListCollection
      .find(query)
      .sort(sortOption)
      .toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/roommate", async (req, res) => {
  try {
    const data = await roommateListCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/roommate/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("fffff", id);
    const data = await roommateListCollection.findOne(new ObjectId(id));
    console.log(data);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "Roommate list not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post(
  "/add/roommateList",
  upload.array("images", 10),
  async (req, res) => {
    try {
      // console.log("🚀 ~ router.post ~ req.body:", req.body); // This should contain userEmail and userId
      //   console.log("🚀 ~ router.post ~ req.files:", req.files); // This should contain uploaded files

      // Access userEmail and userId from req.body
      const {
        userEmail,
        userId,
        userImage,
        bedroomType,
        bathroom,
        availableFrom,
        size,
        rent,
        address,
        city,
        postalCode,
        gender,
        pets,
        smoking,
        employmentStatus,
        userGender,
        firstName,
        lastName,
        Phone,
        userEmploymentStatus,
      } = req.body;

      // console.log(req.body)
      // Map filenames from req.files
      //   const filenames = req.files.map((file) => file.filename)
      //   console.log("🚀 ~ router.post ~ filenames:", filenames);

      // Create newRoommateList object
      const newRoommateList = {
        userEmail,
        userId,
        userImage,
        roomateList: {
          description: {
            bedroomType,
            bathroom,
            size,
            rent,
            availableFrom,
            location: {
              address,
              city,
              postalCode,
            },
          },
          roomatePreferences: {
            gender,
            pets,
            smoking,
            employmentStatus,
          },
          images: req.files.map((file) => file.filename), // Use filenames obtained from req.files
          contact_person: {
            userGender,
            firstName,
            lastName,
            phone: Phone,
            userEmploymentStatus,
          },
        },
      };

      // Insert newFlatList into the database
      await roommateListCollection.insertOne(newRoommateList);

      // Send a success response
      res
        .status(201)
        .json({ message: "Roommate list data added successfully." });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  }
);

module.exports = router;
