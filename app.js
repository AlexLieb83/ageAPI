async function getGuessedAge() {
  const name = document.getElementById("name").value.trim();
  const country = document.getElementById("country").value.trim().toUpperCase();

  let apiUrl = `https://api.agify.io/?name=${name}`;

  if (country) {
    apiUrl += `&country_id=${country}`;
  }

  try {
    const res = await fetch(apiUrl);
    if (!res.ok) {
      throw new Error("Network Error, please try again later");
    }
    const data = await res.json();
    const resultDiv = document.getElementById("result");

    console.log(data);

    if (data.age) {
      resultDiv.innerText = `I predict that your age, ${name}, is ${
        country ? `from ${country}` : ""
      } is ${data.age}`;
      askUserAgeComparison();
    } else {
      resultDiv.innerText = `Sorry, ${name}, your age alludes me.`;
    }
  } catch (error) {
    console.error(error);
    document.getElementById("result").innerText = `Age not available.`;
  }
}

function askUserAgeComparison() {
  const questionDiv = document.createElement("div");
  questionDiv.innerText = `Are you younger, older, or the same age as my guess?`;
  const buttons = ["Younger", "Older", "Same"].map((choice) => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => displayJoke(choice.toLowerCase());
    return btn;
  });

  buttons.forEach((button) => questionDiv.appendChild(button));
  document.getElementById("result").appendChild(questionDiv);
}

function displayJoke(choice) {
  let joke = "";
  switch (choice) {
    case "younger":
      joke = "If you lived on Mercury...I might have been correct.";
      break;
    case "older":
      joke = "Really? You do not look a day over what I said.";
      break;
    case "same":
      joke = "I am perfect. Good job to me.";
      break;
  }
  const jokeDiv =
    document.getElementById("joke") || document.createElement("div");
  jokeDiv.id = "joke";
  jokeDiv.innerText = joke;
  if (!document.getElementById("joke")) {
    document.getElementById("result").appendChild(jokeDiv);
  }
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("country").value = "";
  resultDiv = document.getElementById("result");

  while (resultDiv.firstChild) {
    resultDiv.removeChild(resultDiv.firstChild);
  }
}
