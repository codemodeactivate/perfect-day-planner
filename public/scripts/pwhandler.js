
document.querySelector(".signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        event.preventDefault();
        //alert("Passwords do not match.");
        return;
    }

    // Check password strength
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
        event.preventDefault();
        //alert("Password is too weak.");
    }

    // Send the form data to the server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: document.querySelector('input[name="username"]').value,
            email: document.querySelector('input[name="email"]').value,
            password: password,
            confirmPassword: confirmPassword
        })
    })
    .then(response => {
        if (!response.ok) {
            throw response;
        }
        return response.json(); //we only get here if there is no error
    })
    .then(data => {
        window.location.href = "/dashboard";
    })
    .catch(err => {
        err.json().then(errorMessage => {
            document.getElementById('error-message').textContent = errorMessage.message;
        })
    });
    });
