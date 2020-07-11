$(document).ready(function () {

    console.log("JS WORKING!");

    $(document).on("click", ".addToDesired", function(event){ 
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0,-12);
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

    $(document).on("click", ".addToVisited", function(event){ 
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0,-11);
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

    $(document).on("click", ".removeCountry", function(event){ 
        event.preventDefault();

        let countryName = $(this).parent().text().slice(0,-8);
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


    $(document).on("click", ".addToDesired", function(event){ 
        event.preventDefault();

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0,-12);
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

    $(document).on("click", ".alphaButton", function(event){ 
        event.preventDefault();
        console.log("We are in the S submit");
        //figure out what letter they click, need buttons value
        let currentLetter= event.currentTarget.innerText;

       // debugger;


        getAllCountries();

        function filterByLetter() {
            $("#countriesAtoZ").empty();
    
            const allCountries = [];
            
            for (var i = 0; i < countries.length; i++) {
                allCountries.push(countries[i]);
            }
        
          
            //https://flaviocopes.com/javascript-loops-map-filter-reduce-find/

            const filteredCountries = allCountries.filter((currentCountry) => currentCountry.country_name.startsWith(currentLetter) === true
            //console.log("This is the current country", currentCountry);
            //access object with property of country_name (currenty country is the variable that I am accessing);
            );

            filteredCountries.forEach(currentCountry => $("#countriesAtoZ").append("<li>" + currentCountry.country_name + "</li>"))
            
        }
    
        function getAllCountries() {
            $.get("/api/countries/az", function (data) {
                console.log(allCountries);
                countries = data;
                filterByLetter();
            });
        }

    });

});
