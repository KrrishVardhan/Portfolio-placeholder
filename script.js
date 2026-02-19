// Smooth scroll to section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    });
}

// Toggle content visibility
function toggleContent(elementId) {
    const element = document.getElementById(elementId);
    if (element.classList.contains('hidden')) {
        element.classList.remove('hidden');
    } else {
        element.classList.add('hidden');
    }
}

// Submit new project
function submitProject() {
    const title = document.getElementById('projectTitle').value;
    const desc = document.getElementById('projectDesc').value;
    
    if (title && desc) {
        alert('Project "' + title + '" added successfully!\n\n' + desc);
        cancelProject();
    } else {
        alert('Please fill in all fields');
    }
}

// Cancel project addition
function cancelProject() {
    document.getElementById('projectTitle').value = '';
    document.getElementById('projectDesc').value = '';
    document.getElementById('newProjectSection').classList.add('hidden');
}

// Handle contact form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    document.getElementById('formResponse').innerHTML = 
        '<br><strong>Thank you, ' + name + '!</strong><br>Your message has been received. I\'ll get back to you at ' + email + ' soon!';
    
    // Clear form
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}

// Dark mode toggle
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark');
    const btn = document.getElementById('darkToggle');
    btn.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
    localStorage.setItem('darkMode', isDark ? 'on' : 'off');
}

// Greeting based on time of day
window.onload = function() {
    const hour = new Date().getHours();
    let greeting = 'Hello';
    
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    else greeting = 'Good Evening';
    
    console.log(greeting + '! Welcome to Krrishvardhan Vyas\'s Portfolio');

    // Restore dark mode preference
    if (localStorage.getItem('darkMode') === 'on') {
        document.body.classList.add('dark');
        document.getElementById('darkToggle').innerHTML = '<i data-lucide="sun"></i>';
    }

    lucide.createIcons();

    // Init tooltips
    tippy('[data-tippy-content]', {
        placement: 'top',
        animation: 'fade',
        delay: [100, 0],
        arrow: true,
    });
}
