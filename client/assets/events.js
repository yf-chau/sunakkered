

document.getElementById("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
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

    //const response = await fetch("http://localhost:3000/events/create", options);
    const response = await fetch("https://florincountycouncil.onrender.com/events/create", options);
    const data = await response.json();

    if (response.status == 201) {
        window.location.assign("home.html");
    } else {
        alert(data.error);
    }
})

