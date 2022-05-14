/**
 * Pour avoir access au model créé <<Track>>
 * Si on importe le fichier directement à l'itérieur de pluieur fichier
 * ==> nous allons exécuter accidentellement la ligne qui définie le model plusieurs fois.
 */

// Packages
const express = require("express");
const mongoose = require("mongoose");
// Accéss uniquement pour les authentifiants
const {checkAuth} = require("../middlewares/CheckAuth");

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
   * 1- Qui est cet utilisateur ? Quel est son id ?
   * Une fois on a réponse on interoge notre BD avec le model créé en haut
   */

  // Extract the user id from the request
  const userId = _req.user._id;
  // Save the tracks of this user
  const tracks = await Track.find({ userId });

  _res.send(tracks);
});
module.exports = router;
