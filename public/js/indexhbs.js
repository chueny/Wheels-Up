/* eslint-disable camelcase */
$(document).ready(function () {

    console.log("JS is working!");

    $(document).on("click", ".addToDesired", function (event) {
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0, -12);
        console.log(countryName);

        const desiredCountry = {
            country_name: countryName,
            desired: 1
        };

        addToDesired(desiredCountry);

        function addToDesired(countryObj) {
            console.log(countryObj);
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to desired.");
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".addToVisited", function (event) {
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0, -11);
        console.log(countryName);

        const visitedCountry = {
            country_name: countryName,
            visited: 1,
            desired: 0
        };

        addToVisited(visitedCountry);

        function addToVisited(countryObj) {
            console.log(countryObj);
            $.ajax({
                method: "PUT",
                url: "/api/visited",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to visited.");
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".removeCountry", function (event) {
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0, -8);
        console.log(countryName);

        const removedCountry = {
            country_name: countryName,
            visited: 0
        };

        removeCountry(removedCountry);

        function removeCountry(countryObj) {
            console.log(countryObj);
            $.ajax({
                method: "PUT",
                url: "/api/remove",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " removed.");
                    location.reload();
                }
            );
        }
    });

    $(document).on("click", ".addToDesired", function (event) {
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0, -12);
        console.log(countryName);

        const desiredCountry = {
            countryName: countryName,
            desired: 1
        };

        addToDesired(desiredCountry);

        function addToDesired(countryObj) {
            console.log(countryObj);
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to desired.");
                    location.reload();
                }
            );
        }
    });

    // DISPLAYS COUNTRIES BY FIRST LETTER
    $(document).on("click", ".alphaButton", function (event) {
        event.preventDefault();
        //figure out what letter is clicked, need the value of the button
        let currentLetter = event.currentTarget.innerText;

        getAllCountries();

        function filterByLetter() {
            $("#countriesAtoZ").empty();
            const allCountries = [];
            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }
            //https://flaviocopes.com/javascript-loops-map-filter-reduce-find/
            const filteredCountries = allCountries.filter((currentCountry) => currentCountry.country_name.startsWith(currentLetter) === true);
            filteredCountries.forEach(currentCountry => $("#countriesAtoZ").append("<li>" + currentCountry.country_name + ` <button class="moreInfo" data-name="${currentCountry.country_name}" data-population="${currentCountry.population}" data-region="${currentCountry.region}">More Info</button> </li>`));

        }

        // Get request which gets all country data from the db (via the API route)
        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                countries = data;
                filterByLetter();
            });
        }
    });

    //DISPLAYS MORE INFO ABOUT THE COUNTRIES

    $(document).on("click", ".moreInfo", function (event) {
        event.preventDefault();

        const countryResults = document.getElementById("showCountryCard");
        const countryAtoZ = document.getElementById("countriesAtoZ");

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
                const countryName = clickedEl.getAttribute("data-name");
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
                //const population = cardEl.getAttribute("data-population");
                //const region = cardEl.getAttribute("data-region");

                const desiredCountry = {
                    countryName: countryName,
                    desired: 1
                };

                // eslint-disable-next-line no-trailing-spaces
                //changed condition is passed as parameter to addToDesired function; 
                addToDesired(desiredCountry);

            }
        });

        function addToDesired(countryObj) {
            console.log(countryObj);
            $.ajax({
                method: "PUT",
                url: "/api/desired",
                data: countryObj
            }).then(
                function () {
                    console.log(countryName + " added to desired.");
                    location.reload();
                }
            );
        }

    });

    // DISPLAYS COUNTRIES BY THEIR REGION
    $(document).on("click", ".countryRegion", function (event) {
        event.preventDefault();

        let selectedRegion = $(this).html();

        console.log(selectedRegion);

        getAllCountries();

        function displayByRegion() {

            $("#countriesByRegion").empty();

            const allCountries = [];

            // Gets all the countries from the db and puts it into array allCountries
            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countriesOfChosenRegion = [];

            // Filters through allCountries and puts countries into countriesOfChosenRegion if its region matches the text of the button
            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].region === selectedRegion) {

                    countriesOfChosenRegion.push(allCountries[i]);
                }
            }

            // Creates a <li> for each country and appends it to the ul
            countriesOfChosenRegion.forEach(region => $("#countriesByRegion").append("<li>" + region.country_name + " <button class=\"addToDesired\">Add to List</button></li>"));
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

        console.log(countrySearched);

        getAllCountries();

        function countrySearch() {

            $("#countrySearchResult").empty();

            const allCountries = [];

            // Gets all the countries from the db and puts it into array allCountries
            for (let i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            console.log(allCountries[3].country_name);

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
            countryMatchedSearch.forEach(country => $("#countrySearchResult").append("<li>" + country.country_name + "<button class=\"addToDesired\">Add to List</button></li>"));
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

        console.log(countrySearched);

        getAllCountries();

        function countrySearch() {

            $("#countrySearchResult").empty();

            const allCountries = [];

            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }

            const countryMatchedSearch = [];

            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].country_name === countrySearched) {

                    countryMatchedSearch.push(allCountries[i]);
                }
            }

            if (countryMatchedSearch.length === 0) {

                alert("Your search query did not match any country in our database. Please make sure you spelled it correctly and capitalized the first letter.");
            }

            countryMatchedSearch.forEach(country => $("#countrySearchResult").append("<li>" + country.country_name + " <button class=\"addToDesired\">Add to List</button></li>"));
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

        console.log("clicked worked! and missing field validation worked too!");

        const travelNoteTitle = $("#travelNoteTitle").val().trim();
        const travelNoteText = $("#travelNoteText").val().trim();

        const newTravelNote = {
            noteTitle: travelNoteTitle,
            noteText: travelNoteText
        };

        postTravelNote(newTravelNote);

        function postTravelNote(travelNoteObj) {
            console.log(travelNoteObj);
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