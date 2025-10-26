let dataContacts = [
  {
    id: 1,
    fullName: "Budi Setiawan",
    phone: "+62-423-3245-578",
    email: "budi233@example.com",
    address: "Solo",
  },
  {
    id: 2,
    fullName: "Bambang Satria",
    phone: "+62-1244-356-963",
    email: "bambtria877@example.com",
    address: "Lampung",
  },
  {
    id: 3,
    fullName: "Hasan Putra",
    phone: "+62-9455-3770-023",
    email: "agusptrr1@example.com",
    address: "Tangerang",
  },
  {
    id: 4,
    fullName: "Muhammad Abdul",
    phone: "+62-9995-9943-774",
    email: "mhmabdul200@example.com",
    address: "Jakarta",
  },
  {
    id: 5,
    fullName: "Pratama Faiz",
    phone: "+62-1194-4975-995",
    email: "pratfaizzz22@example.com",
    address: "Yogyakarta",
  },
];

function renderContacts(contacts) {
  const appElement = document.getElementById("contacts");
  appElement.innerHTML = `<ul class="space-y-4">
    ${contacts.map((contact) => renderContact(contact)).join("")}
  </ul>`;
}

function renderContact(contact) {
  return `<li class="p-2 border border-solid-black">
    <h2>${contact.fullName}</h2>
    <p>${contact.phone}</p>
    <p>${contact.email}</p>
    <p>${contact.address}</p>
  </li>`;
}

function addContact(contacts, { fullName = null, email = null, phone = null }) {
  const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;

  const newContact = {
    id: newId,
    fullName,
    phone,
    email,
  };

  const updatedContacts = [...contacts, newContact];

  dataContacts = updatedContacts;

  renderContacts(updatedContacts);
}

function getContactById(id) {
  return dataContacts.find((contact) => contact.id === id);
}

function deleteContactById(contacts, id) {
  const updatedContacts = contacts.filter((contact) => contact.id !== id);

  dataContacts = updatedContacts;
}

function editContactById(contacts, id, updatedContact) {
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return { ...contact, ...updatedContact };
    }
    return contact;
  });
  dataContacts = updatedContacts;
}

const addContactFormElement = document.getElementById("add-contact-form");
console.log(addContactFormElement);

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);
  console.log(formData);

  const newContactData = {
    fullName: formData.get("fullname").toString(),
    phone: formData.get("phone").toString(),
    address: formData.get("address").toString(),
    email: formData.get("email").toString(),
  };

  console.log(newContactData);

  addContact(dataContacts, newContactData);
});

// --------------------------------------------------------------

renderContacts(dataContacts);

// addContact(
//   dataContacts,
//   "Dimas Aditya",
//   "+62-888-3333-222",
//   "dimasaditya@example.com",
//   "Bandung"
// );

// deleteContact(dataContacts, 2);

// const searchResult = searchContacts(dataContacts, "bud");
// showContacts(searchResult);

// editContact(dataContacts, 3, {
//   fullName: "Siti Rahmawati",
//   phone: "+62-3444-3444-099",
// });
