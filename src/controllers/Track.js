/**
 * Pour avoir access au model créé <<Track>>
 * Si on importe le fichier directement à l'itérieur de pluieur fichier
 * ==> nous allons exécuter accidentellement la ligne qui définie le model plusieurs fois.
 */

// Packages
const mongoose = require("mongoose");

// Accés au model des tracking
const Track = mongoose.model("Track");

// Lister les trajets fais
exports.fetchTracks = async (_req, _res) => {
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
};

// Créer un trajet
exports.createTracks = async (_req, _res) => {
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
};

// Lire par id
exports.getTrack = async (_req, _res) => {
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
};
