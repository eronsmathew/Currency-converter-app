const fromCurrency = document.getElementById('from-currency');
const fromAmount = document.getElementById('from-amount');
const toCurrency = document.getElementById('to-currency');
const toAmount = document.getElementById('to-amount');
const rateEl= document.getElementById('rate');
const exchange = document.getElementById('exchange');

//invoking the event listener method
fromCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);
toCurrency.addEventListener('change', calculate);
toAmount.addEventListener('input', calculate);

exchange.addEventListener('click', () =>{
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    calculate();
});

function calculate(){
    const fromCurrency = fromCurrency.value;
    const toCurrency = toCurrency.value;
    GET(`https://open.exchangerate-api.com/v6/latest/${fromCurrency}`)
    .then(res => res.json())
    .then(res => {
        const rate = res.rates[toCurrency];
        rateEl.innerText = `1 ${fromCurrency} = ${rate} ${toCurrency}`;
        toAmount.value = (fromAmount.value * rate).toFixed(2);
    })
}
calculate();