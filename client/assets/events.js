document.getElementById("inner-form").addEventListener("submit", async (e) => {
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

    // const response = await fetch("http://localhost:3000/events/create", options);
    const response = await fetch("https://florincountycouncil.onrender.com/events/create", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("home.html");
    } else {
        alert(data.error);
    }
})


async function checkToken() {
    // Retrieve the user's token from local storage or cookies
    const token = await localStorage.getItem('token');
    if (token && token !== "") {
        document.getElementById('inner-form').style.display = 'block';
        document.getElementById('signInPls').style.display = 'none'
        document.getElementById('signin-btn').style.display = 'none';
         document.getElementById('signout-btn').style.display = 'block';
        document.getElementById('pleaseSignUp').style.display = 'none';   
        let handleFormSubmit = true;
        console.log("User is authenticated");
        // For example, you can show authenticated features or redirect the user to a different page
    } else {
        document.getElementById('inner-form').style.display = 'none' ;
        document.getElementById('signin-btn').style.display = 'block';
        document.getElementById('pleaseSignUp').style.display = 'block';
        document.getElementById('signout-btn').style.display = 'none';
        document.getElementById('signInPls').style.display = 'block'
        let handleFormSubmit = false
        console.log("User is not authenticated");
        // For example, you can show a sign-in form or redirect the user to a login page
    }
}

// Call the checkToken function to check the user's authentication status when the page loads
window.addEventListener('load', checkToken);

document.getElementById("signInPls").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: form.get("username"),
            password: form.get("password")
        })
    }

    const response = await fetch("http://localhost:3000/users/login", options);
    // const response = await fetch("https://florincountycouncil.onrender.com/users/login", options);
    const data = await response.json();

    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        window.location.assign("events.html");
    } else {
        alert(data.error);
    }
})

document.getElementById("signout-btn").addEventListener("click", async (e) => {
    function signOut(response) {
        // Clear the user's token from local storage or cookies
        localStorage.removeItem('token'); // If using local storage
        if (response.status == 201) {
            window.location.assign("home.html");
        } else {
            alert(response.error);
        }
    }

    signOut();
})
checkToken()
