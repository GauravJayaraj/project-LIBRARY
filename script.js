
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

function createBookCard(book){
    const mybook = document.createElement('div');

    const h4_title = document.createElement('h4')
    h4_title.innerHTML = book.title;

    mybook.appendChild(h4_title);

    const h4_author = document.createElement('h4')
    h4_author.innerHTML = book.author;

    mybook.appendChild(h4_author);

    const h4_pages = document.createElement('h4')
    h4_pages.innerHTML = book.numPages;

    mybook.appendChild(h4_pages);

    const h5_read = document.createElement('h5')
    if(book.readBefore)
        h5_read.innerHTML = 'read';
    else    
        h5_read.innerHTML = 'yet to read';

    mybook.appendChild(h5_read);

    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete'
    
    mybook.appendChild(delBtn);

    mybook.classList.add('card');
    return mybook;
}

function displayLibrary(){
    // clear old display

    while(libContainer.firstChild){
        libContainer.removeChild(libContainer.lastChild);
    }
    
    myLibrary.forEach((book, index)=>{
        let bookCard = createBookCard(book);
        // set data attribute so we can toggle read and unread
        bookCard.dataset.booknum = index.toString();
                // < div data-bookNum="indexvalue">

        libContainer.appendChild(bookCard);
    })
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
    displayLibrary();
})


closeBtn.addEventListener('click', ()=>{
    
    removePopUp();
    displayLibrary();
})



// starter code
displayLibrary();