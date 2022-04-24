"use strict";
// Elements Select
let addContactBtn = document.querySelector("#addContact");
let form = document.querySelector("form");
let firstname = document.querySelector("#firstname");
let lastname = document.querySelector("#lastname");
let cellphone = document.querySelector("#cellphone");
let submitBtn = document.querySelector("#submit");
let phonebookList = document.querySelector("#list");
// Handlers
const addContactFormCollapse = () => {
    form === null || form === void 0 ? void 0 : form.classList.toggle("hidden");
};
const setValueHandler = (e, el) => {
    let target = e === null || e === void 0 ? void 0 : e.target;
    el.value = target === null || target === void 0 ? void 0 : target.value;
};
const getList = () => {
    let list = localStorage.getItem("list");
    if (!list) {
        return [];
    }
    else {
        return JSON.parse(list);
    }
};
const submitHandler = () => {
    let list = getList();
    let id;
    if (list.length === 0) {
        id = 1;
    }
    else {
        id = list[list.length - 1].id + 1;
    }
    list.push({ id: id, firstname: firstname === null || firstname === void 0 ? void 0 : firstname.value, lastname: lastname === null || lastname === void 0 ? void 0 : lastname.value, phone: cellphone === null || cellphone === void 0 ? void 0 : cellphone.value });
    localStorage.setItem("list", JSON.stringify(list));
    if (firstname) {
        firstname.value = "";
        firstname.focus();
    }
    if (lastname)
        lastname.value = "";
    if (cellphone)
        cellphone.value = "";
    renderList();
};
const renderList = () => {
    let list = getList();
    let html = `
  <li class="flex justify-between py-2 font-medium">
    <span>نام و نام خانوادگی</span>
    <span>شماره تماس</span>
  </li>`;
    list.map((item, i) => (html += `<li class="flex justify-between py-2">
                  <span>${item === null || item === void 0 ? void 0 : item.firstname} ${item === null || item === void 0 ? void 0 : item.lastname}</span>
                  <span>${item === null || item === void 0 ? void 0 : item.phone}</span>
                </li>`));
    if (phonebookList)
        phonebookList.innerHTML = html;
};
renderList();
// Listeners
window.addEventListener("load", () => {
    firstname === null || firstname === void 0 ? void 0 : firstname.focus();
});
addContactBtn === null || addContactBtn === void 0 ? void 0 : addContactBtn.addEventListener("click", addContactFormCollapse);
form === null || form === void 0 ? void 0 : form.addEventListener("submit", (e) => e.preventDefault());
firstname === null || firstname === void 0 ? void 0 : firstname.addEventListener("input", (e) => setValueHandler(e, firstname));
lastname === null || lastname === void 0 ? void 0 : lastname.addEventListener("input", (e) => setValueHandler(e, lastname));
cellphone === null || cellphone === void 0 ? void 0 : cellphone.addEventListener("input", (e) => setValueHandler(e, cellphone));
submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", submitHandler);
