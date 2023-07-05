window.onload = loadUpcomingEvents;

async function loadUpcomingEvents() {
    try {
        const response = await fetch("https://florincountycouncil.onrender.com/events/upcoming");
        const data = await response.json()

        const eventList = document.querySelector("#upcoming-events")

        for (let i = 0; i < data.length; i++) {
            const formattedDate = new Date(data[i].event_start_date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });

            const formattedStartTime = new Date(`1970-01-01T${data[i].event_start_time}`).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            });

            const formattedEndTime = new Date(`1970-01-01T${data[i].event_end_time}`).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
            });

            let li = document.createElement("li")
            li.textContent = data[i].event_name
            eventList.appendChild(li)

            let ul = document.createElement("ul")
            ul.classList.add("sub-list")
            eventList.appendChild(ul)

            let sub_li1 = document.createElement("li")
            sub_li1.textContent = (`Date: ${formattedDate} \ ${formattedStartTime} - ${formattedEndTime}`)
            ul.appendChild(sub_li1)

            let sub_li2 = document.createElement("li")
            sub_li2.textContent = (`Location: ${data[i].location}`)
            ul.appendChild(sub_li2)
        }
    } catch (error) {
        console.error("Error", error)
    }
}
