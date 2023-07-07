document.getElementById("register-form").addEventListener("submit", async (e) => {
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
            password: form.get("password"),
            first_name: form.get("first_name"),
            last_name: form.get("last_name"),
            phone_number: form.get("phone-number"),
            email: form.get("email"),
            above18: form.get("above18") === "on", 
            borough: form.get("borough")            
        })
    }

    //const response = await fetch("http://localhost:3000/users/register", options);
    const response = await fetch("https://florincountycouncil.onrender.com/users/register", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("sign-in.html");
    } else {
        alert(data.error);
    }
})
