'use strict';

//Add contact popup related functions
let popupaddcontact = document.getElementById('add-contact');
function addcontact() {
  popupaddcontact.style.display = 'block';
}
function closeaddcontact() {
  popupaddcontact.style.display = 'none';
}

//contactlist related stuff
function addcont() {
  contactlist.forEach(cont => {
    const li = document.createElement('li');
    li.textContent = `Name: ${cont.name} ,Phone Number: ${cont.phonenum}`;
    const div = document.createElement('div');
    div.className = 'actions';
    const btn1 = document.createElement('button');
    btn1.textContent = 'info';
    btn1.onclick = () =>
      showinfo(
        cont.name,
        cont.phonenum,
        cont.age,
        cont.email,
        cont.freetext,
        cont.dateadded,
      );
    const btn2 = document.createElement('button');
    btn2.textContent = 'edit';
    btn2.onclick = () =>
      editcontact(
        cont.name,
        cont.age,
        cont.phonenum,
        cont.email,
        cont.freetext,
        cont.id,
      );
    const btn3 = document.createElement('button');
    btn3.textContent = 'delete';
    btn3.onclick = () => deletecontact(cont.name);
    div.appendChild(btn1);
    div.appendChild(btn2);
    div.appendChild(btn3);

    li.appendChild(div);
    contactcards.appendChild(li);
  });
}
let totalpeople = 0;
let contactlist = [
  {
    name: 'liran',
    phonenum: '+972532733995',
    age: 23,
    email: 'ladelshten@gmail.com',
    freetext: 'nothing much to say',
    id: totalpeople++,
    dateadded: new Date(),
  },
  {
    name: 'bar',
    phonenum: '+972538221242',
    age: 24,
    email: 'barsho@gmail.com',
    freetext: 'hi everyone',
    id: totalpeople++,
    dateadded: new Date(),
  },
  {
    name: 'ana',
    phonenum: '+972525381648',
    age: 22,
    email: 'anazak@gmail.com',
    freetext: 'אולסטארס וגופיות',
    id: totalpeople++,
    dateadded: new Date(),
  },
];

let contactcards = document.querySelector('.phone-list');
addcont();
function adder(event) {
  event.preventDefault();
  const name = document.getElementById('nameadd').value.trim();
  const age = parseInt(document.getElementById('ageadd').value);
  const phonenum = document.getElementById('numadd').value.trim();
  const email = document.getElementById('emailadd').value.trim();
  const freetext = document.getElementById('freetextadd').value.trim();
  let id = totalpeople++;
  let dateadded = new Date();
  if (!name || isNaN(age) || !phonenum || age < 1 || age > 200) {
    alert('please enter valid values');
    return;
  }
  contactlist.push({ name, phonenum, age, email, freetext, id, dateadded });
  document.querySelector('.addcontactform').reset();
  closeaddcontact();
  contactcards.innerHTML = '';
  addcont();
}

//info about contact
function showinfo(name, phonenum, age, email, freetext, dateadded) {
  document.getElementById('contact-info').style.display = 'block';
  let namename = document.getElementById('namename');
  namename.textContent = `Name: ${name}`;
  let info1 = document.getElementById('contactinfop1');
  info1.textContent = `Phone number:  ${phonenum}`;
  let info2 = document.getElementById('contactinfop2');
  info2.textContent = `Age:  ${age}`;
  let info3 = document.getElementById('contactinfop3');
  info3.textContent = `Email: ${email}`;
  let info4 = document.getElementById('contactinfop4');
  info4.textContent = `Free Text: ${freetext}`;
  let info5 = document.getElementById('contactinfop5');
  info5.textContent = `Date Added or Edited: ${dateadded} `;
}
function closeinfo() {
  document.getElementById('contact-info').style.display = 'none';
}

//delete contact
function deletecontact(name) {
  const index = contactlist.findIndex(cont => cont.name === name);
  if (index !== -1) {
    contactlist.splice(index, 1);
  }
  contactcards.innerHTML = '';
  addcont();
}

function deletall() {
  contactlist = [];
  contactcards.innerHTML = '';
  console.log(contactlist);
}
//edit contact
function editcontact(name, age, phonenum, email, freetext, id) {
  document.getElementById('edit-contact').style.display = 'block';
  document.querySelector('.edith2').textContent = `${name} Edit`;
  document.getElementById('nameedit').value = name;
  document.getElementById('ageedit').value = age;
  document.getElementById('numedit').value = phonenum;
  document.getElementById('emailedit').value = email;
  document.getElementById('freetextedit').value = freetext;
  document.getElementById('idofcontact').textContent = id;
}

function closeeditcontact() {
  document.getElementById('edit-contact').style.display = 'none';
}
function editor(event) {
  event.preventDefault();
  let ider = document.getElementById('idofcontact').textContent;
  contactlist.forEach(c => {
    if (ider == c.id) {
      c.name = document.getElementById('nameedit').value.trim();
      c.age = document.getElementById('ageedit').value.trim();
      c.phonenum = document.getElementById('numedit').value.trim();
      c.email = document.getElementById('emailedit').value.trim();
      c.freetext = document.getElementById('freetextedit').value.trim();
      c.dateadded = new Date();
    }
  });
  contactcards.innerHTML = '';
  addcont();
  closeeditcontact();
}

//Dark mode change
function darkmode() {
  if (document.querySelector('body').className == 'lightmode') {
    document.getElementById('btnimagedark').setAttribute('src', './moon2.png');
    document.querySelector('body').className = 'darkmode';
    document.querySelector('header').className = 'darkmodeheader';

  } else {
    document.getElementById('btnimagedark').setAttribute('src', './moon1.png');
    document.querySelector('body').className = 'lightmode';
    document.querySelector('header').className = 'lightmodeheader';
  }
}

//search contact
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
  const nameToFind = document.getElementById('searchInput').value.trim().toLowerCase();
  let found = false;
  for (let i = 0; i < contactlist.length; i++) {
    if (contactlist[i].name.toLowerCase() === nameToFind) {
      showinfo(contactlist[i].name, contactlist[i].phonenum, contactlist[i].age, contactlist[i].email, contactlist[i].freetext, contactlist[i].dateadded);
      found = true;
      break;
    }
  }
  console.log("Looking for:", nameToFind);
  console.log("Contact list:", contactlist);

  if (!found) {
    alert(`Sorry, ${nameToFind} is not in the phone book`);
  }
  document.getElementById('searchInput').value = "";
});



