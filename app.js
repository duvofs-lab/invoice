let currency = "$";
let discountIsPercent = true;
let taxIsPercent = true;

function format(n) {
  return currency + n.toFixed(2);
}

function addItem() {
  const row = document.createElement("tr");
  row.className = "item-row";
  row.innerHTML = `
    <td><input></td>
    <td><input type="number" class="qty" value="1"></td>
    <td><input type="number" class="rate" value="0"></td>
    <td class="amount">$0.00</td>
  `;
  document.getElementById("items").appendChild(row);
}

function toggleType(type) {
  if (type === "discount") {
    discountIsPercent = !discountIsPercent;
    document.getElementById("discountType").innerText = discountIsPercent ? "%" : currency;
  } else {
    taxIsPercent = !taxIsPercent;
    document.getElementById("taxType").innerText = taxIsPercent ? "%" : currency;
  }
  calculate();
}

function calculate() {
  let subtotal = 0;

  document.querySelectorAll(".item-row").forEach(r => {
    const q = +r.querySelector(".qty").value || 0;
    const rate = +r.querySelector(".rate").value || 0;
    const amt = q * rate;
    r.querySelector(".amount").innerText = format(amt);
    subtotal += amt;
  });

  let discount = +discount.value || 0;
  let tax = +taxInput.value || 0;

  discount = discountIsPercent ? subtotal * discount / 100 : discount;
  tax = taxIsPercent ? (subtotal - discount) * tax / 100 : tax;

  const shipping = +shippingInput.value || 0;
  const total = subtotal - discount + tax + shipping;
  const paid = +paidInput.value || 0;

  subtotalEl.innerText = format(subtotal);
  totalEl.innerText = format(total);
  balanceEl.innerText = format(total - paid);

  saveData();
}

function downloadPDF() {
  document.body.classList.add("pdf-mode");
  html2pdf().from(document.getElementById("invoice-area")).save().then(() => {
    document.body.classList.remove("pdf-mode");
  });
}

/* Currency */
currencySelect.onchange = e => {
  currency = e.target.value;
  calculate();
};

/* LocalStorage */
function saveData() {
  localStorage.setItem("invoiceData", document.body.innerHTML);
}

function loadData() {
  const data = localStorage.getItem("invoiceData");
  if (data) document.body.innerHTML = data;
}

document.addEventListener("input", calculate);
window.onload = loadData;
