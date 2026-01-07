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

function cerrarMenu() {
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

    // Set target date: 17 April 2026 at 3:00 PM
    var target = new Date(2026, 3, 17, 15, 0, 0); // month is 0-indexed (3 = April), 15 = 3 PM

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
let familias = [];

// Cargar familias desde API
fetch("https://api-invitacion.vercel.app/api/invitados")
    .then((response) => response.json())
    .then((data) => {
        familias = data;
    })
    .catch((error) => {
        console.error("Error al cargar familias:", error);
    });

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
const buscarBtn = document.getElementById("buscarBtn");

let currentMax = 0;
let familiaSeleccionada = null;

// Resetear estado UI
function resetState() {
    currentMax = 0;
    familiaSeleccionada = null;
    resultado.style.display = "none";
    invitadosInput.value = 0;
    invitadosInput.disabled = true;
    invitadosInput.max = "";
    mensaje.textContent = "Selecciona el apellido para ver el máximo.";
    submitBtn.disabled = true;
    errorEl.style.display = "none";
    successEl.style.display = "none";
}

// Buscar familia
buscarBtn.addEventListener("click", () => {
    const raw = apellidoInput.value.trim().toLowerCase();
    if (raw === "") {
        resetState();
        return;
    }

    const familiaObj = familias.find((f) => f.familia.toLowerCase() === raw);

    if (familiaObj) {
        familiaSeleccionada = familiaObj;
        currentMax = Number(familiaObj.num_invitados);

        maxValueEl.textContent = currentMax;
        resultado.style.display = "block";
        invitadosInput.disabled = false;
        invitadosInput.max = currentMax;

        mensaje.textContent = `Puedes confirmar hasta ${currentMax} invitado(s).`;
        submitBtn.disabled = false;
        errorEl.style.display = "none";
    } else {
        resetState();
        mensaje.textContent = "Esta familia no está en la lista de invitados.";
        errorEl.textContent = "La familia no está en la lista.";
        errorEl.style.display = "block";
    }
});

// Limitar invitados
invitadosInput.addEventListener("input", () => {
    let val = Number(invitadosInput.value);

    if (val > currentMax) {
        invitadosInput.value = currentMax;
        errorEl.textContent = `No puedes seleccionar más de ${currentMax} invitado(s).`;
        errorEl.style.display = "block";
        submitBtn.disabled = true;
    } else {
        errorEl.style.display = "none";
        submitBtn.disabled = false;
    }
});

// Botón +
incBtn.addEventListener("click", () => {
    let val = Number(invitadosInput.value);
    if (val < currentMax) val++;
    invitadosInput.value = val;
    invitadosInput.dispatchEvent(new Event("input"));
});

// Botón -
decBtn.addEventListener("click", () => {
    let val = Number(invitadosInput.value);
    if (val > 0) val--;
    invitadosInput.value = val;
    invitadosInput.dispatchEvent(new Event("input"));
});

// FUNCIÓN: generar invitación final bonita con QR incrustado
async function generarInvitacionFinal(qrData) {
    return new Promise((resolve, reject) => {
        const qrContainer = document.createElement("div");
        qrContainer.style.display = "none";
        document.body.appendChild(qrContainer);

        try {
            new QRCode(qrContainer, {
                text: qrData,
                width: 600,
                height: 600,
                colorDark: "#4b2e2e",
                colorLight: "#ffffff",
                correctLevel: QRCode.CorrectLevel.H,
            });

            // ⬇️ USAR CANVAS (NO IMG)
            const qrCanvas = qrContainer.querySelector("canvas");

            if (!qrCanvas) {
                document.body.removeChild(qrContainer);
                return reject(new Error("QR canvas no generado"));
            }

            const bg = new Image();
            bg.src = "pase.png";

            bg.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");

                canvas.width = bg.width;
                canvas.height = bg.height;

                ctx.drawImage(bg, 0, 0);

                const qrSize = 600;
                const x = (canvas.width - qrSize) / 2;
                const y = ((canvas.height - qrSize) / 3) * 2;

                ctx.drawImage(qrCanvas, x, y, qrSize, qrSize);

                document.body.removeChild(qrContainer);
                resolve(canvas.toDataURL("image/png"));
            };

            bg.onerror = () => {
                document.body.removeChild(qrContainer);
                reject(new Error("No se pudo cargar pase.png"));
            };
        } catch (error) {
            document.body.removeChild(qrContainer);
            reject(error);
        }
    });
}

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}
function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Enviar confirmación
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!familiaSeleccionada) {
        errorEl.textContent = "Selecciona una familia válida.";
        errorEl.style.display = "block";
        return;
    }

    const invitados = Number(invitadosInput.value);
    const codigo = familiaSeleccionada.codigo;

    // NO ASISTIRÁ
    if (invitados === 0) {
        await fetch("https://api-invitacion.vercel.app/api/confirmacion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                codigo,
                invitados_confirmados: 0,
                confirmacion: "no asistirá",
            }),
        });

        Swal.fire({
            icon: "info",
            title: "¡Gracias por avisar!",
            text: "Lamentamos que no puedas acompañarnos 🖤",
        });

        form.reset();
        resetState();
        return;
    }

    // SÍ ASISTIRÁ
    await fetch("https://api-invitacion.vercel.app/api/confirmacion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            codigo,
            invitados_confirmados: invitados,
            confirmacion: `Asistirá`,
        }),
    });

    Swal.fire({
        icon: "success",
        title: "¡Gracias por confirmar!",
        text: "Tu asistencia ha sido registrada.",
        timer: 2000,
    });

    // Generar invitación personalizada con QR
    let qrTexto = codigo;

    try {
        const imgURL = await generarInvitacionFinal(qrTexto);

        const fileName = `pase_${familiaSeleccionada.familia}.png`;

        // 🖥️ PC → descarga directa
        if (!isMobile()) {
            const link = document.createElement("a");
            link.href = imgURL;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // 📱 MÓVIL → SweetAlert
            Swal.fire({
                icon: "info",
                title: "Tu pase está listo 🎟️",
                text: "Guárdalo para presentarlo el día del evento",
                confirmButtonText: "Descargar pase",
                showCancelButton: false,
            }).then(async () => {
                // 🍎 iOS → compartir / guardar en Fotos
                if (isIOS()) {
                    const blob = await fetch(imgURL).then((res) => res.blob());
                    const file = new File([blob], fileName, {
                        type: "image/png",
                    });

                    if (navigator.share) {
                        await navigator.share({
                            files: [file],
                            title: "Pase de boda",
                            text: "Guarda tu pase 🎉",
                        });
                    } else {
                        Swal.fire({
                            icon: "warning",
                            title: "No compatible",
                            text: "Tu navegador no permite guardar automáticamente",
                        });
                    }
                }
                // 🤖 Android → descarga directa con botón
                else {
                    const link = document.createElement("a");
                    link.href = imgURL;
                    link.download = fileName;
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        }
    } catch (error) {
        console.error("Error al generar invitación:", error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo generar la invitación. Intenta nuevamente.",
        });
    }

    form.reset();
    resetState();
});

// Control de música
const musicBtn = document.getElementById("musicBtn");
const musicPlayer = document.getElementById("musicPlayer");
const musicIcon = document.getElementById("musicIcon");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
    if (isPlaying) {
        musicPlayer.pause();
        musicIcon.className = "fas fa-volume-mute";
        musicBtn.classList.remove("playing");
        isPlaying = false;
    } else {
        musicPlayer.play();
        musicIcon.className = "fas fa-volume-up";
        musicBtn.classList.add("playing");
        isPlaying = true;
    }
});
