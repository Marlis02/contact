const contactForm = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const phoneInput = document.querySelector("#phone");
const addButton = document.querySelector("#btn");
const contactList = document.querySelector("#contactList");
const modal = document.querySelector("#myModal");
const span = document.querySelector(".close");
const newNameInput = document.querySelector("#newName");
const newPhoneInput = document.querySelector("#newPhone");
const saveChangesButton = document.querySelector("#saveChanges");

let contacts = [];

span.addEventListener("click", closeModal);

function closeModal() {
  modal.style.display = "none";
}

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const name = nameInput.value;
  const phone = phoneInput.value;

  if (name && phone) {
    contacts.push({ name, phone });
    saveContactsToLocalStorage();
    displayContacts();
    contactForm.reset();
  }
});

function displayContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const contactItem = document.createElement("li");
    contactItem.innerHTML = `
            <div class="contact">
                <div class="info">
                    <h3>${contact.name}</h3>
                    <p>${contact.phone}</p>
                </div>
                <div class="actions">
                    <button class="edit" data-index="${index}">Edit</button>
                    <button class="delete" data-index="${index}">Delete</button>
                </div>
            </div>
        `;
    contactList.appendChild(contactItem);
  });

  const editButtons = document.querySelectorAll(".edit");
  const deleteButtons = document.querySelectorAll(".delete");

  editButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      const contact = contacts[index];
      openEditModal(contact, index);
    });
  });

  deleteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      contacts.splice(index, 1);
      saveContactsToLocalStorage();
      displayContacts();
    });
  });
}

function openEditModal(contact, index) {
  modal.style.display = "block";
  newNameInput.value = contact.name;
  newPhoneInput.value = contact.phone;

  saveChangesButton.addEventListener("click", () => {
    const newName = newNameInput.value;
    const newPhone = newPhoneInput.value;

    if (newName && newPhone) {
      contacts[index].name = newName;
      contacts[index].phone = newPhone;
      saveContactsToLocalStorage();
      displayContacts();
      closeModal();
    }
  });
}

function saveContactsToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
}

function loadContactsFromLocalStorage() {
  const storedContacts = localStorage.getItem("contacts");
  if (storedContacts) {
    contacts = JSON.parse(storedContacts);
    displayContacts();
  }
}

loadContactsFromLocalStorage();
