// Variable Declaration
const close = document.getElementById('close');
const open = document.getElementById('open');
const sidebar = document.getElementById("mySidebar");
const main = document.getElementById("main");

const drop = document.getElementById("drop-btn");
const dropdown = document.getElementById("drop-down");
const drop1 = document.getElementById("drop-btn1");
const dropdown1 = document.getElementById("drop-down1");

// Get the modal
const modal = document.getElementById('myModal');

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// Add Events Listerner

close.addEventListener('click', () => {
  sidebar.style.width = "0";
  main.style.marginLeft= "0";
});

open.addEventListener('click', () =>  {
  sidebar.style.width = "100%";
  main.style.marginLeft = "100px";
});

drop.addEventListener('click', () => {
  dropdown.classList.toggle("show");
});

drop1.addEventListener('click', () => {
  dropdown1.classList.toggle("show");
});


// When the user clicks the button, open the modal 
btn.onclick = function() {
  sidebar.style.display= "none";
  main.style.marginLeft = "0";
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  sidebar.style.display = "block";
}