function addItem() {
  const row = document.createElement("tr");

  row.innerHTML = `
    <td><input placeholder="Description"></td>
    <td><input type="number" value="1" class="qty"></td>
    <td><input type="number" value="0" class="rate"></td>
    <td class="amount">$0.00</td>
  `;

  document.getElementById("items").appendChild(row);
}

function calculate() {
  let subtotal = 0;

  document.querySelectorAll("#items tr").forEach(row => {
    const qty = row.querySelector(".qty")?.value || 0;
    const rate = row.querySelector(".rate")?.value || 0;
    const amount = qty * rate;
    row.querySelector(".amount").innerText = `$${amount.toFixed(2)}`;
    subtotal += amount;
  });

  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("total").innerText = `$${subtotal.toFixed(2)}`;
}

document.addEventListener("input", calculate);

function downloadPDF() {
  window.print();
}
