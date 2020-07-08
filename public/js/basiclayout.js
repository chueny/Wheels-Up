$(function () {


    $(".addToDesired").on("click", function (event) {
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
