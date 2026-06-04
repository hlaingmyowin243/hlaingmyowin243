const nameerror = document.querySelector("#nameerror");
const phoneerror = document.querySelector("#phoneerror");
const emailerror = document.querySelector("#emailerror");
const messageerror = document.querySelector("#messageerror");
const fixerror = document.querySelector("#fixerror");

const userName = document.querySelector("#userName");
const PhoneNumber = document.querySelector("#PhoneNumber");
const email = document.querySelector("#email");
const message = document.querySelector("#message");
const submitBtn = document.querySelector("#submitBtn");

const userNameinputFunction = () => {
  const name = userName.value;
  if (name.length < 5) {
    nameerror.innerHTML = "Name Required";
    return false;
  } else if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
    nameerror.innerHTML = "Name Required";
    return false;
  } else {
    nameerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
};

const PhoneNumberInputFunction = () => {
  const Number = PhoneNumber.value;
  if (Number.length == 0) {
    phoneerror.innerHTML = "Phone No requried";
    return false;
  } else if (Number.length !== 10) {
    phoneerror.innerHTML = "Phone No mush be 10 digits";
    return false;
  } else {
    phoneerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
};

const emailFunction = () => {
  const mail = email.value;
  if (mail.length == 0) {
    emailerror.innerHTML = "Email requried";
    return false;
  } else if (!mail.includes("@") || !mail.includes(".")) {
    emailerror.innerHTML = "Invaid email";
    return false;
  } else {
    emailerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
};

const messageFunction = () => {
  const textMessage = message.value;
  let requried = 30;
  let left = requried - textMessage.length;
  if (left > 0) {
    messageerror.innerHTML = left + "More characters required";
    return false;
  } else if ((left = 30)) {
    messageerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    return true;
  }
};

userName.addEventListener("keyup", () => {
  userNameinputFunction();
});

PhoneNumber.addEventListener("keyup", () => {
  PhoneNumberInputFunction();
});

email.addEventListener("keyup", () => {
  emailFunction();
});

message.addEventListener("keyup", () => {
  messageFunction();
});

submitBtn.addEventListener("click", () => {
  if (
    !userNameinputFunction() ||
    !PhoneNumberInputFunction() ||
    !emailFunction() ||
    !messageFunction()
  ) {
    fixerror.innerHTML = "Please Fix error";
    setTimeout(() => {
      fixerror.innerHTML = "";
    }, 3000);
  } else {
    fixerror.innerHTML = '<i class="fa-solid fa-circle-check"></i>';
    setTimeout(() => {
      fixerror.innerHTML = "";
    }, 3000);
  }
});
