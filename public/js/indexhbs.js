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

        // Learned about slice() from this SO page: https://stackoverflow.com/questions/4308934/how-to-delete-last-character-from-a-string-using-jquery
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
