document.addEventListener('DOMContentLoaded', () => {
    // Toggle navigation menu
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburgerMenu && navLinks) {
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Toggle active class for hamburger icon
        });
    }

    // Close navigation menu when a link is clicked (for mobile view)
    const navLinksList = document.querySelectorAll('.nav-links li a');
    if (navLinksList) {
        navLinksList.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active'); // Remove active class from hamburger icon
            });
        });
    }

    // Attach form validation for contact form
    const contactForm = document.querySelector('form[action="php/contact.php"]');
    if (contactForm) {
        contactForm.addEventListener('submit', validateContactForm);
    }

    // Attach form validation for admission form
    const admissionForm = document.querySelector('form[action="php/admissions.php"]');
    if (admissionForm) {
        admissionForm.addEventListener('submit', validateAdmissionForm);
    }

    // Attach form validation for student portal login
    const studentLoginForm = document.querySelector('form[action="php/student-login.php"]');
    if (studentLoginForm) {
        studentLoginForm.addEventListener('submit', validateLoginForm);
    }

    // Attach form validation for parent portal login
    const parentLoginForm = document.querySelector('form[action="php/parent-login.php"]');
    if (parentLoginForm) {
        parentLoginForm.addEventListener('submit', validateLoginForm);
    }
});

function validateContactForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    let isValid = true;
    let errorMessages = [];

    if (!name) {
        isValid = false;
        errorMessages.push('Name is required.');
    }

    if (!email) {
        isValid = false;
        errorMessages.push('Email is required.');
    } else if (!validateEmail(email)) {
        isValid = false;
        errorMessages.push('Please enter a valid email address.');
    }

    if (!message) {
        isValid = false;
        errorMessages.push('Message is required.');
    } else if (message.length < 10) {
        isValid = false;
        errorMessages.push('Message must be at least 10 characters long.');
    }

    if (!isValid) {
        displayErrors(errorMessages);
        return false;
    }

    form.submit();
}

function validateAdmissionForm(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const address = form.address.value.trim();

    let isValid = true;
    let errorMessages = [];

    if (!name) {
        isValid = false;
        errorMessages.push('Name is required.');
    }

    if (!email) {
        isValid = false;
        errorMessages.push('Email is required.');
    } else if (!validateEmail(email)) {
        isValid = false;
        errorMessages.push('Please enter a valid email address.');
    }

    if (!phone) {
        isValid = false;
        errorMessages.push('Phone number is required.');
    } else if (!validatePhone(phone)) {
        isValid = false;
        errorMessages.push('Please enter a valid phone number.');
    }

    if (!address) {
        isValid = false;
        errorMessages.push('Address is required.');
    }

    if (!isValid) {
        displayErrors(errorMessages);
        return false;
    }

    form.submit();
}

function validateLoginForm(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.username.value.trim();
    const password = form.password.value.trim();

    let isValid = true;
    let errorMessages = [];

    if (!username) {
        isValid = false;
        errorMessages.push('Username is required.');
    }

    if (!password) {
        isValid = false;
        errorMessages.push('Password is required.');
    }

    if (!isValid) {
        displayErrors(errorMessages);
        return false;
    }

    form.submit();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
}

function displayErrors(errors) {
    const errorContainer = document.getElementById('error-messages');
    if (!errorContainer) {
        const main = document.querySelector('main');
        const errorDiv = document.createElement('div');
        errorDiv.id = 'error-messages';
        errorDiv.style.color = 'red';
        main.insertBefore(errorDiv, main.firstChild);
    } else {
        errorContainer.innerHTML = '';
    }

    errors.forEach(error => {
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = error;
        errorContainer.appendChild(errorParagraph);
    });
}
