function formatCurrency(value) {

    return new Intl.NumberFormat("it-IT", {
        style: "currency",
        currency: "EUR"
    }).format(value);
}


function formatNumber(value) {

    return new Intl.NumberFormat("it-IT")
        .format(value);
}


function calculatePercentage(current, total) {

    if (!total || total <= 0) {
        return 0;
    }

    return Math.min(
        100,
        Math.max(
            0,
            (current / total) * 100
        )
    );
}


function getDaysRemaining(date) {

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const target = new Date(date);

    target.setHours(0, 0, 0, 0);

    const difference =
        target.getTime() - today.getTime();

    return Math.max(
        0,
        Math.ceil(difference / 86400000)
    );
}


function formatDate(date) {

    return new Intl.DateTimeFormat("it-IT", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date));
}


function escapeHTML(value) {

    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
