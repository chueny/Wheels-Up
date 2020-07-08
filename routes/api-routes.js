// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  // app.post("/api/login", passport.authenticate("local"), (req, res) => {
  //   // Sending back a password, even a hashed password, isn't a good idea
  //   res.json({
  //     email: req.user.email,
  //     id: req.user.id
  //   });
  // });

  // // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // // otherwise send back an error
  // app.post("/api/signup", (req, res) => {
  //   db.User.create({
  //     email: req.body.email,
  //     password: req.body.password
  //   })
  //     .then(() => {
  //       res.redirect(307, "/api/login");
  //     })
  //     .catch(err => {
  //       res.status(401).json(err);
  //     });
  // });

  // // Route for logging user out
  // app.get("/logout", (req, res) => {
  //   req.logout();
  //   res.redirect("/");
  // });

  // // Route for getting some data about our user to be used client side
  // app.get("/api/user_data", (req, res) => {
  //   if (!req.user) {
  //     // The user is not logged in, send back an empty object
  //     res.json({});
  //   } else {
  //     // Otherwise send back the user's email and id
  //     // Sending back a password, even a hashed password, isn't a good idea
  //     res.json({
  //       email: req.user.email,
  //       id: req.user.id
  //     });
  //   }
  // });

  // Route for getting countries and dispalying using handlebars (for testing)
  app.get("/api/countries", function (req, res) {

    db.Countries.findAll({}).then(function (dbCountries) {
      res.json(dbCountries);
    })
  });

//   // Route for adding a new country to the list
//   app.post("/api/new_country", (req, res) => {
//     db.Countries.create({
//       country_name: req.body.country_name,
//       visited: req.body.visited,
//       population: req.body.population,
//       region: req.body.region
//     })
//       .then((dbCountry) => {
//         res.json(dbCountry);
//       })
//       .catch(err => {
//         res.status(404).json(err);
//       });
//   });

//   // THIS IS A TEST I USE TO MAKE SURE THE SERVER IS WORKING
//   // app.get("/api/new_country", (req, res) => {
//   //   res.send("TEST WORKED!");
//   // });

//   app.put("/api/desiredChange", function (req, res) {
//     // Do I need to use the /:country_name above? In the client-side too?
//     db.Countries.update({ desired: 1 }, {
//       where: {
//         country_name: req.body.country_name
//       }
//     }).then(function (dbCountryDesired) {

//       res.json(dbCountryDesired);
//       // res.status(200).end();
//     }
//     );

//   });
}
