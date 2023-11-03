const toggleSwicth = document.querySelector('input[type="checkbox"]');
const toggleIcon = document.getElementById('toggle-icon');
const nav = document.getElementById('nav');
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');

// Helper function
function addProperties (firstColor, secondColor, firstIcon, secondIcon, type) {
    nav.style.backgroundColor = `rgb(${firstColor} / 50%)`;
    textBox.style.backgroundColor = `rgb(${secondColor} / 70%)`;
    toggleIcon.children[0].textContent = `${type[0].toUpperCase() + type.substring(1)} Mode`;
    toggleIcon.children[1].classList.remove(`${firstIcon}`);
    toggleIcon.children[1].classList.add(`${secondIcon}`);
    image1.src= `img/undraw_proud_coder_${type}.svg`;
    image2.src= `img/undraw_feeling_proud_${type}.svg`;
    image3.src= `img/undraw_conceptual_idea_${type}.svg`;
}

// Dark Mode Styles
function darkMode() {
    addProperties('0 0 0', '255 255 255', 'fa-sun', 'fa-moon', 'dark')
}

// Light Mode Styles
function lightMode() {
    addProperties('255 255 255', '0 0 0', 'fa-moon', 'fa-sun', 'light');
}

function changeTheme (event) {
    // Dark mode
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        darkMode();
    } else {
        // Light Mode
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        lightMode();
    }
}

toggleSwicth.addEventListener('change', changeTheme);

// Check Local Storage for Theme
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'dark') {
        // We also change our input to dark mode side
        toggleSwicth.checked = true;
        darkMode();
    }
}