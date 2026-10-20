const form = document.querySelector("#note-form");
const note = document.querySelector("#note-input");
const error = document.querySelector("#error-message");
const noteCount = document.querySelector("#note-count");
const noteList = document.querySelector("#notes-list");
const category = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");

const notes = [];

function render() {
noteList.replaceChildren();


notes.forEach(function (item) {
    const li = document.createElement("li");
    li.classList.add("note", `category-${item.category}`);

    const noteText = document.createElement("p");
    noteText.textContent = item.text;

    const categoryLabel = document.createElement("small");
    categoryLabel.textContent = item.category;

    const date = document.createElement("small");
    date.textContent = item.createdAt;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.type = "button";

    deleteBtn.addEventListener("click", function () {
        const noteIndex = notes.findIndex(function (noteItem) {
            return noteItem.id === item.id;
        });

        if (noteIndex !== -1) {
            notes.splice(noteIndex, 1);
            render();
        }
    });

    li.appendChild(noteText);
    li.appendChild(categoryLabel);
    li.appendChild(document.createElement("br"));
    li.appendChild(date);
    li.appendChild(document.createElement("br"));
    li.appendChild(deleteBtn);

    noteList.appendChild(li);
});

if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
} else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
} else {
    noteCount.textContent = `You have ${notes.length} notes.`;
}


}

form.addEventListener("submit", function (event) {
event.preventDefault();


const noteText = note.value.trim();
const noteCategory = category.value;

if (noteText.length === 0) {
    error.textContent = "Please type a note first.";
    return;
}

if (noteText.length > 200) {
    error.textContent = "Notes must be 200 characters or fewer.";
    return;
}

error.textContent = "";

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
