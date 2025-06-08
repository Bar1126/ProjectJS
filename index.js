'use strict'

//Add contact popup related functions
let popupaddcontact = document.getElementById("add-contact");
function addcontact() {

  popupaddcontact.style.display = "block";
}
function closeaddcontact() {
  popupaddcontact.style.display = "none";

}


//contactlist related stuff
function addcont() {
  contactlist.forEach(cont => {
    const li = document.createElement('li');
    li.textContent = cont.name;
    const div = document.createElement('div');
    div.className = "actions"
    const btn1 = document.createElement('button');
    btn1.textContent = ('info');
    btn1.onclick = () => showinfo(cont.phonenum, cont.age);
    const btn2 = document.createElement('button');
    btn2.textContent = ('edit');
    btn2.onclick = () => editcontact(cont.name);
    const btn3 = document.createElement('button');
    btn3.textContent = ('delete');
    btn3.onclick = () => deletecontact(cont.name);
    div.appendChild(btn1);
    div.appendChild(btn2);
    div.appendChild(btn3);
    li.appendChild(div);
    contactcards.appendChild(li);


  });
}
let contactlist = [{ name: "liran", phonenum: "+972532733995", age: 23 }, { name: "bar", phonenum: "+972538221242", age: 24 }, { name: "ana", phonenum: "+972525381648", age: 22 }]

let contactcards = document.querySelector('.phone-list');
addcont();
function adder(event) {
  event.preventDefault();
  const name = document.getElementById('nameadd').value.trim();
  const age = parseInt(document.getElementById('ageadd').value);
  const phonenum = document.getElementById('numadd').value.trim();
  if (!name || isNaN(age) || !phonenum || age < 1 || age > 200) {
    alert("please enter valid values")
    return;
  }
  contactlist.push({ name, phonenum, age });
  document.querySelector('.addcontactform').reset();
  closeaddcontact();
  contactcards.innerHTML = ''
  addcont();
}




//info about contact
function showinfo(phonenum, age) {
  document.getElementById('contact-info').style.display = "block";
  let info1 = document.getElementById('contactinfop1');
  info1.textContent = `Phone number:  ${phonenum}`
  let info2 = document.getElementById('contactinfop2');
  info2.textContent = `Age:  ${age}`
}
function closeinfo() {
  document.getElementById('contact-info').style.display = "none";
}


//delete contact
function deletecontact(name) {
  const index = contactlist.findIndex(cont => cont.name === name);
  if (index !== -1) {
    contactlist.splice(index, 1);

  }
  contactcards.innerHTML = ''
  addcont();
}

//edit contact

