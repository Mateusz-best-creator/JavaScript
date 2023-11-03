const addBookmarkButton = document.getElementById('show-modal-title');
const modalContainer = document.getElementById('modal');
const closingModalButton = document.getElementById('close-modal');
const formModal = document.getElementById('bookmark-form');
const websiteNameInput = document.getElementById('website-name');
const websiteUrlInput = document.getElementById('website-url');
const modalSubmitButton = document.querySelector('button');
const bookmarksContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// Close and open modal element
function showModal() {
    modalContainer.classList.add('show-modal');
    websiteNameInput.focus();
}

function closeModal() {
    modalContainer.classList.remove('show-modal');
}

addBookmarkButton.addEventListener('click', showModal);
closingModalButton.addEventListener('click', closeModal);

// Creating out bookmarks
function createBookmarks() {
    bookmarksContainer.textContent = '';
    bookmarks.forEach((bookmark) => {
        const {name, url} = bookmark;
        // item and close icon
        const item = document.createElement('div');
        item.classList.add('item');
        const closeIcon = document.createElement('i');
        closeIcon.classList.add('fas', 'fa-times');
        closeIcon.setAttribute('title', 'Delte Bookmark');
        closeIcon.setAttribute('onclick', `deleteBookmark('${url}')`);

        // name element
        const nameElement = document.createElement('div');
        nameElement.classList.add('name');

        // img icon
        const imageIcon = document.createElement('img');
        imageIcon.setAttribute('src', `https://s2.googleusercontent.com/s2/favicons?domain=${url}`);
        imageIcon.setAttribute('alt', 'nice-icon');

        // Link
        const link = document.createElement('a');
        link.setAttribute('href', `${url}`)
        link.setAttribute('target', '_blank');
        link.textContent = name;

        // Adding to appropriate elements
        nameElement.append(imageIcon, link);
        item.append(closeIcon, nameElement);
        bookmarksContainer.appendChild(item);
    })
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function deleteBookmark(url) {
    bookmarks = bookmarks.filter(item => {
        return item.url !== url;
    })
    
    createBookmarks();
}

function updateLocalStorage() {
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    } else {
        bookmarks = [{
            name: 'google',
            url: 'https://google.com'
        }]

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    createBookmarks();
}

// Url Validation
function URLvalidation(url, name) {
    const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);

    if (!url.match(regex)) {
        return false;
    } 

    if (url.length === 0 || name.length === 0) {
        return false;
    }

    return true;
}

// Form Submit
function getDataFromInputs(event) {
    event.preventDefault();
    const websiteName = websiteNameInput.value;
    let websiteUrl = websiteUrlInput.value;
    
    if (!URLvalidation(websiteUrl, websiteName)) {
        alert("Wrong Input Value");
        return false;
    }
    if (!websiteUrl.includes('https://') || !websiteUrl.includes('http://')) {
        websiteUrl = `https://${websiteUrl}`;
    }

    // Now Url and name are valid
    const bookmark = {
        name: websiteName,
        url: websiteUrl
    }

    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    formModal.reset();
    websiteNameInput.focus();
    updateLocalStorage();
}

formModal.addEventListener('submit', getDataFromInputs);

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// On load add 1 bookmark
updateLocalStorage();