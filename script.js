const bill = document.getElementById('billAmount');
const people = document.getElementById('peopleCount');
const customTip = document.getElementById('customTip');
const tipAmount = document.getElementById('tipAmount');
const totalPerPerson = document.getElementById('totalPerPerson');
const totalBill = document.getElementById('totalBill');

let tipPercent = 18;

// Calculate function
function calc() {
    const b = parseFloat(bill.value) || 0;
    const p = parseInt(people.value) || 1;
    const tip = (b * tipPercent) / 100;
    const total = b + tip;
    
    tipAmount.textContent = `$${(tip / p).toFixed(2)}`;
    totalPerPerson.textContent = `$${(total / p).toFixed(2)}`;
    totalBill.textContent = `$${total.toFixed(2)}`;
}

// Tip buttons
document.querySelectorAll('.tip-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tipPercent = parseFloat(btn.dataset.tip);
        customTip.value = '';
        calc();
    };
});

// Custom tip
customTip.oninput = () => {
    const val = parseFloat(customTip.value);
    if (!isNaN(val) && val >= 0) {
        tipPercent = val;
        document.querySelectorAll('.tip-btn').forEach(b => b.classList.remove('active'));
        calc();
    }
};

// People buttons
document.getElementById('decrementPeople').onclick = () => {
    if (people.value > 1) people.value--;
    calc();
};
document.getElementById('incrementPeople').onclick = () => {
    people.value++;
    calc();
};

// Input events
bill.oninput = calc;
people.oninput = calc;

// Reset button
document.getElementById('resetBtn').onclick = () => {
    bill.value = '50';
    people.value = '2';
    tipPercent = 18;
    customTip.value = '';
    document.querySelectorAll('.tip-btn').forEach(btn => {
        if (parseFloat(btn.dataset.tip) === 18) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    calc();
};

calc();