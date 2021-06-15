const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader')

let apiQuotes = [];

// Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Show New Quote
function newQuote() {
    loading();
    //Pick Random Quote from apiQuotes array
    const  quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank
    if(!quote.author){
        authorText.text = 'Unknown';
    }else{
    authorText.textContent = quote.author;
    }

    // Check Quote lenght  to dtermine styling
    if(quote.text.lenght>120){
        quoteText.classList.add('long-quote');
    }else{
        // Set Quote and Hide Loader
          quoteText.textContent = quote.text;
          complete();
    }
  
}


// Get Quotes from API
async function getQuotes(){
    const apiUrl = 'https://type.fit/api/quotes';
    try {
       const response = await fetch(apiUrl);
       apiQuotes = await response.json(); 
       newQuote();
    } catch (error) {
        // Catch Error 
    }
}


// Tweet QUOTE
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank')
}

// Event Listner
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
//On load
getQuotes();