function checkFakeNews() {
  const newsInput = document.getElementById("newsInput").value;
  const resultDiv = document.getElementById("result");
  const model2 = document.getElementById("modelSelect").value;

  if (!newsInput.trim()) {
    resultDiv.style.display = "block";
    resultDiv.textContent = "Please enter some text to check.";
    resultDiv.className = "result error";
    return;
  }

  // Clear previous results
  resultDiv.style.display = "none";

  // API URL (change to your Flask API endpoint)
  const apiUrl = "http://127.0.0.1:5000/predict";

  // API Request
  fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: newsInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      resultDiv.style.display = "block";

      //   for (let model in data.predictions) {
      //     if (data.predictions[model2] === 1) {
      //       resultDiv.textContent = "The news is REAL!";
      //       resultDiv.className = "result success";
      //       break;
      //     }
      //   }
      if (data.predictions[model2] === 1) {
        resultDiv.textContent = "The news is REAL!";
        resultDiv.className = "result success";
      } else {
        resultDiv.textContent = "The news is FAKE!";
        resultDiv.className = "result error";
      }

      //   if (data.predictions.decision_tree === 1) {
      //     resultDiv.textContent = "The news is REAL!";
      //     resultDiv.className = "result success";
      //   } else {
      //     resultDiv.textContent = "The news is FAKE!";
      //     resultDiv.className = "result error";
      //   }
    })
    .catch((error) => {
      console.error("Error:", error);
      resultDiv.style.display = "block";
      resultDiv.textContent = "An error occurred while processing the request.";
      resultDiv.className = "result error";
    });
}
