$(document).ready(function () {

    let countries = [];
    
    getCountries();

    // This function creates an array (countriesToAdd) and puts all the country names coming from the database in it and appends each to the page.
    function initializeVisitList() {
        $("#toVisit").empty();

        let countriesToAdd = [];
        
        for (var i = 0; i < countries.length; i++) {
            countriesToAdd.push(countries[i]);
            $("#toVisit").append("<p>" + countriesToAdd[i].country_name + "</p>");
        }
        // logging out the array to make sure data is being received from the API
        console.log(countriesToAdd);
    }

    // This function makes a get request to the API to get all the country data and sets it to array countries.
    function getCountries() {
        $.get("/api/countries", function (data) {
            console.log(countries);
            countries = data;
            initializeVisitList();
        });
    }

    $(".addToDesired").on("submit", function (event) {
        event.preventDefautl();

        let countryName = $(this).data("country_name");
        console.log(this);

        const newDesiredCountry = {
            country_name: countryName,
            desired: 1
        };

        console.log(newDesiredCountry);
        // Send the PUT request.
        updateDesired(newDesiredCountry);

        function updateDesired(newDesired) {
            $.ajax({
              method: "PUT",
              url: "/api/desiredChange",
              data: newDesired
            }).then(
                function () {
                    console.log(countryName + " added to the desired list.");
                    location.reload();
                }
            );
        }
    });

    // // THIS IS FOR WHEN WE SWITCH TO A LIST OF COUNTRIES
    //     $(".addToDesired").on("click", function (event) {
    //         event.preventDefautl();

    //         let countryName = $(this).data("country_name");
    //         console.log(this);

    //         const newDesiredCountry = {
    //             country_name: countryName,
    //             desired: 1
    //         };

    //         console.log(newDesiredCountry);
    //         // Send the PUT request.
    //         updateDesired(newDesiredCountry);

    //         function updateDesired(newDesired) {
    //             $.ajax({
    //               method: "PUT",
    //               url: "/api/desiredChange",
    //               data: newDesired
    //             }).then(
    //                 function () {
    //                     console.log(countryName + " added to the desired list.");
    //                     location.reload();
    //                 }
    //             );
    //         }
    //     });

});
