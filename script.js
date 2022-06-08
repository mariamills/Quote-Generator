const newQuote = document.querySelector("#new-quote");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const quoteContainer = document.querySelector("#container");
const loader = document.querySelector("#loader");

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function loadingComplete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

const getQuote = async () => {
  loading();
  const url = "https://type.fit/api/quotes";
  try {
    fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const randomQuote = data[Math.floor(Math.random() * data.length)];
        const authorName = randomQuote.author ? randomQuote.author : "Unknown";
        console.log(randomQuote.text.length);
        //Quote length check
        if (randomQuote.text.length > 100) {
          quoteText.classList.add("long-quote");
        } else {
          quoteText.classList.remove("long-quote");
        }

        quoteText.innerText = randomQuote.text;
        authorText.innerText = authorName;
        loadingComplete();
      });
  } catch (err) {
    return "No quote, try again.";
  }
};

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.textContent}" - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

newQuote.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuote();
