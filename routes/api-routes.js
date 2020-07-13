// Requiring our models and passport as we've configured it
const db = require("../models");
const passport = require("../config/passport");

module.exports = function (app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), (req, res) => {
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      email: req.user.email,
      id: req.user.id
    });
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", (req, res) => {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(() => {
        res.redirect(307, "/api/login");
      })
      .catch(err => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });



  app.get("/api/new_country?", function (req, res) {
    if (req.params.countries) {
      // Display the JSON for ONLY that character.
      // (Note how we're using the ORM here to run our searches)
      country.findOne({
        where: {
          countryName: req.params.countries,
          populationSize: req.params.population,
          countryRegion: req.params.region
        }
      }).then(function (dbCountry) {
        return res.json(dbCountry);
      });
    } else {
      country.findAll().then(function (dbCountry) {
        return res.json(dbCountry);
      });
    }
  });

  app.delete("/api/new_country", function (req, res) {
    console.log("country:");
    console.log(req.params.countries)
    country.destroy({
      where: {
        id: req.params.countries
      }
    }).then(function () {
      res.end();
    });
  });
  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", (req, res) => {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Route for getting countries and displaying to the page
  app.get("/api/countries/az", function (req, res) {

    db.Countries.findAll({}).then(function (dbCountries) {
      res.json(dbCountries);
    })
  });

  app.get("/", function (req, res) {

    db.Countries.findAll({}).then(function (data) {
      hbsObject = {
        countries: data
      };

      // console.log("THIS:" + data[0].dataValues.country_name);

      res.render("index", hbsObject);
    });
  });

  // Route for adding a new country to the list
  app.post("/api/new_country", (req, res) => {
    // verify if the country exist before create (look at Slack LA comment for help -BV)
    db.Countries.create({
      country_name: req.body.country_name,
      visited: req.body.visited,
      population: req.body.population,
      region: req.body.region
    })
      .then((dbCountry) => {
        res.json(dbCountry);
      })
      .catch(err => {
        res.status(404).json(err);
      });
  });

  app.put("/api/desired", function (req, res) {

    // console.log(req.body);
    db.Countries.update({ desired: req.body.desired }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryDesired) {

      res.json(dbCountryDesired);
    })
  });

  app.put("/api/visited", function (req, res) {

    // console.log(req.body);
    db.Countries.update({ visited: req.body.visited, desired: req.body.desired }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryVisited) {

      res.json(dbCountryVisited);
    })
  });

  app.put("/api/remove", function (req, res) {

    // console.log(req.body);
    db.Countries.update({ visited: req.body.visited }, {
      where: {
        country_name: req.body.country_name
      }
    }).then(function (dbCountryRemoved) {

      res.json(dbCountryRemoved);
    })
  });

  app.get("/api/notes", function (req, res) {

    db.Notes.findAll({}).then(function (dbNotes) {
      res.json(dbNotes);
      console.log("HELLO!!!!");
    })
  });

};

