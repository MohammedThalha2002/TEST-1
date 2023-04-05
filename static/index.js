const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");

email.addEventListener("input", (e) => {
  if (!email.value.includes("@")) {
    email.classList.add("error");
  } else {
    email.classList.remove("error");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    username: username.value,
    email: email.value,
  };

  if (username.value != "" && email.value != "") {
    postData(data);
  }
});

async function postData(data) {
  console.log(data);
  await axios
    .post("http://35.154.14.12:3000/post-data", data)
    .then((res) => console.log(res.data));
}

async function getData() {
  const values = document.getElementById("form-value");
  // let out = [];
  // await fetch("http://localhost:3000/get-posts")
  //   .then((res) => res.json())
  //   .then((res) => (out = res));

  let out = await axios
    .get("http://35.154.14.12:3000/get-posts")
    .then((res) => res.data);

  console.log(out);

  out.forEach((val) => {
    values.innerHTML += `
        <div>
            <h1>${val.id}</h1>
            <h1>${val.name}</h1>
            <h1>${val.email}</h1>
        </div>`;
  });
}
getData();
