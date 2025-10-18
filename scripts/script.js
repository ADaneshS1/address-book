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

function showContacts(contacts) {
  for (let contact of contacts) {
    console.log(
      `${contact.id} ${contact.fullName} | ${contact.phone} | ${contact.email} | ${contact.address}`
    );
  }
}

// TODO: Change parameter fields into object
function addContact(contacts, fullName, phone, email, address) {
  const newId = contacts[contacts.length - 1].id + 1;

  const newContact = {
    id: newId,
    fullName,
    phone,
    email,
    address,
  };

  const updatedContacts = [...contacts, newContact];

  dataContacts = updatedContacts;
}

function findContactId(id) {
  return dataContacts.find((contact) => contact.id === id);
}

function deleteContact(contacts, id) {
  const updatedContacts = contacts.filter((contact) => contact.id !== id);

  dataContacts = updatedContacts;
}

function searchContacts(contacts, keyword) {
  const foundContacts = contacts.filter((contact) =>
    contact.fullName.toLowerCase().includes(keyword.toLowerCase())
  );
  return foundContacts;
}

// TODO: Destructure newContactData
function editContact(contacts, id, newContactData) {
  const updatedContacts = contacts.map((contact) => {
    if (contact.id === id) {
      return {
        ...contact,
        ...newContactData, // fullName, phone, email
      };
    }
    return contact;
  });
  dataContacts = updatedContacts;
}

// -----------------------------------------

// try {
//   const contact = findContactId(10);
//   if (!contact) throw new Error("Contact not found");
//   console.log("Contact found", contact);
// } catch (error) {
//   console.error("An error occurred:", error.message);
// }

// addContact(
//   dataContacts,
//   "Dimas Aditya",
//   "+62-888-3333-222",
//   "dimasaditya@example.com",
//   "Bandung"
// );

// localStorage.setItem("contacts", JSON.stringify(dataContacts));

// showContacts(dataContacts);

deleteContact(dataContacts, 2);

showContacts(dataContacts);

const searchResults = searchContacts(dataContacts, "bud");
showContacts(searchResults);

// editContact(dataContacts, 3, {
//   fullName: "Siti Rahmawati",
//   phone: "+62-3444-3444-099",
// });
