const router = require("express").Router();
const apiRoutes = require("./api");

router.use("/api", apiRoutes);
// This 'router.use' is so if we make a request to an endpoint that doesn't exist we receive a 404.
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;

// We are collecting the packaged group of API endpoints and prefixing them with the path /api.
// Now when we import the routes to server.js, they'll already be packaged and ready to go with this one file!
