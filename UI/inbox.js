// Variable Declaration
const close = document.getElementById('close');
const open = document.getElementById('open');
const sidebar = document.getElementById("mySidebar");
const main = document.getElementById("main");
const drop = document.getElementById("drop-btn");
const dropdown = document.getElementById(".drop-down");


// Add Events Listerner

close.addEventListener('click', () => {
  sidebar.style.width = "0";
  main.style.marginLeft= "0";
});

open.addEventListener('click', () =>  {
  sidebar.style.width = "250px";
  main.style.marginLeft = "250px";
});

drop.addEventListener('click', () => {
  dropdown.classList.toggle("show");
});