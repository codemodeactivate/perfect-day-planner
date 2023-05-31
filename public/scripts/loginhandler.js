document.querySelector(".login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Check if fields are empty
    if (!email || !password) {
        document.getElementById('error-message').textContent = "Please fill out all fields.";
        return;
    }

    // Validate email format
    if (!/\S+@\S+\.\S+/.test(email)) {
        document.getElementById('error-message').textContent = "Please enter a valid email.";
        return;
    }

    // Check password length
    if (password.length < 8) {
        document.getElementById('error-message').textContent = "Password should be at least 8 characters long.";
        return;
    }

    // Send the form data to the server
    document.querySelector(".login-form").addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.querySelector('input[name="email"]').value;
        const password = document.querySelector('input[name="password"]').value;

        // ...

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => {
            if (!response.ok) {
                throw response;
            }
            return response.json(); //we only get here if there is no error
        })
        .then(data => {
            if (data.message === "Login successful!") {
                window.location.href = "/dashboard";
            } else if (data.error) {
                document.getElementById('error-message').textContent = data.error;
            }
        })
        .catch(err => {
            err.json().then(errorMessage => {
                document.getElementById('error-message').textContent = errorMessage.message;
            })
        })
    })
})
