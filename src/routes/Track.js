// Packages
const express = require("express");

// Accéss uniquement pour les authentifiants
const { checkAuth } = require("../middlewares/CheckAuth");

// Routes actions
const { fetchTracks, createTracks, getTrack } = require("../controllers/Track");

// Créer l'objet de routage
const router = express.Router();

// Obliger les routes suivants d'être après l'authentification
router.use(checkAuth);

// Lister les trajets fais
router.get("/tracks", fetchTracks);

// Créer un trajet
router.post("/track", createTracks);

// Retourner un trajet par son id
router.get("/track/:_id", getTrack );

module.exports = router;
