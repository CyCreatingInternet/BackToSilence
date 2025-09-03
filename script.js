document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector(".yourDesignInput");
    const continueButton = document.getElementById("continue-button");
    const newElement = document.createElement('p');
    const button = document.getElementById('continue-button');
    const container = document.getElementById('new');

    continueButton.addEventListener("click", function () {
        const phoneName = inputField.value.trim();
        window.open("apps-view.html", "_blank");
    });
});
