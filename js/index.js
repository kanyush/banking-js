const accountListTag = document.querySelector(".account-list");
const addAccountBtn = document.querySelector("#add");
const doubleBtn = document.querySelector("#double");
const inputFrom = document.querySelector("#input-from");
const inputTo = document.querySelector("#input-to");
const messageTag = document.querySelector(".message__content");
const billionBtn = document.querySelector("#check-billionaire")

let accounts = [];
let lastId = 1;

addAccountBtn.onclick = () => {
  const randomBalance = random(1000000, 10000000);
  accounts.push({ id: lastId, balance: randomBalance });
  messageTag.textContent = `#${lastId} баланс добавлен`;
  updateAccountList();
  lastId++;
};

doubleBtn.onclick = () => {
  accounts = accounts.map((oldAcc) => {
    return {
      ...oldAcc,
      balance: oldAcc.balance * 2
    };
  });
  messageTag.textContent = `Счета удвоены!`;
  updateAccountList();
};

billionBtn.onclick = () => {
  const hasBillionaire = accounts.some((acc) => acc.balance >= 1000000000)
  if(hasBillionaire) {
    messageTag.textContent = `Миллиардер найден!`;
  } else {
    messageTag.textContent = `Миллиардер не найден`;
  }
}

const onFilterAccounts = () => {
  const min = +inputFrom.value;
  const max = +inputTo.value >= min ? +inputTo.value : Infinity;
  const filteredAccounts = accounts.filter(
    (acc) => acc.balance >= min && acc.balance <= max
  );
  updateAccountList(filteredAccounts);
};

inputFrom.oninput = onFilterAccounts;

inputTo.oninput = onFilterAccounts;

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createAccount(id, balance) {
  const accountTag = document.createElement("div");
  accountTag.classList.add("account");

  const accountIdTag = document.createElement("span");
  accountIdTag.classList.add("account__id");
  accountIdTag.textContent = id;

  const accountBalanceTag = document.createElement("span");
  accountBalanceTag.classList.add("account__balance");
  accountBalanceTag.textContent = balance;

  const accountBtn = document.createElement("button");
  accountBtn.classList.add("account__btn");
  accountBtn.textContent = "✖︎";

  accountTag.append(accountIdTag, accountBalanceTag, accountBtn);
  return accountTag;
}

function updateAccountList(data = accounts) {
  accountListTag.innerHTML = "";
  data.forEach((acc) => {
    accountListTag.append(createAccount(acc.id, acc.balance));
  });
}
