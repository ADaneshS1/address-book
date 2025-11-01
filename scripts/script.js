let dataContacts = JSON.parse(localStorage.getItem("contacts")) || [
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

// ✅ Sort default A–Z
dataContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));

function saveToLocalStorage() {
  localStorage.setItem("contacts", JSON.stringify(dataContacts));
}

function renderContacts(contacts) {
  const appElement = document.getElementById("contacts");

  const searchParams = new URLSearchParams(window.location.search);
  const query = searchParams.get("q");

  const queryElement = document.getElementById("q");
  queryElement.value = query || "";

  const filteredContacts = query ? searchContacts(contacts, query) : contacts;

  appElement.innerHTML = `
    <ul class="space-y-4">
      ${filteredContacts.map((contact) => renderContact(contact)).join("")}
    </ul>
  `;

  // 🔴 tombol delete
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      deleteContactById(id);
    });
  });

  // 🟢 tombol edit
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const id = Number(e.target.dataset.id);
      loadContactToForm(id);
    });
  });
}

function renderContact(contact) {
  return `
    <li class="p-4 border rounded-lg shadow-sm bg-white">
      <div class="flex justify-between items-start">
        <div>
          <h2 class="font-semibold text-lg">${contact.fullName}</h2>
          <p class="text-gray-600">${contact.phone}</p>
          <p class="text-gray-600">${contact.email}</p>
          <p class="text-gray-600">${contact.address}</p>
        </div>
        <div class="flex flex-col gap-2">
          <button 
            class="edit-btn bg-yellow-500 hover:bg-yellow-600 text-white text-sm px-3 py-1 rounded" 
            data-id="${contact.id}">
            Edit
          </button>
          <button 
            class="delete-btn bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded" 
            data-id="${contact.id}">
            Delete
          </button>
        </div>
      </div>
    </li>
  `;
}

function searchContacts(contacts, keyword) {
  return contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(keyword.toLowerCase())
  );
}

function addContact(contacts, contact) {
  const newId = contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
  const updatedContacts = [...contacts, { id: newId, ...contact }];

  updatedContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));

  dataContacts = updatedContacts;
  saveToLocalStorage();
  renderContacts(updatedContacts);
}

function deleteContactById(id) {
  dataContacts = dataContacts.filter((contact) => contact.id !== id);
  dataContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
  saveToLocalStorage();
  renderContacts(dataContacts);
}

// 🟢 Fungsi untuk load data ke form edit
function loadContactToForm(id) {
  const contact = dataContacts.find((c) => c.id === id);
  if (!contact) return;

  const form = document.getElementById("add-contact-form");
  form.fullname.value = contact.fullName;
  form.phone.value = contact.phone;
  form.email.value = contact.email;
  form.address.value = contact.address;

  form.dataset.editId = id; // simpan id di dataset
  form.querySelector("button[type='submit']").textContent = "Update Contact";
}

// 🟢 Fungsi untuk update contact
function updateContact(id, updatedData) {
  dataContacts = dataContacts.map((contact) =>
    contact.id === id ? { ...contact, ...updatedData } : contact
  );

  dataContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
  saveToLocalStorage();
  renderContacts(dataContacts);
}

document.getElementById("sort-asc").addEventListener("click", () => {
  dataContacts.sort((a, b) => a.fullName.localeCompare(b.fullName));
  saveToLocalStorage();
  renderContacts(dataContacts);
});

document.getElementById("sort-desc").addEventListener("click", () => {
  dataContacts.sort((a, b) => b.fullName.localeCompare(a.fullName));
  saveToLocalStorage();
  renderContacts(dataContacts);
});

const addContactFormElement = document.getElementById("add-contact-form");

addContactFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(addContactFormElement);
  const newContactData = {
    fullName: formData.get("fullname").toString(),
    phone: formData.get("phone").toString(),
    address: formData.get("address").toString(),
    email: formData.get("email").toString(),
  };

  const editId = addContactFormElement.dataset.editId;

  if (editId) {
    // mode edit
    updateContact(Number(editId), newContactData);
    delete addContactFormElement.dataset.editId;
    addContactFormElement.querySelector("button[type='submit']").textContent =
      "Add Contact";
  } else {
    // mode tambah
    addContact(dataContacts, newContactData);
  }

  addContactFormElement.reset();
});

// render awal
renderContacts(dataContacts);
