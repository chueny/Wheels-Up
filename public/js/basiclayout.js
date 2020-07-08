console.log("JS WORKING!");
$(document).ready(function () {

    //let $toVisit = $("#toVisit");

    let countries = [];

    getCountries();

    function initializeVisitList() {
        //$toVisit.empty();
        let countriesToAdd = [];
        for (var i = 0; i < countries.length; i++) {
            countriesToAdd.push(countries[i]);
        }
        //$toVisit.prepend(countriesToAdd);
        $("#toVisit").prepend("text");
    }

    function getCountries() {
        $.get("/api/countries", function (data) {
            countries = data;
            initializeVisitList();
        });
    }




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

    // THIS IS FOR WHEN WE SWITCH TO A LIST OF COUNTRIES
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
