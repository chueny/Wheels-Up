$(document).ready(function () {

    console.log("JS WORKING!");

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
            console.log(countryObj)
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
            console.log(countryObj)
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
            console.log(countryObj)
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

    // THE BELOW CODE IS REDUNANT
    // $(document).on("click", ".addToDesired", function (event) {
    //     event.preventDefault();

    //     // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
    //     let countryName = $(this).parent().text().slice(0, -12);
    //     console.log(countryName);

    //     const desiredCountry = {
    //         country_name: countryName,
    //         desired: 1
    //     };

    //     addToDesired(desiredCountry);

    //     function addToDesired(countryObj) {
    //         console.log(countryObj)
    //         $.ajax({
    //             method: "PUT",
    //             url: "/api/desired",
    //             data: countryObj
    //         }).then(
    //             function () {
    //                 console.log(countryName + " added to desired.");
    //                 location.reload();
    //             }
    //         );
    //     }
    // });
  
    $(document).on("click", ".alphaButton", function(event){ 
        event.preventDefault();
        //figure out what letter is clicked, need the value of the button
        let currentLetter= event.currentTarget.innerText;

        getAllCountries();

        function filterByLetter() {
            $("#countriesAtoZ").empty();
            const allCountries = [];
            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }
            
            //https://flaviocopes.com/javascript-loops-map-filter-reduce-find/
            const filteredCountries = allCountries.filter((currentCountry) => currentCountry.country_name.startsWith(currentLetter) === true);
            filteredCountries.forEach(currentCountry => $("#countriesAtoZ").append("<li>" + currentCountry.country_name + `<button class="moreInfo">More Info</button>`)) 
            //filteredCountries.forEach(currentCountry => $("#countriesAtoZ").append("<li>" + currentCountry.country_name + ` <button class="addToDesired">Add to List</button></li>`))   


        }

        // Get request which gets all country data from the db (via the API route)
        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                filterByLetter();
            });
        }
    });

    //DISPLAYS MORE INFO ABOUT THE COUNTRIES

    $(document).on("click", ".moreInfo", function(event){ 
        event.preventDefault();
        
        console.log("I AM IN THE moreINFO function!");

        $("#showCountryCard").empty();

        var large = '<div class="card"> <div class="card-header"> COUNTRY NAME </div> <div class="card-body"><h5 class="card-title"></h5><p class="card-text">Three reasons to visit COUNTRY_NAME:</p> <p>Population: NEED POP</p><p>Region: NEED REGION </p><button class="addToDesired">Add to List</button></div></div>';
        $("#showCountryCard").append(large);

        // document.getElementById("#showCountryCard"").innerHTML +=  
        //       "<h3>This is the text which has been inserted by JS</h3>"; 
       //$("#showCountryCard").append("<li>" + currentCountry.country_name + ` <button class="addToDesired">Add to List</button></li>`);





        

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
            for (var i = 0; i < allCountries.length; i++) {
                if (allCountries[i].region === selectedRegion) {

                    countriesOfChosenRegion.push(allCountries[i]);
                }
            };

            // Creates a <li> for each country and appends it to the ul
            countriesOfChosenRegion.forEach(region => $("#countriesByRegion").append("<li>" + region.country_name + ` <button class="addToDesired">Add to List</button></li>`))
        }

        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                displayByRegion();
            });
        }

    });

});