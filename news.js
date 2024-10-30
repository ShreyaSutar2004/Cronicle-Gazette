const API_KEY="ddef8d9b9e1d4bfeb418b3f16e7878d6";
const URL="https://newsapi.org/v2/everything?q=";

const searchButton=document.getElementById("searchbtn");
const searchText=document.getElementById("search");

//Getting the news from newsAPI by using fetchNews function
window.addEventListener("load",()=> fetchNews("India"));

function reload(){
    window.location.reload();
}

//FetchNews
async function fetchNews(query){
    const response= await fetch(`${URL}${query}&apiKey=${API_KEY}`);
    const data= await response.json();
    // console.log(data);
    bindData(data.articles);

}

 //To bind the recieved data from the API in JSON Format
function bindData (articles) {
     const newsCard=document.getElementById("news-cards");
     const templateCard=document.getElementById("template-multiple-cards");

     newsCard.innerHTML='';

     articles.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone=templateCard.content.cloneNode(true);
       fillDataInCard(cardClone,article);
        newsCard.appendChild(cardClone);
     });
}


//Filling all the info given in the JSON format into the card
function fillDataInCard(cardClone,article){
    const newsImg= cardClone.querySelector("#newsimg");
    const newsTitle=cardClone.querySelector("#title");
    const newsSource=cardClone.querySelector("#news-source");
    const newsDesc=cardClone.querySelector("#newsdesc");


    //.title, .description name accordingily to provided in JSON 
    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });

    //Redirecting the article to new page when clicked
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(article.url,"_blank");
    });

    newsSource.innerHTML=`${article.source.name} ▪️ ${date}`;
}

//When the navItem gets clicked
let CurrSelectedItem=null;
function navItemClick(id){
    fetchNews(id);
    const navItem=document.getElementById(id);

    //not null
    CurrSelectedItem?.classList.remove("active");
    CurrSelectedItem=navItem;
    CurrSelectedItem.classList.add("active");
}

//Accesing search button 
searchButton.addEventListener("click",()=>{
    const query=searchText.value;
    if(!query) return;
    fetchNews(query);

    //If the user wants to search and the navitem is still in active state

    CurrSelectedItem?.classList.remove("active");
    CurrSelectedItem=null;
});






