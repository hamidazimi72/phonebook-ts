// Elements Select
let addContactBtn = document.querySelector("#addContact");
let form = document.querySelector<HTMLInputElement>("form");
let firstname = document.querySelector<HTMLInputElement>("#firstname");
let lastname = document.querySelector<HTMLInputElement>("#lastname");
let cellphone = document.querySelector<HTMLInputElement>("#cellphone");
let submitBtn = document.querySelector("#submit");
let phonebookList = document.querySelector("#list");

// Handlers
const addContactFormCollapse = () => {
  form?.classList.toggle("hidden");
};

const setValueHandler = (e: any, el: any) => {
  let target = e?.target as HTMLInputElement;
  el.value = target?.value;
};

const getList = () => {
  let list: string | null = localStorage.getItem("list");

  if (!list) {
    return [];
  } else {
    return JSON.parse(list);
  }
};

const submitHandler = () => {
  let list: any[] = getList();
  let id: number;

  if (list.length === 0) {
    id = 1;
  } else {
    id = list[list.length - 1].id + 1;
  }

  list.push({ id: id, firstname: firstname?.value, lastname: lastname?.value, phone: cellphone?.value });
  localStorage.setItem("list", JSON.stringify(list));

  if (firstname) {
    firstname.value = "";
    firstname.focus();
  }
  if (lastname) lastname.value = "";
  if (cellphone) cellphone.value = "";

  renderList();
};

const renderList = () => {
  let list = getList();
  let html = `
  <li class="flex justify-between py-2 font-medium">
    <span>نام و نام خانوادگی</span>
    <span>شماره تماس</span>
  </li>`;
  list.map(
    (item: any, i: number) =>
      (html += `<li class="flex justify-between py-2">
                  <span>${item?.firstname} ${item?.lastname}</span>
                  <span>${item?.phone}</span>
                </li>`)
  );
  if (phonebookList) phonebookList.innerHTML = html;
};

renderList();

// Listeners
window.addEventListener("load", () => {
  firstname?.focus();
});

addContactBtn?.addEventListener("click", addContactFormCollapse);
form?.addEventListener("submit", (e) => e.preventDefault());
firstname?.addEventListener("input", (e) => setValueHandler(e, firstname));
lastname?.addEventListener("input", (e) => setValueHandler(e, lastname));
cellphone?.addEventListener("input", (e) => setValueHandler(e, cellphone));
submitBtn?.addEventListener("click", submitHandler);
