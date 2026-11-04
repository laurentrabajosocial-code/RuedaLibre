const reservationForm = document.querySelector("#formulario-reserva");

if (reservationForm) {
    const dateInput = document.querySelector("#fecha");
    const alertBox = document.querySelector("#mensaje-formulario");
    const modalElement = document.querySelector("#modal-confirmacion");
    const summary = document.querySelector("#resumen-reserva");

    const today = new Date();
    const localDate = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");
    dateInput.min = localDate;

    reservationForm.addEventListener("invalid", () => {
        reservationForm.classList.add("was-validated");
    }, true);

    reservationForm.addEventListener("submit", (event) => {
        event.preventDefault();
        reservationForm.classList.add("was-validated");

        if (!reservationForm.reportValidity()) {
            return;
        }

        const values = new FormData(reservationForm);
        const details = [
            `Fecha: ${values.get("fecha")}`,
            `Bicicleta: ${reservationForm.querySelector("#bicicleta").selectedOptions[0].text}`,
            `Plan: ${reservationForm.querySelector("#plan").selectedOptions[0].text}`,
            `Cantidad: ${values.get("cantidad")}`,
            `Horario: ${values.get("horario")}`,
        ];

        summary.replaceChildren(...details.map((detail) => {
            const item = document.createElement("li");
            item.textContent = detail;
            return item;
        }));
        alertBox.textContent = "Formulario validado. Recuerda que esta demostración no envía ni guarda la solicitud.";
        alertBox.classList.remove("d-none");

        bootstrap.Modal.getOrCreateInstance(modalElement).show();
    });
}
