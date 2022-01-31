
let myLibrary = [];



const form =  document.getElementsByTagName('form')[0];
const addBtn = document.querySelector('.addBtn');
const libContainer = document.querySelector('.libContainer');
const subInfo = document.querySelector("#subInfo");

const popUp = document.querySelector('.popUp');
const overLay = document.querySelector('.overLay');
const closeBtn = document.querySelector('#close');

function Book(title, author, numPages, readBefore) {
  // the constructor...
    this.title = title;
    this.author = author;
    this.numPages = numPages;
    this.readBefore = readBefore;

}



function addBookToLibrary(book) {
  // do stuff here
    myLibrary.push(book);
}


function clearForm(){
    form.title.value="";
    form.author.value="";
    form.pages.value="";
    form.read.checked=false;
}

function addPopUp(){
// popup
    overLay.style.display = 'block';
    popUp.classList.add('modal-open');
}


function removePopUp(){
// remove popup
    popUp.classList.remove('modal-open');
    overLay.style.display = 'none';
    clearForm();
}

addBtn.addEventListener('click', ()=>{
    
    addPopUp();
})

subInfo.addEventListener('click', (event)=>{
    
    let numPages = parseInt(form.pages.value);
    
        // REQUIRED so we don't close form
    if(form.title.value==""||form.author.value==""||isNaN(numPages)|| numPages<=0)
    {
        // alert("invalid input");
        return;
    }
    
    
    let book = new Book(form.title.value, form.author.value, form.pages.value, form.read.checked);
    addBookToLibrary(book);

    
    removePopUp();
})


closeBtn.addEventListener('click', ()=>{
    
    removePopUp();
})




