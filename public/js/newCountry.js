/* eslint-disable camelcase */
$(document).ready(() => {
    // Getting country info from submit form
    const countrySubmitForm = $("#countrySubmit");
    const countryNameInput = $("#countryName");
    const countryPopInput = $("#countryPop");
    const countryRegionInput = $("#countryRegion");

    countrySubmitForm.on("submit", event => {
        event.preventDefault();
        const newCountry = {
            country_name: countryNameInput.val().trim(),
            visited: 0,
            population: countryPopInput.val().trim(),
            region: countryRegionInput.val().trim()
        };

        createCountry(newCountry.country_name, newCountry.population, newCountry.region);

        // Clears input before redirecting to the members page
        countryNameInput.val("");
        countryPopInput.val("");
        countryRegionInput.val("");
    });

    // Posts the new country data. If successful, we are redirected to the members page
    // Otherwise we log any errors
    function createCountry(country_name, visited, population, region) {
        $.post("/api/new_country", {
            country_name: country_name,
            visited: visited,
            population: population,
            region: region
        })
            .then(() => {
                window.location.replace("/members");
                // If there's an error, handle it by throwing up a bootstrap alert
            })
            .catch(handleLoginErr);
    }

    function handleLoginErr(err) {
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }
});
