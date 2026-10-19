const form = document.querySelector("#note-form");
const note = document.querySelector("#note-input");
const error = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const noteList = document.querySelector("#notes-list");
const category = document.querySelector("#note-category");
const searchInput = document.querySelector("search-input");

const notes = [ ];

function render(){
    noteList.replaceChildren();
    notes.forEach(function(item) {
        const li = document.createElement("li");
        li.classList.add("note", `category-${item.category}`);

        const noteText = document.createElement("p");
        noteText.textContent = item.text;

        const categoryLabel = document.createElement("small");
        categoryLabel.textContent = item.category;

        const date = document.createElement("small");
        date.textContent = item.createdAt;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = ("Delete");
        deleteBtn.type = "button";

        li.appendChild(noteText);
        li.appendChild(categoryLabel);
        li.appendChild(document.createElement("br"));
        li.appendChild(date);
        li.appendChild(document.createElement("br"));
        li.appendChild(deleteBtn);

        noteList.appendChild(li);

    });
}
form.addEventListener("submit", function (event) {
event.preventDefault();

const noteText = note.value.trim();
const noteCategory = category.value;

const newNote = {
    id: Date.now(),
    text: noteText,
    category: noteCategory,
    createdAt: new Date().toLocaleString()
};

notes.push(newNote);

render();

note.value = "";

});