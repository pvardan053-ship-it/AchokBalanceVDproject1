const START = 350000000000;
const ADD_AMOUNT = 10000000;
const INTERVAL = 1000; // 1 վայրկյան

let balance = Number(localStorage.getItem("balance"));

if (!balance || balance < START) {
    balance = START;
    localStorage.setItem("balance", balance);
}

function formatNumber(number) {
    return number.toLocaleString("en-US").replace(/,/g, " ");
}

function showBalance() {
    document.getElementById("balance").innerText =
        formatNumber(balance);
}

function addAchoq() {

    balance += ADD_AMOUNT;

    localStorage.setItem("balance", balance);

    showBalance();

    addHistory();
}

function addHistory() {

    let history = JSON.parse(
        localStorage.getItem("history") || "[]"
    );

    history.unshift({
        amount: ADD_AMOUNT,
        date: new Date().toLocaleString("hy-AM")
    });

    // Պահում ենք վերջին 100 ավելացումները
    history = history.slice(0, 100);

    localStorage.setItem(
        "history",
        JSON.stringify(history)
    );

    renderHistory();
}

function renderHistory() {

    let history = JSON.parse(
        localStorage.getItem("history") || "[]"
    );

    let html = "";

    history.forEach(item => {

        html += `
            <div class="item">
                <span>${item.date}</span>

                <span class="green">
                    + ${formatNumber(item.amount)}
                </span>
            </div>
        `;

    });

    document.getElementById("historyList").innerHTML = html;
}

let seconds = 1;

function timer() {

    seconds--;

    if (seconds <= 0) {
        seconds = 1;
    }

    document.getElementById("timer").innerText =
        "00:00:" + String(seconds).padStart(2, "0");
}


// Սկզբնական ցուցադրում
showBalance();
renderHistory();
timer();


// Ամեն 1 վայրկյանը մեկ
setInterval(() => {

    addAchoq();

    seconds = 1;

    timer();

}, INTERVAL);


// Countdown
setInterval(() => {

    timer();

}, 1000);