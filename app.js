let currency = "$";

document.getElementById("currency").addEventListener("change", e => {
  currency = e.target.value;
  calculate();
});

function addItem() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input></td>
    <td><input type="number" value="1" class="qty"></td>
    <td><input type="number" value="0" class="rate"></td>
    <td class="amount">${currency}0.00</td>
  `;
  document.getElementById("items").appendChild(tr);
}

function calculate() {
  let subtotal = 0;
  document.querySelectorAll("#items tr").forEach(row => {
    const q = +row.querySelector(".qty").value || 0;
    const r = +row.querySelector(".rate").value || 0;
    const amt = q * r;
    row.querySelector(".amount").innerText = currency + amt.toFixed(2);
    subtotal += amt;
  });

  const tax = subtotal * (+tax.value / 100);
  const total = subtotal + tax;
  const paid = +paid.value || 0;

  subtotalEl.innerText = currency + subtotal.toFixed(2);
  totalEl.innerText = currency + total.toFixed(2);
  balanceEl.innerText = currency + (total - paid).toFixed(2);
}

document.addEventListener("input", calculate);

function downloadPDF() {
  html2pdf().from(document.getElementById("invoice-area")).save("invoice.pdf");
}

/* Logo upload */
logoInput.onchange = e => {
  const img = logoPreview;
  img.src = URL.createObjectURL(e.target.files[0]);
  img.style.display = "block";
  logoText.style.display = "none";
};

let currency = "$";

const modes = {
  tax: "percent",
  discount: "percent",
  shipping: "percent"
};

currencySelect.onchange = e => {
  currency = e.target.value;
  calculate();
};

function toggleMode(type) {
  modes[type] = modes[type] === "percent" ? "amount" : "percent";
  document.getElementById(type + "Type").innerText =
    modes[type] === "percent" ? "%" : currency;
  calculate();
}

function addItem() {
  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input></td>
    <td><input type="number" value="1" class="qty"></td>
    <td><input type="number" value="0" class="rate"></td>
    <td class="amount">${currency}0.00</td>
  `;
  items.appendChild(tr);
}

function calculate() {
  let subtotal = 0;

  document.querySelectorAll("#items tr").forEach(r => {
    const q = +r.querySelector(".qty").value || 0;
    const rate = +r.querySelector(".rate").value || 0;
    const amt = q * rate;
    r.querySelector(".amount").innerText = currency + amt.toFixed(2);
    subtotal += amt;
  });

  let tax = +taxVal.value || 0;
  let discount = +discountVal.value || 0;
  let shipping = +shippingVal.value || 0;

  tax = modes.tax === "percent" ? subtotal * tax / 100 : tax;
  discount = modes.discount === "percent" ? subtotal * discount / 100 : discount;
  shipping = modes.shipping === "percent" ? subtotal * shipping / 100 : shipping;

  const total = subtotal + tax - discount + shipping;
  const paidAmt = +paid.value || 0;

  subtotalEl.innerText = currency + subtotal.toFixed(2);
  totalEl.innerText = currency + total.toFixed(2);
  balanceEl.innerText = currency + (total - paidAmt).toFixed(2);
}

document.addEventListener("input", calculate);

function downloadPDF() {
  html2pdf().from(invoice-area).save("invoice.pdf");
}

/* Logo upload */
logoInput.onchange = e => {
  logoPreview.src = URL.createObjectURL(e.target.files[0]);
  logoPreview.style.display = "block";
  logoText.style.display = "none";
};
