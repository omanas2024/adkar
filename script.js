document.addEventListener("DOMContentLoaded", function () {
    let counters = JSON.parse(localStorage.getItem("counters")) || [];
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    function renderCounters() {
        const container = document.getElementById("counterContainer");
        container.innerHTML = "";

        counters.forEach((counter, index) => {
            const counterElement = document.createElement("div");
            counterElement.className = "counter";
            counterElement.innerHTML = `
                <div class="button-group">
                    <button onclick="decrease(${index})">➖</button>
                    <span id="counter-value-${index}">${counter.value}</span>
                    <button onclick="increase(${index})">➕</button>
                </div>
                <div class="button-group">
                    <button onclick="resetCounter(${index})">🔄</button>
                    <button onclick="deleteCounter(${index})">🗑</button>
                </div>
            `;
            container.appendChild(counterElement);
        });
        saveCounters();
    }

    window.addCounter = function () {
        counters.push({ value: 0 });
        renderCounters();
    };

    window.increase = function (index) {
        counters[index].value++;
        renderCounters();
    };

    window.decrease = function (index) {
        if (counters[index].value > 0) {
            counters[index].value--;
            renderCounters();
        }
    };

    window.resetCounter = function (index) {
        counters[index].value = 0;
        renderCounters();
    };

    window.deleteCounter = function (index) {
        counters.splice(index, 1);
        renderCounters();
    };

    window.toggleDarkMode = function () {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    };

    window.resetAllCounters = function () {
        if (confirm("هل تريد إعادة تعيين جميع العدادات؟")) {
            counters = [];
            renderCounters();
        }
    };

    function saveCounters() {
        localStorage.setItem("counters", JSON.stringify(counters));
    }

    renderCounters();
});
