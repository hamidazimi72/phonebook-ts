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
const deleteItemHandler = (id) => {
    let list = getList();
    let newList = list.filter((item) => {
        return (item === null || item === void 0 ? void 0 : item.id) != id;
    });
    localStorage.setItem("list", JSON.stringify(newList));
    renderList();
};
const renderList = () => {
    let list = getList();
    let html = `
  <li class="grid grid-cols-4 py-2 font-medium">
    <span class="col-span-2">نام و نام خانوادگی</span>
    <span class="col-span-1 text-center">شماره تماس</span>
    <span class="col-span-1 text-center">عملیات</span>
  </li>`;
    list.map((item, i) => (html += `<li class="grid grid-cols-4 py-2 item-list">
                  <span class="col-span-2">${item === null || item === void 0 ? void 0 : item.firstname} ${item === null || item === void 0 ? void 0 : item.lastname}</span>
                  <span class="col-span-1 text-center">${item === null || item === void 0 ? void 0 : item.phone}</span>
                  <span id="item${item === null || item === void 0 ? void 0 : item.id}" class="col-span-1 text-red-600 text-center cursor-pointer delete-item">حذف</span>
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
phonebookList === null || phonebookList === void 0 ? void 0 : phonebookList.addEventListener("click", (e) => {
    let target = e.target;
    if (target === null || target === void 0 ? void 0 : target.classList.contains("delete-item")) {
        let id = +(target === null || target === void 0 ? void 0 : target.id.substr(4));
        deleteItemHandler(id);
        renderList();
    }
});
