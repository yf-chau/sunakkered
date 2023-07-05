

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

