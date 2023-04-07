const form = document.getElementById("userForm");
const inputs = form.querySelectorAll("input");
const filter = document.getElementById("filter");
const userDataContainer = document.getElementById("userData");

let userData = [];

// Load existing data from local storage
if (localStorage.getItem("userData")) {
  userData = JSON.parse(localStorage.getItem("userData"));
  renderUserData(userData);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let newUser = {};
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.checkValidity()) {
      isValid = false;
      input.classList.add("error");
    } else {
      input.classList.remove("error");
      newUser[input.name] = input.value;
    }
  });

  if (isValid) {
    userData.push(newUser);
    localStorage.setItem("userData", JSON.stringify(userData));
    renderUserData(userData);
    form.reset();
  }
});
filter.addEventListener("change", (event) => {
  let filteredData = userData.slice().sort((a, b) => {
    if (event.target.value === 'name') {
      let aName = a[event.target.value].split(" ");
      let bName = b[event.target.value].split(" ");
      let result = aName[0].localeCompare(bName[0]);
      if (result === 0 && aName.length > 1 && bName.length > 1) {
        result = aName[1].localeCompare(bName[1]);
      }
      return result;
    } else {
      return a[event.target.value] - b[event.target.value];
    }
  });

  renderUserData(filteredData);
});


function renderUserData(data) {
  userDataContainer.innerHTML = "";

  if (data.length === 0) {
    userDataContainer.innerHTML = "<p>No data found.</p>";
    return;
  }

  let tableHeader = `
    <tr>
      <th>Name</th>
      <th>Height</th>
      <th>Weight</th>
      <th>Age</th>
    </tr>
  `;

  let tableRows = "";

  data.forEach((user) => {
    tableRows += `
      <tr>
        <td>${user.name}</td>
        <td>${user.height} cm</td>
        <td>${user.weight} kg</td>
        <td>${user.age}</td>
      </tr>
    `;
  });

  userDataContainer.innerHTML = `
    <thead>
      ${tableHeader}
    </thead>
    <tbody>
      ${tableRows}
    </tbody>
  `;
}

