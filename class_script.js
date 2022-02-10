
const form =  document.getElementsByTagName('form')[0];
const addBtn = document.querySelector('.addBtn');
const libContainer = document.querySelector('.libContainer');
const subInfo = document.querySelector("#subInfo");

const popUp = document.querySelector('.popUp');
const overLay = document.querySelector('.overLay');
const closeBtn = document.querySelector('#close');


class Book{
    constructor(title, author, numPages, readBefore) {
        this.title = title;
        this.author = author;
        this.numPages = numPages;
        this.readBefore = readBefore;
    }
        // REST parameters
    edit(...newProps){
        this.title = newProps[0];
        this.author = newProps[1];
        this.numPages = newProps[2];
        this.readBefore = newProps[3];
    }
}


class Library{
    constructor(){
        this.myBooks = [];
    }

    addBookToLibrary(book){
        this.myBooks.push(book);

        // save current library in local store
        this.save();

        this.display();
    }

    removeBookFromLibrary(delIdx){
        this.myBooks.splice(delIdx,1);

        this.save();

        this.display();
    }

    editBookinLibrary(editIdx, title, author, numPages, readBefore){
        let bookToEdit = this.myBooks[editIdx];
        
        let numBooksBefore = this.myBooks.length;
        addPopUp();
        // trick add new book at end then copy over to current book then delete last book
        let numBooks = this.myBooks.length;

        console.log(1);
        // if popup not closed this will happen
        if(numBooks!=numBooksBefore){
            bookToEdit.edit(this.myBooks[numBooks-1].title, this.myBooks[numBooks-1].author, this.myBooks[numBooks-1].numPages, this.myBooks[numBooks-1].readBefore);
            this.removeBookFromLibrary(numBooks-1);
        }
        // else if popup closed book is unedited
        console.log(2);
    }


    display(){
        // clear old display
        while(libContainer.firstChild){
            libContainer.removeChild(libContainer.lastChild);
        }

        // Associate index with book card in frontend
        this.myBooks.forEach((book, index)=>{
            let bookCard = createBookCard(book);
            // set data attribute so we can toggle read and unread
            bookCard.dataset.booknum = index.toString();
                    // < div data-bookNum="indexvalue">

            libContainer.appendChild(bookCard);
        })
    }


    save(){
        // save current form in local store
        localStorage.setItem("classLibrary", JSON.stringify(this.myBooks));
    }

    buildSaved(){
        let retrievedData = localStorage.getItem('classLibrary');

        if(retrievedData!=null)
            this.myBooks = JSON.parse(retrievedData);
    }

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
    

    //DELETE OPERATION
    delBtn.addEventListener('click', ()=>{
        const delIdx = mybook.getAttribute('data-booknum');
        
        classLibrary.removeBookFromLibrary(delIdx);

    })
    
    mybook.appendChild(delBtn);


    const editBtn = document.createElement('button');
    editBtn.innerHTML = 'Edit';

    //EDIT OPERATION
    editBtn.addEventListener('click', ()=>{
        const editIdx = mybook.getAttribute('data-booknum');
        classLibrary.editBookinLibrary(editIdx);
    })
    
    mybook.appendChild(editBtn);

    mybook.classList.add('card');
    return mybook;
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
    
    classLibrary.addBookToLibrary(book);


    
    removePopUp();
    classLibrary.display();
})


closeBtn.addEventListener('click', ()=>{
    
    removePopUp();
    classLibrary.display();
});



// Driver code
let classLibrary = new Library();

classLibrary.buildSaved();
classLibrary.display();