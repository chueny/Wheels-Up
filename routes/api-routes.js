/* eslint-disable camelcase */
// Requiring our models and passport as we've configured it
const db = require("../models");

module.exports = function (app) {

    // Route for sending the notes data and countries data to handlebars
    app.get("/", function (req, res) {

        db.Countries.findAll({}).then(function (countriesData) {
            db.Notes.findAll({}).then(function (notesData) {

                hbsObject = {
                    countries: countriesData,
                    notes: notesData
                };

                res.render("index", hbsObject);
            });

        });
    });

    // Route for getting countries and displaying on the page
    app.get("/api/countries/az", function (req, res) {

        db.Countries.findAll({}).then(function (dbCountries) {
            res.json(dbCountries);
        });
    });

    // Route for updating a country's desired value
    app.put("/api/desired", function (req, res) {

        db.Countries.update({ desired: req.body.desired }, {
            where: {
                country_name: req.body.country_name
            }
        }).then(function (dbCountryDesired) {

            res.json(dbCountryDesired);
        });
    });

    // Route for updating a country's visited value
    app.put("/api/visited", function (req, res) {

        db.Countries.update({ visited: req.body.visited, desired: req.body.desired }, {
            where: {
                country_name: req.body.country_name
            }
        }).then(function (dbCountryVisited) {

            res.json(dbCountryVisited);
        });
    });

    // Route for removing a country from the visited list
    app.put("/api/remove", function (req, res) {

        db.Countries.update({ visited: req.body.visited }, {
            where: {
                country_name: req.body.country_name
            }
        }).then(function (dbCountryRemoved) {

            res.json(dbCountryRemoved);
        });
    });

    // Route for getting notes and displaying on the page
    app.get("/api/notes", (req, res) => {

        db.Notes.findAll({}).then(function (dbNotes) {
            res.json(dbNotes);
        });
    });

    // Route for creating a new note
    app.post("/api/notes", (req, res) => {

        db.Notes.create({
            note_title: req.body.note_title,
            note_text: req.body.note_text
        })
            .then((dbNote) => {
                res.json(dbNote);
            })
            .catch(err => {
                res.status(404).json(err);
            });
    });

    // Route for deleting a note
    app.delete("/api/notes/:id", (req, res) => {
        console.log("HEY! req.params.id EQUALS: " + req.params.id);
        db.Notes.destroy({
            where: {
                id: req.params.id
            }
        }).then((dbNote) => {
            res.json(dbNote);
        });
    });

};

