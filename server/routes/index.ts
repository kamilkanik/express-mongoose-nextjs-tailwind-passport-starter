const express = require("express");
const passport = require("passport");
const router = express.Router();

// START CONTROLLERS IMPORT
const authController = require("../controllers/authController");
// END CONTROLLERS IMPORT


/* Error handler for async / await functions */
const catchErrors = fn => {
    return function(req, res, next) {
      return fn(req, res, next).catch(next);
    };
};

/**
 * AUTH ROUTES: /api/auth
 */
router.post("/api/auth/signup", authController.signup);
router.post("/api/auth/signin", authController.signin);
router.get("/api/auth/signout", authController.signout);

// AUTH WITH STEAM
// router.get('/user-data', (req, res) => {
// 	res.send(req.user);
// });
// router.get('/api/auth/steam', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
// 	res.redirect('/user-data');
// });

// router.get('/api/auth/steam/return', passport.authenticate('steam', {failureRedirect: '/'}), function (req, res) {
// 	res.redirect('/user-data');
// });


module.exports = router;
