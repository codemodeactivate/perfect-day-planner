
document.querySelector(".signup-form").addEventListener("submit", function(event) {
    const password = document.querySelector('input[name="password"]').value;
    const confirmPassword = document.querySelector('input[name="confirmPassword"]').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        event.preventDefault();
        alert("Passwords do not match.");
        return;
    }

    // Check password strength
    const passwordStrength = zxcvbn(password);
    if (passwordStrength.score < 3) {
        event.preventDefault();
        alert("Password is too weak.");
    }
});

