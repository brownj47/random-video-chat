const logout = async () => {

  // Send a GET request to the API endpoint
  const response = await fetch('/logout');

  // send user to login page if successful
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

//listen for  clcks on the logout button
document.querySelector('#logout').addEventListener('click', logout);
