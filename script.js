document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".yourDesignInput");
    const continueButton = document.getElementById("continue-button");

    continueButton.addEventListener("click", function () {
        const phoneName = inputField.value.trim();

        if (phoneName) {

            console.log("Phone name entered:", phoneName);
            
        } else {
            alert("Bitte gib einen Gerätenamen ein.");
        }
    });
});
