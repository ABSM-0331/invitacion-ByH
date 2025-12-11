const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

// window.addEventListener("scroll", function () {
//     let offset = window.pageYOffset;
//     parallax.style.backgroundPositionX = offset * -0.3 - 100 + "px";
// });

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    offset -= 3100;
    parallax1.style.backgroundPositionY = offset * 0.1 + "px";
});

window.addEventListener("scroll", function () {
    let offset = window.pageYOffset;
    offset -= 4800;
    parallax2.style.backgroundPositionY = offset * -0.1 + "px";
});

function myFunction() {
    document.getElementById("check").checked = false;
}

function reveal() {
    var reveals = document.querySelectorAll(".reveal");

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        } else {
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Toggle transfer details in registry/gifts section
document.addEventListener("DOMContentLoaded", function () {
    var toggles = document.querySelectorAll(".toggle-transfer");
    toggles.forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            var wrapper = btn.closest(".transfer-wrapper");
            if (!wrapper) return;
            var card = wrapper.querySelector(".transfer-card");
            var expanded = btn.getAttribute("aria-expanded") === "true";
            if (card) {
                if (expanded) {
                    card.classList.add("collapsed");
                    btn.setAttribute("aria-expanded", "false");
                    btn.textContent = "Mostrar tarjeta";
                    card.setAttribute("aria-hidden", "true");
                } else {
                    card.classList.remove("collapsed");
                    btn.setAttribute("aria-expanded", "true");
                    btn.textContent = "Ocultar tarjeta";
                    card.setAttribute("aria-hidden", "false");
                }
            }
        });
    });
});

// Countdown timer to the wedding date
document.addEventListener("DOMContentLoaded", function () {
    var daysEl = document.getElementById("cd-days");
    var hoursEl = document.getElementById("cd-hours");
    var minsEl = document.getElementById("cd-mins");
    var secsEl = document.getElementById("cd-secs");

    // Set target date: 17 April 2026 (local time at start of day)
    var target = new Date(2026, 3, 17, 0, 0, 0); // month is 0-indexed (3 = April)

    function updateCountdown() {
        var now = new Date();
        var diff = target - now;
        if (diff <= 0) {
            daysEl.textContent = "0";
            hoursEl.textContent = "0";
            minsEl.textContent = "0";
            secsEl.textContent = "0";
            return;
        }
        var seconds = Math.floor(diff / 1000);
        var days = Math.floor(seconds / (3600 * 24));
        seconds -= days * 3600 * 24;
        var hours = Math.floor(seconds / 3600);
        seconds -= hours * 3600;
        var minutes = Math.floor(seconds / 60);
        var secs = seconds - minutes * 60;

        daysEl.textContent = days;
        hoursEl.textContent = String(hours).padStart(2, "0");
        minsEl.textContent = String(minutes).padStart(2, "0");
        secsEl.textContent = String(secs).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

const familias = {
    sosa: 4,
    garcia: 3,
    martinez: 2,
    lopez: 5,
    perez: 2,
};

const apellidoInput = document.getElementById("apellido");
const invitadosInput = document.getElementById("invitados");
const resultado = document.getElementById("resultado");
const maxValueEl = document.getElementById("maxValue");
const mensaje = document.getElementById("mensaje");
const errorEl = document.getElementById("error");
const submitBtn = document.getElementById("submitBtn");
const form = document.getElementById("rsvpForm");
const successEl = document.getElementById("success");
const incBtn = document.getElementById("inc");
const decBtn = document.getElementById("dec");

let currentMax = 0;

function resetState() {
    currentMax = 0;
    resultado.style.display = "none";
    invitadosInput.value = 0;
    invitadosInput.disabled = true;
    invitadosInput.max = "";
    mensaje.textContent = "Selecciona el apellido para ver el máximo.";
    submitBtn.disabled = true;
    errorEl.style.display = "none";
    successEl.style.display = "none";
}

buscarBtn.addEventListener("click", () => {
    const raw = apellidoInput.value.trim().toLowerCase();
    if (raw === "") {
        resetState();
        return;
    }

    if (Object.prototype.hasOwnProperty.call(familias, raw)) {
        currentMax = familias[raw];
        maxValueEl.textContent = currentMax;
        resultado.style.display = "block";
        invitadosInput.disabled = false;
        invitadosInput.max = currentMax;
        if (Number(invitadosInput.value) > currentMax)
            invitadosInput.value = currentMax;
        mensaje.textContent = `Puedes confirmar hasta ${currentMax} invitado${
            currentMax > 1 ? "s" : ""
        }.`;
        submitBtn.disabled = false;
        errorEl.style.display = "none";
    } else {
        resetState();
        resultado.style.display = "none";
        mensaje.textContent = "Esta familia no está en la lista de invitados.";
        errorEl.textContent = "La familia no está en la lista.";
        errorEl.style.display = "block";
    }
});

invitadosInput.addEventListener("input", () => {
    let val = Number(invitadosInput.value);
    if (Number.isNaN(val) || val < 0) val = 0;
    if (currentMax && val > currentMax) {
        invitadosInput.value = currentMax;
        errorEl.textContent = `No puedes seleccionar más de ${currentMax} invitado${
            currentMax > 1 ? "s" : ""
        }.`;
        errorEl.style.display = "block";
        submitBtn.disabled = true;
    } else {
        errorEl.style.display = "none";
        submitBtn.disabled = false;
    }
});

incBtn.addEventListener("click", () => {
    const max = Number(invitadosInput.max) || 0;
    let val = Number(invitadosInput.value) || 0;
    if (max && val < max) val++;
    invitadosInput.value = val;
    invitadosInput.dispatchEvent(new Event("input"));
});

decBtn.addEventListener("click", () => {
    let val = Number(invitadosInput.value) || 0;
    if (val > 0) val--;
    invitadosInput.value = val;
    invitadosInput.dispatchEvent(new Event("input"));
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const apellido = apellidoInput.value.trim();
    const invitados = Number(invitadosInput.value);

    if (!apellido) {
        errorEl.textContent = "Introduce un apellido.";
        errorEl.style.display = "block";
        return;
    }
    if (!currentMax) {
        errorEl.textContent = "Apellido no válido.";
        errorEl.style.display = "block";
        return;
    }
    if (invitados < 0 || invitados > currentMax) {
        errorEl.textContent = "Número de invitados inválido.";
        errorEl.style.display = "block";
        return;
    }

    // Aquí iría la petición al backend para guardar la confirmación (fetch POST)
    // Simulamos éxito mostrando un mensaje dentro de la tarjeta
    errorEl.style.display = "none";
    successEl.style.display = "block";
    submitBtn.disabled = true;

    // Después de 2.2s ocultar el mensaje y resetear el formulario
    setTimeout(() => {
        successEl.style.display = "none";
        form.reset();
        resetState();
    }, 2200);
});

// Inicializar estado
resetState();
