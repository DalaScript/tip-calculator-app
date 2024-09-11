const bill = document.getElementById('bill');

const btnsLabel = document.querySelectorAll('.splitter__user-tip-label');

const customTipInput = document.getElementById('custom-tip-input');

const numOfPeople = document.getElementById('num-of-people');

const tipResult = document.getElementById('tip-result');
const sumResult = document.getElementById('sum-result');

const resetBtn = document.getElementById('reset-btn');


let billPer = 0;
let tipPer = 0;
let numOfPer = 0;

bill.addEventListener('input', () => {
    billPer = bill.value;
    checkIfZero(bill);
    checkValues();
});

btnsLabel.forEach((label) => {
    label.addEventListener('click', () => {
        if(!label.classList.contains('splitter__user-tip-label--active')){
            btnsLabel.forEach(label => label.classList.remove('splitter__user-tip-label--active'));
            label.classList.add('splitter__user-tip-label--active');
            const parentEl = label.parentElement;
            const btnInputEl = parentEl.querySelector('.splitter__user-tip-input');

            tipPer = btnInputEl.value;
            checkValues();
        }
    });
}); 

customTipInput.addEventListener('click', () => {
    btnsLabel.forEach((label) => {
        if(label.classList.contains('splitter__user-tip-label--active')) {
            label.classList.remove('splitter__user-tip-label--active');
        }
    })
});

customTipInput.addEventListener('input', () => {
    tipPer = customTipInput.value;
    checkValues();
});

numOfPeople.addEventListener('input', () => {
    numOfPer = customTipInput.value;
    checkIfZero(numOfPeople);
    checkValues();
});

resetBtn.addEventListener('click', () => {
    bill.value = "";
    btnsLabel.forEach((label) => {
        if(label.classList.contains("splitter__user-tip-label--active")) {
            label.classList.remove("splitter__user-tip-label--active");
        }
    });

    if(customTipInput.value !== "") {
        customTipInput.value = "";
    }
    tipPer = 0;
    numOfPeople.value = "";
    tipResult.innerText = "0.00";
    sumResult.innerText = "0.00";

    resetBtn.classList.remove('splitter__reset-btn--active');
});

const checkValues = () => {
    if(bill.value !== "" && numOfPeople.value !== "" && tipPer > 0) {
        let tipAmount = bill.value / 100 * tipPer;
        let tipAmountPerPerson = tipAmount / numOfPeople.value;
        let totalPerPerson = (parseInt(billPer) + tipAmount) / parseInt(numOfPeople.value);

        tipResult.innerText = tipAmountPerPerson.toFixed(2);
        sumResult.innerText = totalPerPerson.toFixed(2);
        resetBtn.classList.add('splitter__reset-btn--active');
    }
}

const checkIfZero = (el) => {
    const parentEl = el.parentElement;
    const opaEl = parentEl.parentElement
    const ifZeroEl = opaEl.querySelector('.splitter__if-zero');
    if(el.value == 0) {
        ifZeroEl.classList.add('splitter__if-zero--active');
    }else if(el.value !== 0 && ifZeroEl.classList.contains('splitter__if-zero--active')){
        ifZeroEl.classList.remove('splitter__if-zero--active');
    }
}