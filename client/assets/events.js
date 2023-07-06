

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        'Authorization': localStorage.getItem("token"),
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            event_name: form.get("eventTitle"),
            event_description: form.get("eventDescription"),
            location: form.get("borough"),
            event_start_date: form.get("eventDate"),
            event_start_time: form.get("eventTime"),              
        })
    }

    const response = await fetch("http://localhost:3000/events/create", options);
    // const response = await fetch("https://florincountycouncil.onrender.com/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("home.html");
    } else {
        alert(data.error);
    }
})

async function checkToken() {
    // Retrieve the user's token from local storage or cookies
    const token = await localStorage.getItem('token'); // If using 
    if (token && token !== "") {
      
        document.getElementById('signin-btn').style.display = 'none';
        document.getElementById('signout-btn').style.display = 'block';
        
      console.log("User is authenticated");
      // For example, you can show authenticated features or redirect the user to a different page
    } else {
        document.getElementById('signin-btn').style.display = 'block';
        document.getElementById('signout-btn').style.display = 'none';
      console.log("User is not authenticated");
      // For example, you can show a sign-in form or redirect the user to a login page
    }
  }
  function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (token && token !== '') {
      // User is authenticated
      showForm();
    } else {
      // User is not authenticated
      hideForm();
    }
  }
  
  // Show the form
  function showForm() {
    const form = document.getElementById('form');
    form.style.display = 'block';
  }
  
  // Hide the form
  function hideForm() {
    const form = document.getElementById('form');
    form.style.display = 'none';
  }
  
  // Call the checkAuthentication function to check the user's authentication status when the page loads
  window.addEventListener('load', checkAuthentication);


  document.getElementById("signout-btn").addEventListener("click", async (e) => {
    function signOut() {
        // Clear the user's token from local storage or cookies
        localStorage.removeItem('token'); // If using local storage
        if (response.status == 201) {
            window.location.assign("home.html");
              
        } else {
            alert(data.error);
        }
      } signOut()
  })
 
  checkToken();
  
