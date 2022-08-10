const signupFormHandler = async (event) => {
    event.preventDefault();
    // get all input values
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //make sure they input all three values
    if (username && email && password) {

        console.log(email, username, password);
        //send a post request to /create-account with the values gathered above
        const response = await fetch('/create-account', {
            method: 'POST',
            body:  JSON.stringify({username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        // if the account is created, relocate the page to the main room
        if (response.ok) {  
            document.location.replace('/random/chat/mainroom');
        } else {
            alert(`Error: ${JSON.stringify(response.statusText)}`);
        };
    } else{
        alert('Please enter a username, email, and password.')
    };
};

// listen for form submission
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);