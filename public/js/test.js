$(document).ready(function () {

    console.log("JS is working!");

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

});