var siteNameInput = document.getElementById("siteName");
var siteURLInput = document.getElementById("siteURL");

var submitbtn = document.getElementById("submit");
var updatebtn = document.getElementById("update");

allSites = [];
updateIndex = 0;

// يبدا ب http or https or ftp then ://
// بعد كده w or W 3مرات
// بعد كده . اى رقم ما عدا /, $, . ,? ,# , اى رقم بشرط يكون من اكتر من 3 ارقام
// وينتهى ب .com
var urlRegex = /^(ftp|http|https):\/\/[(w|W)]{3}\.[^\s\/$.?#[0-9]]{3,}(.com)$/;

if (localStorage.getItem("allSites") != null) {
  allSites = JSON.parse(localStorage.getItem("allSites"));
  displaySite();
}

function addSite() {
  var site = {
    name: siteNameInput.value,
    url: siteURLInput.value,
  };

  allSites.push(site);
  localStorage.setItem("allSites", JSON.stringify(allSites));

  displaySite();
  clearInput();
}

function clearInput() {
  siteNameInput.value = "";
  siteURLInput.value = "";
}

function displaySite() {
  var cartoona = "";

  for (var i = 0; i < allSites.length; i++) {
    cartoona += `<div class="col-lg-4 col-md-6 ">
        <div class="inner  p-3 text-center rounded-4">

          <div class="cardIndex bg-info my-3 rounded-circle">${i + 1}</div>
          <h3>${allSites[i].name}</h3>

          <div class="icons  d-flex justify-content-evenly mt-3 fs-5">
            <div onclick="deleteSite(${i})" class="layer-close ">
              <i class="fa-solid fa-circle-xmark"></i>
              <span>Delete</span>
            </div>
            <div onclick="setInput(${i})" class="layer-update">
              <i class="fa-solid fa-pen-to-square"></i>
              <span>Update</span>          
            </div>
            <div onclick="visitURL()" class="layer-visit">
                <a id="visitSite" class="text-decoration-none text-dark" href="${
                  allSites[i].url
                }" target="-blank">
                  <i class="fa-solid fa-eye"></i>
                  <span>Visit</span>
                </a>          
              </div>
          </div>
          
        </div>
      </div>`;
  }
  document.getElementById("row").innerHTML = cartoona;

  // console.log(cartoona);
}

function deleteSite(idx) {
  allSites.splice(idx, 1);

  localStorage.setItem("allSites", JSON.stringify(allSites));

  displaySite();
}

function setInput(idx) {
  // passing data by paramter
  updateIndex = idx;

  siteNameInput.value = allSites[idx].name;
  siteURLInput.value = allSites[idx].url;

  // to change submit btn with update btn
  updatebtn.classList.remove("d-none");
  submitbtn.classList.add("d-none");
}

function updateSite() {
  var site = {
    name: siteNameInput.value,
    url: siteURLInput.value,
  };

  allSites.splice(updateIndex, 1, site);

  localStorage.setItem("allSites", JSON.stringify(allSites));

  displaySite();
  clearInput();

  updatebtn.classList.add("d-none");
  submitbtn.classList.remove("d-none");
}

function visitURL() {
  if (urlRegex.test(siteURLInput.value) == true) {
    siteURLInput.value = document.getElementById("visitSite");
    clearInput();
  } else {
    alert("Please enter a valid URL according the rules");
  }
}

function search(term) {
  cartoona = "";

  for (var i = 0; i < allSites.length; i++) {
    if (
      allSites[i].name.trim().toLowerCase().includes(term.toLowerCase()) == true
    ) {
      cartoona += `<div class="col-lg-4 col-md-6 ">
            <div class="inner  p-3 text-center rounded-4">

            <div class="cardIndex bg-info my-3 rounded-circle">${i + 1}</div>
            <h3>${allSites[i].name}</h3>

            <div class="icons  d-flex justify-content-evenly mt-3 fs-5">
                <div onclick="deleteSite(${i})" class="layer-close ">
                <i class="fa-solid fa-circle-xmark"></i>
                <span>Delete</span>
                </div>
                <div onclick="setInput(${i})" class="layer-update">
                <i class="fa-solid fa-pen-to-square"></i>
                <span>Update</span>          
                </div>
                <div onclick="visitURL()" class="layer-visit">
                    <a id="visitSite" class="text-decoration-none text-dark" href="${
                      allSites[i].url
                    }" target="-blank">
                    <i class="fa-solid fa-eye"></i>
                    <span>Visit</span>
                    </a>          
                </div>
            </div>
            
            </div>
            </div>`;
    }
    document.getElementById("row").innerHTML = cartoona;
  }

  // console.log('hi');
}
