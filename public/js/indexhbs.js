$(document).ready(function () {

    console.log("JS WORKING!");

    // let countries = [];
    
    // getCountries();

    // // This function creates an array (toVisitCountries) and puts all the country names coming from the database in it and appends each to the page.
    // function initializeToVisitList() {
    //     $("#toVisit").empty();
    //     $("#visited").empty();

    //     // Next Step: make toVisitCountries allCountries and have the for loop put all the countries from the database in there
    //     // and then to the same thing for desired countries as was done for visited countries

    //     const toVisitCountries = [];
        
    //     for (var i = 0; i < countries.length; i++) {
    //         toVisitCountries.push(countries[i]);

    //         $("#toVisit").append("<li>" + toVisitCountries[i].country_name + ` <button class="addToVisited">Wheels Up!</button></li>`);
    //     }
        
    //     // Filters out countries that have NOT been visited
    //     const visitedCountries = toVisitCountries.filter(function(countryData) {

    //         return countryData.visited === true;
    //     });
    //     console.log(visitedCountries);
        
    //     // Appends the country's name to list of visited countries
    //     visitedCountries.forEach(visitedCountry => $("#visited").append("<li>" + visitedCountry.country_name + "</li>"))


    // }

    // // This function makes a get request to the API to get all the country data and sets it to array countries.
    // function getCountries() {
    //     $.get("/api/countries", function (data) {
    //         console.log(countries);
    //         countries = data;
    //         initializeToVisitList();
    //     });
    // }

    $(document).on("click", ".addToVisited", function(event){ 
        event.preventDefault();

        // RIGHT NOW countryName IS JUST THE COUNTRY NAME; USE THIS FOR THE PUT REQUEST SOMEHOW
        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
        let countryName = $(this).parent().text().slice(0,-11);
        console.log(countryName);

        // //const visitedCountry = countryName;

        // const visitedCountry = {
        //     country_name: countryName,
        //     visited: 1
        // };

        // addToVisited(visitedCountry);

        // function addToVisited(countryObj) {
        //     console.log(countryObj)
        //     $.ajax({
        //       method: "PUT",
        //       url: "/api/visited",
        //       data: countryObj
        //     }).then(
        //         function () {
        //             console.log(countryName + " added to visited.");
        //             location.reload();
        //         }
        //     );
        // }
    });

    // $(".addToDesired").on("submit", function (event) {
    //     event.preventDefautl();

    //     let countryName = $(this).data("country_name");
    //     console.log(this);

    //     const newDesiredCountry = {
    //         country_name: countryName,
    //         desired: 1
    //     };

    //     console.log(newDesiredCountry);
    //     // Send the PUT request.
    //     updateDesired(newDesiredCountry);

    //     function updateDesired(newDesired) {
    //         $.ajax({
    //           method: "PUT",
    //           url: "/api/desiredChange",
    //           data: newDesired
    //         }).then(
    //             function () {
    //                 console.log(countryName + " added to the desired list.");
    //                 location.reload();
    //             }
    //         );
    //     }
    // });
});
