# project-LIBRARY

## How to use
- Add button: add books to library
- delete button remove book
- cursor click read/yet to read to toggle your current situation of your book journey


### WHat I learnt
-  associate your DOM elements with the actual book objects in some way. One easy solution is giving them a data-attribute that corresponds to the index of the library array.

- button, type-button in forms for client-side scripting

- overLay, popup(MODAL) concept

- classList and display=none/block

- isNaN(), parseInt()-> return NaN if not a number

- client side form validation, along with frontend event to accept input(and close form)  or stay on same state( just return from the event )

- set data attribute using JS, the dataset property
    - bookCard.dataset.booknum = index.toString();

- delete the card in from frontend as well as get assoiciated index in array store to reove from it
    - const delIdx = card.getAttribute('data-booknum');

            // inplace del in array
            myLibrary.splice(delIdx, 1);


- Local storage to save an array
    - localStorage.setItem("quentinTarantino", JSON.stringify(movies));
    - var retrievedData = localStorage.getItem("quentinTarantino");
    var movies2 = JSON.parse(retrievedData);
________________________________________________________


# flow

- 1) displayLib - driver , retrive old stage from local storge first here, as well as display the cards

- addBookToLib / removeBookToLib : update array as well as localStorage

- addBtn : add popUp, subInfo-> append new book in arr as well as frontend( createBook and add delete feature)

- delete : remove child of libContainer, BUT CRUX is to remove from array as well, to do this used dataset attr mapped to array index, passed the index in splice to do inplace del

____________________________________________________

## to implement:

- edit option