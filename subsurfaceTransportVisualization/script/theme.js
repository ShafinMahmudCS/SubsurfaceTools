let themeSwitcher = document.querySelector('#darkmode-toggle');

// Load saved theme from local storage, if it exists
let savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.body.className = savedTheme;
    // Update the checkbox status based on the theme
    themeSwitcher.checked = savedTheme === 'dark-theme';
} else {
    // By default, assume 'light-theme'
    document.body.classList.add('light-theme');
    themeSwitcher.checked = false;
}

themeSwitcher.addEventListener('change', function () {
    if (this.checked) {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark-theme');
    } else {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        localStorage.setItem('theme', 'light-theme');
    }
});
