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
   
