document.addEventListener("DOMContentLoaded", function () {
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    function applyDarkMode() {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    }

    window.toggleDarkMode = function () {
        darkMode = !darkMode;
        applyDarkMode();
    };

    applyDarkMode();
});
