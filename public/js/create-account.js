const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        console.log(email, username, password)
        const response = await fetch('/create-account', {
            method: 'POST',
            body:  JSON.stringify({username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });


        if (response.ok) {
            document.location.replace('/videochat');
        } else {
            alert(response.statusText);
        };
    };
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);