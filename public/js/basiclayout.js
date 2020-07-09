$(document).ready(function () {

    let countries = [];
    
    getCountries();

    // This function creates an array (countriesToAdd) and puts all the country names coming from the database in it and appends each to the page.
    function initializeToVisitList() {
        $("#toVisit").empty();

        let countriesToAdd = [];
        
        for (var i = 0; i < countries.length; i++) {
            countriesToAdd.push(countries[i]);
            $("#toVisit").append("<li>" + countriesToAdd[i].country_name + ` <button class="addToVisited">Wheels Up!</button></li>`);
        }
        // logging out the array to make sure data is being received from the API
        console.log(countriesToAdd);
    }

    // This function makes a get request to the API to get all the country data and sets it to array countries.
    function getCountries() {
        $.get("/api/countries", function (data) {
            console.log(countries);
            countries = data;
            initializeToVisitList();
        });
    }

    $(document).on("click", ".addToVisited", function(event){ 
        event.preventDefault();

        // RIGHT NOW countryName IS JUST THE COUNTRY NAME; USE THIS FOR THE PUT REQUEST SOMEHOW
        let countryName = $(this).parent().text().slice(0,-11);
        console.log(countryName);
    });

    // $(".addToVisited").on("click", function (event) {
    //     event.preventDefautl();

    //     let countryName = $(this).val();

    //     console.log(countryName);

    //     // const newDesiredCountry = {
    //     //     country_name: countryName,
    //     //     visited: 1
    //     // };

    //     // console.log(newDesiredCountry);
    //     // // Send the PUT request.
    //     // updateDesired(newDesiredCountry);

    //     // function updateDesired(newDesired) {
    //     //     $.ajax({
    //     //       method: "PUT",
    //     //       url: "/api/desiredChange",
    //     //       data: newDesired
    //     //     }).then(
    //     //         function () {
    //     //             console.log(countryName + " added to the desired list.");
    //     //             location.reload();
    //     //         }
    //     //     );
    //     // }
    // });

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
});
