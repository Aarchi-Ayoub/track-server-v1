const express = require("express");

const router = express.Router();

router.post("/auth/singIn", (_req, _res) => {
    console.log('====================================');
    console.log(_req.body);
    console.log('====================================');
    _res.send('You made a singIn request..')
});

module.exports = router; 