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
    .post("http://localhost:3000/post-data", data)
    .then((res) => console.log(res.data));
}
