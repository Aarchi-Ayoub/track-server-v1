/**
 * Pour avoir access au model créé <<Track>>
 * Si on importe le fichier directement à l'itérieur de pluieur fichier
 * ==> nous allons exécuter accidentellement la ligne qui définie le model plusieurs fois.
 */

// Packages
const express = require("express");
const mongoose = require("mongoose");
// Accéss uniquement pour les authentifiants
const { checkAuth } = require("../middlewares/CheckAuth");

// Accés au model des tracking
const Track = mongoose.model("Track");

// Créer l'objet de routage
const router = express.Router();

// Obliger les routes suivants d'être après l'authentification
router.use(checkAuth);

// Lister les trajets fais
router.get("/tracks", async (_req, _res) => {
  /**
   * D'abord on doit :
   * Qui est cet utilisateur ? Quel est son id ?
   * Une fois on a réponse on interoge notre BD avec le model créé en haut
   */

  // Extract the user id from the request
  const userId = _req.user._id;
  // Save the tracks of this user
  const tracks = await Track.find({ userId });

  _res.send(tracks);
});

// Créer un trajet
router.post("/track", async (_req, _res) => {
  // Extract the user id from the request
  const userId = _req.user._id;
  // Extract the track infos
  const { name, locations } = _req.body;

  // Check the send it infos
  if (!name || !locations) {
    return _res
      .status(422)
      .send({ message: "The name or the locations are missing" });
  }
  // Handling error
  try {
    // Save the track at the DB
    const track = new Track({ name, locations, userId });
    await track.save();
    // Return the created item
    _res.send(track);
  } catch (error) {
    return _res.status(422).send({ message: error.message });
  }
});

// Retourner un trajet par son id
router.get("/track/:_id", async (_req, _res) => {
  // Extract id from the url
  const trackId = _req.params._id;
  // Handling error
  try {
    // Save the tracks of this user
    const track = await Track.findById(trackId);
    // Return the found it track
    _res.send(track);
  } catch (error) {
    return _res.status(422).send({ message: error.message });
  }
});

module.exports = router;
