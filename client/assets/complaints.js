

document.getElementById("complaint-form").addEventListener("submit", async (e) => {
    
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: form.get("title"),
            description: form.get("description"),
            location: form.get("location"),           
        })
    }

    const response = await fetch("http://localhost:3000/complaints/create", options);
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
