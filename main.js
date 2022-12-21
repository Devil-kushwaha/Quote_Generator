
const quoteCont = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const new_quote_btn =  document.querySelector('#new-quote');
const twit_btn = document.querySelector('#twitter');
const loader = document.querySelector('#loader');


//Loader
function loading(){
    loader.hidden = false;
    quoteCont.hidden = true;
}

function complete(){
    loader.hidden=true;
    quoteCont.hidden = false;
}



let apiQuotes=[];

// Function to get single quote
function newQuote(){
    loading();
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    
    console.log(quote.author);
    if(!quote.author)
    {   
        authorText.innerHTML = "Unknown";
    }
    else
    {
        authorText.innerHTML = quote.author;
    }

    // Check Quote Length
    if(quote.text.length> 120)
    {
        quoteText.classList.add('long-quote');
    } else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.innerHTML = quote.text;
    complete();
}


// Get Quotes From API

async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        console.log(apiQuotes);
        newQuote();
    }
    catch{
        // Catch Error
        console.log("Connection Not Made");
    }
}

// New Quote Button Event Listener
new_quote_btn.addEventListener('click', newQuote)


// Twitter Button Event Listeners
twit_btn.addEventListener('click',(event)=>{
    tweetQuote();
});

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// On Load
getQuotes();