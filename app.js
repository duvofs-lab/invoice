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
