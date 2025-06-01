const currencyList = {
  USD: 'us',
  EUR: 'eur',
  INR: 'in',
  GBP: 'gb',
  JPY: 'jp',
};

const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const resultDiv = document.getElementById('result');
const toggleBtn = document.getElementById('toggle-theme');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');

function populateCurrencyOptions() {
  for (let code in currencyList) {
    const option1 = new Option(code, code);
    const option2 = new Option(code, code);
    fromSelect.add(option1);
    toSelect.add(option2);
  }
  fromSelect.value = 'USD';
  toSelect.value = 'EUR';
}

function updateFlag(select, flagImg) {
  const code = select.value;
  flagImg.src = `flags/${currencyList[code]}.svg`;
}

function convertCurrency() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "Please enter a valid amount.";
    return;
  }

  fetch(`https://v6.exchangerate-api.com/v6/671d0d657bc628cdc5975b5c/pair/${from}/${to}`)
    .then(res => res.json())
    .then(data => {
      const rate = data.conversion_rate;
      const converted = (rate * amount).toFixed(4);
      resultDiv.textContent = `${amount} ${from} = ${converted} ${to}`;
    })
    .catch(() => {
      resultDiv.textContent = "Error fetching conversion rate.";
    });
}


function updateCursor(e) {
  document.documentElement.style.setProperty('--x', `${e.clientX}px`);
  document.documentElement.style.setProperty('--y', `${e.clientY}px`);
}

function toggleDarkMode() {
  document.body.classList.toggle('dark');
}

fromSelect.addEventListener('change', () => {
  updateFlag(fromSelect, fromFlag);
  convertCurrency();
});

toSelect.addEventListener('change', () => {
  updateFlag(toSelect, toFlag);
  convertCurrency();
});

amountInput.addEventListener('input', convertCurrency);
toggleBtn.addEventListener('click', toggleDarkMode);

populateCurrencyOptions();
updateFlag(fromSelect, fromFlag);
updateFlag(toSelect, toFlag);
