document.addEventListener("DOMContentLoaded", function () {
    let counters = JSON.parse(localStorage.getItem("counters")) || [];
    let darkMode = localStorage.getItem("darkMode") === "enabled";

    const defaultAdkar = [
        "اختر الذكر 🔻",
        "استغفار",
        "الصلاة على النبي ﷺ",
        "سبحان الله",
        "الحمد لله",
        "الله أكبر",
        "لا حول ولا قوة إلا بالله",
        "ذكر جديد..."
    ];

    function renderCounters() {
        const container = document.getElementById("counterContainer");
        container.innerHTML = "";

        counters.forEach((counter, index) => {
            const counterElement = document.createElement("div");
            counterElement.className = "counter";
            if (counter.name === "ذكر جديد...") {
                counterElement.classList.add("show-custom");
            }

            counterElement.innerHTML = `
                <select onchange="handleAdkarSelection(${index}, this.value)">
                    ${defaultAdkar.map(dhikr => `<option value="${dhikr}" ${counter.name === dhikr ? "selected" : ""}>${dhikr}</option>`).join("")}
                </select>
                <input type="text" id="custom-dhikr-${index}" placeholder="اكتب الذكر هنا..." value="${counter.customName || ''}" oninput="updateCustomDhikr(${index}, this.value)">
                <div class="button-group">
                    <button onclick="decrease(${index})">➖</button>
                    <span id="counter-value-${index}">${counter.value}</span>
                    <button onclick="increase(${index})">➕</button>
                </div>
                <div class="button-group">
                    <button onclick="resetCounter(${index})">🔄</button>
                    <button onclick="setCounter(${index})">⚙</button>
                    <button onclick="deleteCounter(${index})">🗑</button>
                </div>
                <input type="color" class="color-picker" onchange="changeColor(${index}, this.value)" value="${counter.color || '#f9f9f9'}">
            `;
            counterElement.style.backgroundColor = counter.color || "#f9f9f9";
            container.appendChild(counterElement);
        });
        saveCounters();
    }

    window.addCounter = function () {
        counters.push({ name: "اختر الذكر 🔻", customName: "", value: 0, color: "#f9f9f9" });
        renderCounters();
    };

    window.handleAdkarSelection = function (index, value) {
        counters[index].name = value;
        if (value === "ذكر جديد...") {
            counters[index].customName = "";
        }
        renderCounters();
    };

    window.updateCustomDhikr = function (index, value) {
        counters[index].customName = value;
        saveCounters();
    };

    function saveCounters() {
        localStorage.setItem("counters", JSON.stringify(counters));
    }

    renderCounters();
});
