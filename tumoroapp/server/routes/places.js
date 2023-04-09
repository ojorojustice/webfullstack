var express = require("express");
var router = express.Router();
const sequenceGenerator = require("./sequenceGenerator");
const Place = require("../models/places");

router.get("/", (req, res, next) => {
  Place.find()
    .then((places) => {
      res.status(200).json({
        message: "Contacts fetched successfully!",
        places: places,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.post("/place", (req, res, next) => {
  const maxPlacesId = sequenceGenerator.nextId("places");

  const place = new Place({
    id: maxPlacesId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  });

  place
    .save()
    .then((createdPlace) => {
      res.status(201).json({
        message: "Child place added successfully",
        contact: createdPlace,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  Place.findOne({ id: req.params.id })
    .then((place) => {
      place.name = req.body.name;
      place.email = req.body.email;
      place.phone = req.body.phone;

      Place.updateOne({ id: req.params.id }, place)
        .then((result) => {
          res.status(204).json({
            message: "Contact updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Contact not found.",
        error: { contact: "Contact not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Place.findOne({ id: req.params.id })
    .then((place) => {
      Place.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Place deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Place not found.",
        error: { place: "Place not found" },
      });
    });
});

module.exports = router;
