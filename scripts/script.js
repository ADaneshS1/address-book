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

function renderSeperatorLine() {
  console.log("-------------------------");
}

function showContacts(contactList) {
  for (let data of contactList) {
    console.log(
      `${data.id} ${data.fullName} | ${data.phone} | ${data.email} | ${data.address}`
    );
  }
}

function addContact(contacts, fullName, phone, email, address) {
  const newId = contacts[contacts.length - 1].id + 1;

  const newContact = {
    id: newId,
    fullName: fullName,
    phone: phone,
    email: email,
    address: address,
  };

  const updatedContacts = [...contacts, newContact];

  dataContacts = updatedContacts;
}

addContact(
  dataContacts,
  "Dimas Aditya",
  "+62-888-3333-222",
  "dimasaditya@example.com",
  "Bandung"
);

function findContactId(id) {
  return dataContacts.find((contact) => contact.id === id);
}

try {
  const contact = findContactId(10);
  if (!contact) throw new Error("Contact not found");
  console.log("Contact found", contact);
} catch (error) {
  console.error("An error occurred:", error.message);
}

function deleteContact(contacts, id) {
  const updatedContacts = contacts.filter((contact) => contact.id !== id);

  dataContacts = updatedContacts;
}
deleteContact(dataContacts, 2);

function searchContacts(contacts, keyword) {
  const foundContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(keyword.toLowerCase())
  );
  return foundContacts;
}
const searchResult = searchContacts(dataContacts, "bud");
showContacts(searchResult);

function editContact(contacts, id, newContactData) {
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return { ...contact, ...newContactData };
    }
    return contact;
  });
  dataContacts = updatedContacts;
}
editContact(dataContacts, 3, {
  fullName: "Siti Rahmawati",
  phone: "+62-3444-3444-099",
});

localStorage.setItem("contacts", JSON.stringify(dataContacts));

showContacts(dataContacts);
