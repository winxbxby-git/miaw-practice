let selectedMode = '';

function showForm(mode) {
    selectedMode = mode;
    const form = document.getElementById('authForm');
    const extras = document.getElementById('extraFields');
    const passField = document.getElementById('password');
    const btns = document.querySelectorAll('.nav-btn');
    
    form.classList.remove('hidden');
    btns.forEach(b => b.classList.remove('active-btn'));
    event.target.classList.add('active-btn');

    // Reset fields
    extras.innerHTML = '';
    passField.classList.remove('hidden');
    passField.required = true;

    if (mode === 'register') {
        document.getElementById('formTitle').innerText = "Create Account";
        extras.innerHTML = '<input type="text" id="fname" placeholder="First Name" required>' +
                          '<input type="text" id="lname" placeholder="Last Name" required>';
    } else if (mode === 'login') {
        document.getElementById('formTitle').innerText = "Existing User Login";
    } else if (mode === 'guest') {
        document.getElementById('formTitle').innerText = "Continue as Guest";
        passField.classList.add('hidden');
        passField.required = false;
        extras.innerHTML = '<input type="text" id="fname" placeholder="Display Name (Optional)">';
    }
}

document.getElementById('authForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const payload = {
        intent: selectedMode, // "register", "login", or "guest"
        user_info: {
            first_name: document.getElementById('fname')?.value || 'Guest',
            last_name: document.getElementById('lname')?.value || '',
            email: document.getElementById('email').value,
            is_authenticated: (selectedMode !== 'guest')
        },
        metadata: {
            source: window.location.href,
            browser: navigator.userAgent
        }
    };

    // Store in Session Storage for Agentforce to scrape
    sessionStorage.setItem('agentforce_payload', JSON.stringify(payload));
    
    document.getElementById('debug-output').innerHTML = 
        `<strong>Data Sent to Agentforce:</strong><pre>${JSON.stringify(payload, null, 2)}</pre>`;
});
