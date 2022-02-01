
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

    // save current form in local store
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}


function removeBookFromLibrary(delIdx){

    // inpace delete
    myLibrary.splice(delIdx, 1);

    // save current form in local store
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
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
    
    // TOGGLE READ?UNREAD
    h5_read.classList.add('curHover');
    h5_read.addEventListener('click', (event)=>{
        let content = h5_read.innerHTML;
        if(content=='read'){
            h5_read.innerHTML = 'yet to read';
        }
        else{
            h5_read.innerHTML = 'read';
        }

        event.stopPropagation(); // don't popogate event upto card
    })

    mybook.appendChild(h5_read);

    const delBtn = document.createElement('button');
    delBtn.innerHTML = 'Delete'
    
    mybook.appendChild(delBtn);

    mybook.classList.add('card');
    return mybook;
}

function displayLibrary(){
    
    if(myLibrary.length==0 && localStorage.getItem('myLibrary')==null){
        return;
    }
    else if(myLibrary.length==0 && localStorage.getItem('myLibrary')!=null){
        
        // get previous State of library
        let retrievedData = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(retrievedData);
    }
    
    // clear old display
    while(libContainer.firstChild){
        libContainer.removeChild(libContainer.lastChild);
    }
    

    // Associate index with book card in frontend
    myLibrary.forEach((book, index)=>{
        let bookCard = createBookCard(book);
        // set data attribute so we can toggle read and unread
        bookCard.dataset.booknum = index.toString();
                // < div data-bookNum="indexvalue">

        libContainer.appendChild(bookCard);
    })


    // DELETE OPERATION
    const cards = document.querySelectorAll('.card');

    cards.forEach((card)=>{
        const button = card.querySelector('button');

        button.addEventListener('click', ()=>{
            const delIdx = card.getAttribute('data-booknum');

            // inplace del in array
            removeBookFromLibrary(delIdx);

            // remove from DOM tree, as a child of the libContainer
            libContainer.removeChild(card);
        });
    });
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