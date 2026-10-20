const descInput = document.getElementById("descInput");
const amountInput = document.getElementById("amountInput");
const expenseForm = document.getElementById("expenseForm");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("productList");
const totalElement = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

function save() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

function render() {
  list.innerHTML = "";
  expenses.forEach((expense, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = expense.description + " ⇨ " + expense.amount.toLocaleString();
    li.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => {
      expenses.splice(index, 1);
      save();
      render();
    });
    li.appendChild(delBtn);

    list.appendChild(li);
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  totalElement.textContent = `${expenses.length} items ⬡ total: ${total.toLocaleString()}`;

  const largestExpense = expenses.reduce((largest, expense) => {
  if (largest === null || expense.amount > largest.amount) {
    return expense;
  }

  return largest;
  }, null);

  if (largestExpense) {
  totalElement.textContent += 
    ` | Largest: ${largestExpense.description} ⇨ ${largestExpense.amount.toLocaleString()}`; //template literal
  }
}

function addExpense() {
  const description = descInput.value.trim();
  const amountValue = amountInput.value.trim();
  if (description === "" || amountValue === "") return;

  const amount = Number(amountValue);
  if (Number.isNaN(amount) || amount <= 0 ) return;

  expenses.push({ description: description, amount: amount });
  save();
  render();
  descInput.value = "";
  amountInput.value = "";
}

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addExpense();
});

clearBtn.addEventListener("click", () => {
  if (!confirm("Delete all expenses?")) return;
  expenses = [];
  save();
  render();
});

render();