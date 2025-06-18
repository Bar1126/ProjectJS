'use strict'

//add contact popup
const addContactBtn = document.getElementById("addContactBtnPopup");
const addContactPopup = document.getElementById("addContact");
addContactBtn.addEventListener('click', (e) => {
  e.preventDefault()
  addContactPopup.style.display = 'block';
})
const closeAddPopUpBtn = document.getElementById("closeAddPopUpBtn");
closeAddPopUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  addContactPopup.style.display = 'none'
});

//contact list
let contactList = [
  {
    name: 'liran',
    phoneNum: '+972532733995',
    age: 23,
    email: 'ladelshten@gmail.com',
    freeText: 'nothing much to say',
    dateAdded: new Date(),
  },
  {
    name: 'bar',
    phoneNum: '+972538221242',
    age: 24,
    email: 'barsho@gmail.com',
    freeText: 'hi everyone',
    dateAdded: new Date(),
  },
  {
    name: 'ana',
    phoneNum: '+972525381648',
    age: 22,
    email: 'anazak@gmail.com',
    freeText: 'אולסטארס וגופיות',
    dateAdded: new Date(),
  },
  {
    name: 'sean',
    phoneNum: '+972544971252',
    age: 23,
    email: 'sean.lew@gmail.com',
    freeText: "hello :)",
    dateAdded: new Date(),
  },
];
const ul = document.querySelector('.phoneList');

const sortContacts = () => {
  ul.innerHTML = '';
  contactList.sort((a, b) => a.name.localeCompare(b.name));

  //empty list message
  const emptyMessage = document.getElementById('emptyMessage');
  if (contactList.length === 0) {
    emptyMessage.style.display = 'block'
    return;
  }
  else {
    emptyMessage.style.display = 'none'
  }


  contactList.forEach((contact, index) => {
    const li = document.createElement('li');
    li.setAttribute('data-id', index);
    li.textContent = `Name: ${contact.name}, Phone Number: ${contact.phoneNum}`;

    const div = document.createElement('div');
    div.className = 'actions';

    ['info', 'edit', 'delete'].forEach(text => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.className = 'btn';
      div.appendChild(btn);
    });

    li.appendChild(div);
    ul.appendChild(li);
  });
};

sortContacts();

ul.addEventListener('click', e => {
  if (e.target.tagName !== 'BUTTON')
    return;
  const action = e.target.textContent.trim().toLowerCase();
  const li = e.target.closest('li');
  const index = parseInt(li.getAttribute('data-id'));
  const contact = contactList[index];

  if (action === 'info') {
    document.getElementById('name').textContent = contact.name;
    document.getElementById('contactInfoP1').textContent = `Phone: ${contact.phoneNum}`;
    document.getElementById('contactInfoP2').textContent = `Age: ${contact.age}`;
    document.getElementById('contactInfoP3').textContent = `Email: ${contact.email}`;
    document.getElementById('contactInfoP4').textContent = `Note: ${contact.freeText}`;
    document.getElementById('contactInfoP5').textContent = `Added: ${contact.dateAdded.toLocaleString()}`;
    document.getElementById('contactInfo').style.display = 'block';
  }

  if (action === 'edit') {
    document.getElementById('editName').value = contact.name;
    document.getElementById('editAge').value = contact.age;
    document.getElementById('editNum').value = contact.phoneNum;
    document.getElementById('editEmail').value = contact.email;
    document.getElementById('editFreeText').value = contact.freeText;
    document.getElementById('contactId').setAttribute('data-id', index);
    document.getElementById('editContact').style.display = 'block';
  }
  if (action === 'delete') {
    contactList.splice(index, 1);
    sortContacts();
  }
});

document.getElementById('editContactBtn').onclick = e => {
  e.preventDefault();
  const index = parseInt(document.getElementById('contactId').getAttribute('data-id'));

  contactList[index].name = document.getElementById('editName').value.trim();
  contactList[index].age = parseInt(document.getElementById('editAge').value);
  contactList[index].phoneNum = document.getElementById('editNum').value.trim();
  contactList[index].email = document.getElementById('editEmail').value.trim();
  contactList[index].freeText = document.getElementById('editFreeText').value.trim();

  document.getElementById('editContact').style.display = 'none';
  sortContacts();
};

document.querySelector('.addContactForm').onsubmit = e => {
  e.preventDefault();
  const name = document.getElementById("addName").value.trim();
  const phoneNum = document.getElementById("Addnum").value.trim();
  const age = parseInt(document.getElementById("AddAge").value);
  const email = document.getElementById("Addemail").value.trim();
  const freeText = document.getElementById("AddFreeText").value.trim();

  if (contactList.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    alert("this contact is already in the list");
    return;
  }
  contactList.push({
    name,
    phoneNum,
    age,
    email,
    freeText,
    dateAdded: new Date()
  });
  document.getElementById('addContact').style.display = 'none';
  sortContacts();
  document.getElementById("addName").value = "";
  document.getElementById("Addnum").value = "";
  document.getElementById("AddAge").value = "";
  document.getElementById("Addemail").value = "";
  document.getElementById("AddFreeText").value = "";
};

document.getElementById("addContactBtn").onclick = () => {
  document.getElementById("addContact").style.display = 'block';
};

document.getElementById("closeAddPopUpBtn").onclick = () => {
  document.getElementById("addContact").style.display = 'none';
};

document.getElementById("closeInfoPopUpBtn").onclick = () => {
  document.getElementById("contactInfo").style.display = 'none';
};

document.getElementById("closebtnpopup2").onclick = () => {
  document.getElementById("editContact").style.display = 'none';
};

//Dark mode/light mode change
const darkBtn = document.getElementById("darkBtn");
darkBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (document.querySelector('body').className == 'lightMode') {
    document.getElementById('btnImageDark').setAttribute('src', './images/moon2.png');
    document.querySelector('body').className = 'darkMode';
    document.querySelector('header').className = 'darkModeHeader';
  }
  else {
    document.getElementById('btnImageDark').setAttribute('src', './images/moon1.png');
    document.querySelector('body').className = 'lightMode';
    document.querySelector('header').className = 'lightModeHeader';
  }
})

//search contact
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const nameToFind = document.getElementById('searchInput').value.trim().toLowerCase();
  let found = false;
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].name.toLowerCase() === nameToFind) {
      let contact = contactList[i];
      document.getElementById('name').textContent = contact.name;
      document.getElementById('contactInfoP1').textContent = `Phone: ${contact.phoneNum}`;
      document.getElementById('contactInfoP2').textContent = `Age: ${contact.age}`;
      document.getElementById('contactInfoP3').textContent = `Email: ${contact.email}`;
      document.getElementById('contactInfoP4').textContent = `Note: ${contact.freeText}`;
      document.getElementById('contactInfoP5').textContent = `Added: ${contact.dateAdded.toLocaleString()}`;
      document.getElementById('contactInfo').style.display = 'block';
      found = true;
      break;
    }
  }
  if (!found) {
    alert(`Sorry, ${nameToFind} is not in the phone book`);
  }
  document.getElementById('searchInput').value = "";
});

//delete all button
const deleteAllBtn = document.getElementById('deleteAllBtn');
deleteAllBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const confirmed = confirm("Are you sure you want to delete all contacts?");
  if (confirmed) {
    contactList.length = 0;
    sortContacts();
  }
});

//empty list message
// const emptyMessage = document.getElementById('emptyMessage');
// if(contactList.length === 0)
// {
//   emptyMessage.style.display = 'block'
//   return;
// }
// else
// {
//   emptyMessage.style.display = 'none'
// }