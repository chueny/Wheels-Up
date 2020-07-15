/* eslint-disable camelcase */
$(document).ready(function () {

    console.log("JS is working!");

    // ADDS COUNTRY TO "TO VISIT" LIST
    $(document).on("click", ".addToDesired", function (event) {
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0, -12);

        const desiredCountry = {
            country_name: countryName,
            desired: 1
        };

        addToDesired(desiredCountry);

        function addToDesired(countryObj) {
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    location.reload();
                }
            );
        }
    });

    // ADDS COUNTRY TO "VISITED" LIST
    $(document).on("click", ".addToVisited", function (event) {
        event.preventDefault();

        let countryName = $(this).attr("data-country");

        const visitedCountry = {
            country_name: countryName,
            visited: 1,
            desired: 0
        };

        addToVisited(visitedCountry);

        function addToVisited(countryObj) {
            $.ajax({
                method: "PUT",
                url: "/api/visited",
                data: countryObj
            }).then(
                function () {
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".removeCountry", function (event) {
        event.preventDefault();

        let countryName = $(this).attr("data-country");

        const removedCountry = {
            country_name: countryName,
            visited: 0
        };

        removeCountry(removedCountry);

        function removeCountry(countryObj) {
            $.ajax({
                method: "PUT",
                url: "/api/remove",
                data: countryObj
            }).then(
                function () {
                    location.reload();
                }
            );
        }
    });

    // DISPLAYS COUNTRIES BY FIRST LETTER
    $(document).on("click", ".alphaButton", function (event) {
        event.preventDefault();

        let currentLetter = event.currentTarget.innerText;

        getAllCountries();

        function filterByLetter() {
            $("#countrySearchDisplay").empty();
            const allCountries = [];
            for (let i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }
            //https://flaviocopes.com/javascript-loops-map-filter-reduce-find/
            const filteredCountries = allCountries.filter((currentCountry) => currentCountry.country_name.startsWith(currentLetter) === true);
            filteredCountries.forEach(currentCountry => $("#countrySearchDisplay").append("<li>" + currentCountry.country_name + ` <button class="moreInfo" data-country="${currentCountry.country_name}" data-population="${currentCountry.population}" data-region="${currentCountry.region}">More Info</button> </li>`));

        }

        // Get request which gets all country data from the db (via the API route)
        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                countries = data;
                filterByLetter();
            });
        }
    });

    //DISPLAYS MORE INFO ABOUT A COUNTRY
    $(document).on("click", ".moreInfo", function (event) {
        event.preventDefault();

        const countryResults = document.getElementById("showCountryCard");
        const countryAtoZ = document.getElementById("countrySearchDisplay");

        //this countryCard displays information about said country
        function countryCard(countryName, population, region) {
            countryResults.innerHTML = `<div class="card"> 
            <div class="card-header"> ${countryName} </div> 
            <div class="card-body">
            <h5 class="card-title"></h5>
            <p class="card-text">Why you should visit ${countryName}:</p>
            <p>Population: ${population}</p>
            <p>Region: ${region} </p>
            <button class="cardBtn"
                data-country="${countryName}" 
                data-population="${population}"
                data-region="${region}">
            Add to List</button>
            </div>`;

        }

        //eventlistener for when more info button is clicked, which links it to the functin ALPHA BUTTON
        //when clicked, it sends information attached from the button to some variables that gets passed
        //as parameters to countryCard so that countryCard has that information to display
        countryAtoZ.addEventListener("click", (e) => {
            const clickedEl = e.target;

            if (clickedEl.tagName === "BUTTON") {
                const countryName = clickedEl.getAttribute("data-country");
                const population = clickedEl.getAttribute("data-population");
                const region = clickedEl.getAttribute("data-region");
                countryCard(countryName, population, region);
            }
        });

        //eventlistener for when add to list button is clicked, links to the showCountryCard tag
        countryResults.addEventListener("click", (e) => {
            const cardEl = e.target;

            if (cardEl.tagName === "BUTTON") {

                //button has country data attributes
                //which are stored as an array in the desiredCountry variable, with changed condition
                const countryName = cardEl.getAttribute("data-country");
                // const population = cardEl.getAttribute('data-population');
                // const region = cardEl.getAttribute('data-region');

                const desiredCountry = {
                    country_name: countryName,
                    desired: 1
                };

                //changed condition is passed as parameter to addToDesired;
                addToDesired(desiredCountry);
                location.reload();
            }
        });

        function addToDesired(countryObj) {
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    location.reload();
                }
            );
        }

    });

    // DISPLAYS COUNTRIES BY THEIR REGION
    $(document).on("click", ".countryRegion", function (event) {
        event.preventDefault();

        let selectedRegion = $(this).html();

        getAllCountries();

        function displayByRegion() {

            $("#countrySearchDisplay").empty();

            const allCountries = [];

            // Gets all the countries from the db and puts it into array allCountries
            for (let i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countriesOfChosenRegion = [];

            // Filters through allCountries and puts countries into countriesOfChosenRegion if its region matches the text of the button
            // eslint-disable-next-line no-redeclare
            for (let i = 0; i < allCountries.length; i++) {
                if (allCountries[i].region === selectedRegion) {

                    countriesOfChosenRegion.push(allCountries[i]);
                }
            }

            // Creates a <li> for each country and appends it to the ul
            countriesOfChosenRegion.forEach(region => $("#countrySearchDisplay").append("<li>" + region.country_name + " <button class=\"addToDesired\" data-country=\"{{this.dataValues.country_name}}\">Add to List</button></li>"));
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                countries = data;
                displayByRegion();
            });
        }

    });

    // FINDS COUNTRY BY SEARCH INPUT (enter key)

    $(document).on("submit", "#countrySearchForm", function (event) {
        event.preventDefault();

        let countrySearched = $("#countrySearch").val().trim();

        getAllCountries();

        function countrySearch() {

            $("#countrySearchDisplay").empty();

            const allCountries = [];

            // Gets all the countries from the db and puts it into array allCountries
            for (let i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countryMatchedSearch = [];

            // Filters through allCountries and puts countries into countryMatchedSearch if it matches the search value
            // eslint-disable-next-line no-redeclare
            for (let i = 0; i < allCountries.length; i++) {
                if (allCountries[i].country_name === countrySearched) {

                    countryMatchedSearch.push(allCountries[i]);
                }
            }

            // Checks if any countries matched and throws error message if not
            if (countryMatchedSearch.length === 0) {

                alert("Your search query did not match any country in our database. Please make sure you spelled it correctly and capitalized the first letter.");
            }

            // Creates a <li> for each country and appends it to the ul
            countryMatchedSearch.forEach(country => $("#countrySearchDisplay").append("<li>" + country.country_name + " <button class=\"addToDesired\" data-country=\"{{this.dataValues.country_name}}\">Add to List</button></li>"));
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                countries = data;
                countrySearch();
            });
        }

    });

    // FINDS COUNTRY BY SEARCH INPUT (button click)

    $(document).on("click", "#countrySearchBtn", function (event) {
        event.preventDefault();

        let countrySearched = $("#countrySearch").val().trim();

        getAllCountries();

        function countrySearch() {

            $("#countrySearchDisplay").empty();

            const allCountries = [];

            for (let i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countryMatchedSearch = [];

            // eslint-disable-next-line no-redeclare
            for (let i = 0; i < allCountries.length; i++) {
                if (allCountries[i].country_name === countrySearched) {

                    countryMatchedSearch.push(allCountries[i]);
                }
            }

            if (countryMatchedSearch.length === 0) {

                alert("Your search query did not match any country in our database. Please make sure you spelled it correctly and capitalized the first letter.");
            }

            countryMatchedSearch.forEach(country => $("#countrySearchDisplay").append("<li>" + country.country_name + " <button class=\"addToDesired\" data-country=\"{{this.dataValues.country_name}}\">Add to List</button></li>"));
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                countries = data;
                countrySearch();
            });
        }

    });

    $(document).on("click", "#saveNoteBtn", function (event) {
        event.preventDefault();

        // Prevents the user submitting the post if the title or text is missing
        if (!$("#travelNoteTitle").val().trim() || !$("#travelNoteText").val().trim()) {
            return;
        }

        const travelNoteTitle = $("#travelNoteTitle").val().trim();
        const travelNoteText = $("#travelNoteText").val().trim();

        const newTravelNote = {
            note_title: travelNoteTitle,
            note_text: travelNoteText
        };

        postTravelNote(newTravelNote);

        function postTravelNote(travelNoteObj) {
            $.ajax({
                url: "/api/notes",
                data: travelNoteObj,
                method: "POST",
            }).then(
                function () {
                    location.reload();
                }
            );
        }

        $("#travelNoteTitle").val("");
        $("#travelNoteText").val("");

    });

    $(document).on("click", ".deleteNoteBtn", function (event) {
        event.preventDefault();

        const noteID = $(this).attr("data-id");

        deleteTravelNote(noteID);

        function deleteTravelNote(id) {
            $.ajax({
                url: "/api/notes/" + id,
                method: "DELETE",
            }).then(
                function () {
                    location.reload();
                }
            );
        }

    });


});