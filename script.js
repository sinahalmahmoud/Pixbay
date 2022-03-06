let item1 = "";
let item2 = "";
let pn = 1;


let form1 = document.querySelector("form");
form1.addEventListener("keypress", function (event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    get();
  }
});

async function apidata(item1, item2, pn) {
  let params = new URLSearchParams({
    key: '25623746-e3191a9d7b371449ce7eeb5d7',
    q: item1,
    colors: item2,
    page: pn,
    per_page: '10'
  });
  let response = await fetch("https://pixabay.com/api/?" + params.toString());
  let data = await response.json();
  return data;
}

async function get() {
   item2 = document.getElementById("color").value;
   item1 = document.getElementById("se").value;
   let newd = await apidata(item1, item2, pn);
   deletepics();
   add(0, 10, newd);
   navistatus(newd, pn);
}

async function next() {
  let newd = await apidata(item1, item2, pn + 1)
  deletepics();
  add(0, 10, newd);
  navistatus(newd, pn + 1);
  pn = pn + 1;
}

async function previous() {
  let newd = await apidata(item1, item2, pn - 1)
  deletepics();
  add(0, 10, newd);
  navistatus(newd, pn - 1);
  pn = pn - 1;
}

function deletepics() {
  for (let j = 0; j < 20; j++) {
    let picli = document.querySelector("#lii");
    if (picli != null) {
      picli.remove();
      j++;
    }
  }
}

async function add(begin, end, newd) {
  let picsTemplate = document.querySelector("#pics-template");
  let picsList = document.querySelector("#pics-list");
  for (let i = begin; i < end; i++) {
    let picsLi = picsTemplate.content.firstElementChild.cloneNode(true);
    picsLi.querySelector(".pic-tag").textContent = newd.hits[i].tags;
    picsLi.querySelector(".pic-image").src = newd.hits[i].largeImageURL;
    picsLi.querySelector(".pic-user").textContent = "Tacken by" + newd.hits[i].user;
    picsList.append(picsLi);
  }
}
async function navistatus(newd, currentpage) {
  const button1 = document.querySelector("#next");
  const button2 = document.querySelector("#previous");
  if (currentpage == 1) {
    button2.disabled = true;
    button1.disabled = false;
  }
  else if (newd.totalHits > currentpage * 10) {
    button1.disabled = false;
    button2.disabled = false;
  }
  else if (newd.totalHits < currentpage * 10) {
    button2.disabled = false;
    button1.disabled = true;
  }
}





