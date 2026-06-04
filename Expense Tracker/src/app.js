const AddIncomeBtn = document.querySelector("#AddIncome");
const AddExpenseBtn = document.querySelector("#AddExpense");
const incomeForm = document.querySelector("#incomeForm"); //income form
const expenseForm = document.querySelector("#expenseForm"); //expense form
const closeBtn = document.querySelector("#closeBtn");
const closeExpense = document.querySelector("#closeExpense");
const inputIcome = document.querySelector("#inputIcome"); //user input add income
const incomeCatdgory = document.querySelector("#category"); //user select gatagory
const incomeDescription = document.querySelector("#incomeDescription"); //user input income description
const incomeDate = document.querySelector("#incomeDate"); //user income date
const addIcome = document.querySelector("#addIcome"); // add icome button

const inputExpense = document.querySelector("#inputExpense"); //expense amount
const expenseCategory = document.querySelector("#expenseCategory"); //expense category
const expenseDescription = document.querySelector("#expenseDescription"); //user input expense description
const expenseDate = document.querySelector("#expenseDate"); //user income date
const addExpense = document.querySelector("#addexpense"); // add icome button
const header = document.querySelector("#header");

//header
let lastScrollY = window.scrollY;
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  const navHeigth = header.offsetHeight;
  if (currentScroll > lastScrollY && currentScroll > 50) {
    header.style.transform = `translateY(-${navHeigth}px)`;
  } else {
    header.style.transform = `translateY(0)`;
  }
});

let monthlyIcome = 0;
let monthlyExpense = 0;

//--------------------------------------------------form close and open//
AddIncomeBtn.addEventListener("click", () => {
  incomeForm.classList.add("incomeform");
});

closeBtn.addEventListener("click", () => {
  incomeForm.classList.remove("incomeform");
});

AddExpenseBtn.addEventListener("click", () => {
  expenseForm.classList.add("expenseform");
});

closeExpense.addEventListener("click", () => {
  expenseForm.classList.remove("expenseform");
});

window.addEventListener("click", (e) => {
  if (e.target === incomeForm) {
    incomeForm.classList.remove("incomeform");
  } else if (e.target === expenseForm) {
    expenseForm.classList.remove("expenseform");
  }
});
//--------------------------------------------------form close and open//

//income form function//
let incomes = [];
let expenses = [];
const income = () => {
  const incomeAmount = parseFloat(inputIcome.value);
  const incomeCategory = incomeCatdgory.value;
  const incomeDes = incomeDescription.value;
  const incomedate = incomeDate.value;

  if (!incomeAmount || !incomeCategory || !incomeDes || !incomedate) {
    alert("Please fill in all required fields");
    return;
  }
  const newIncome = {
    id: incomes.length + 1,
    amount: incomeAmount,
    category: incomeCategory.charAt(0).toUpperCase() + incomeCategory.slice(1),
    description: incomeDes,
    date: incomedate,
    status: "success",
    type: "income",
  };
  incomeForm.classList.remove("incomeform");
  incomes.unshift(newIncome);
  monthlyIcome += incomeAmount;
  console.log(incomes);
  deshboardUpdate();
  updateTransaction();
  showNoti("Income added successfully");
};
//income form function//

//expense form function
const expense = () => {
  const expenseAmount = parseFloat(inputExpense.value);
  const expenseCate = expenseCategory.value;
  const expenseDes = expenseDescription.value;
  const expenseedate = expenseDate.value;

  if (!expenseAmount || !expenseCate || !expenseDes || !expenseedate) {
    alert("Please fill in all required fields");
    return;
  }
  const newExpense = {
    id: expenses.length + 1,
    amount: -expenseAmount,
    category: expenseCate.charAt(0).toUpperCase() + expenseCate.slice(1),
    description: expenseDes,
    date: expenseedate,
    status: "success",
    type: "expense",
  };
  expenseForm.classList.remove("expenseform");
  expenses.unshift(newExpense);
  monthlyExpense += expenseAmount;
  console.log(expenses);
  deshboardUpdate();
  updateTransaction();
  showNoti("Expense added successfully");
};
//expense form value

addIcome.addEventListener("click", () => {
  income();
});

addExpense.addEventListener("click", () => {
  expense();
});
//expense form function

//deshboard update
const deshboardUpdate = () => {
  document.querySelector("#monthlyicomeAmount").innerHTML =
    `${monthlyIcome.toLocaleString()}.00`;
  document.querySelector("#monthlyexpenseAmount").innerHTML =
    `${monthlyExpense.toLocaleString()}.00`;

  let spendingLimit = 1000;
  const useAmount = monthlyExpense;
  const percentage = (useAmount / spendingLimit) * 100;
  document.querySelector("#spending-limit").innerHTML =
    `${(spendingLimit - useAmount).toLocaleString()}.00`;

  document.querySelector("#progressBar").style.width =
    `${Math.min(percentage, 100)}%`;
};
//deshboard update

//update transaction
const updateTransaction = () => {
  const tbody = document.querySelector("table tbody");
  tbody.innerHTML = "";

  // combine income + expense
  const allTransactions = [...incomes, ...expenses];

  allTransactions.forEach((transaction) => {
    const row = document.createElement("tr");

    const formattedDate = new Date(transaction.date).toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      },
    );

    const amountDisplay =
      transaction.amount > 0
        ? `+${transaction.amount.toLocaleString()}.00`
        : `-${Math.abs(transaction.amount).toLocaleString()}.00`;

    // optional color for income vs expense
    const statusColor =
      transaction.type === "income" ? "bg-green-300" : "bg-red-300";

    row.className =
      "flex justify-between w-full border-b border-gray-200 pb-2 pt-2";

    row.innerHTML = `
      <td>${formattedDate}</td>
      <td>${transaction.category}</td>
      <td>${amountDisplay}</td>
      <td class="py-1 px-3 ${statusColor} rounded-md text-white">
        ${transaction.type}
      </td>
      <td>...</td>
    `;

    tbody.appendChild(row);
  });
};

const showNoti = (message, type = "success") => {
  const notidiv = document.createElement("div");

  notidiv.innerText = message;

  notidiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    z-index: 1000;
    background: ${type === "success" ? "green" : "red"};
    font-weight: 500;
  `;

  document.body.appendChild(notidiv);

  setTimeout(() => {
    document.body.removeChild(notidiv);
  }, 3000);
};
