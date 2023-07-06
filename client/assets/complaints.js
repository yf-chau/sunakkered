
// create a users_id variable as it is used quite often in the script
let users_id;

window.onload = async function () {
    users_id = await loadUserId();
    loadComplaintList(users_id);
};

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
            location: form.get("borough"),
            category: form.get("category"),
            isfixed: false
        })
    }

    // create the complaint
    //const response = await fetch("http://localhost:3000/complaints/create", options);
    const response = await fetch("https://florincountycouncil.onrender.com/users/register", options);
    const data = await response.json();

    //When creating the complaint, also vote for the complaint
    const vote_options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'complaint_id': data.id
        })
    }
    //const vote_response = await fetch(`http://localhost:3000/complaints/votecomplaint/${users_id}`, vote_options)
    const vote_response = await fetch(`https://florincountycouncil.onrender.com/complaints/votecomplaint/${users_id}`, vote_options)

    if (response.status !== 201) {
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


async function loadUserId() {
    const token = localStorage.getItem('token')
    //const user_id_response = await fetch(`http://localhost:3000/users/getid/${token}`);
    const user_id_response = await fetch(`https://florincountycouncil.onrender.com/users/getid/${token}`);
    const user_id_result = await user_id_response.json()
    return user_id_result.users_id
}

async function loadComplaintList(users_id) {
    try {
        //const response = await fetch("http://localhost:3000/complaints/isfalse");
        const response = await fetch("https://florincountycouncil.onrender.com/complaints/isfalse");
        const data = await response.json()

        const complaintList = document.querySelector("#complaint-list")

        //Check if the user upvoted the complaints and grey them out if they have not
        //const user_vote_response = await fetch(`http://localhost:3000/complaints/showcomplaint/${users_id}`)
        const user_vote_response = await fetch(`https://florincountycouncil.onrender.com/complaints/showcomplaint/${users_id}`)

        let user_vote_result_array = []

        if (user_vote_response.status != 404) {
            const user_vote_result = await user_vote_response.json()
            user_vote_result_array = user_vote_result.map(complaint => complaint.complaint_id);
        }

        for (let i = 0; i < data.length; i++) {
            let div = document.createElement("div")
            div.classList.add(`complaint-item`)
            div.setAttribute("id", data[i].id);

            let li = document.createElement("li")
            li.textContent = data[i].title
            li.addEventListener("click", function () {
                complaintClick(data[i], users_id);
            });

            let div_votesBox = document.createElement("div")
            div_votesBox.classList.add(`votesBox`)

            let div_vote = document.createElement("div")
            div_vote.classList.add(`vote`)
            let img = document.createElement("img");
            img.src = "images/exclamation-mark.png";
            img.alt = "Exclamation point";
            img.style.filter = "grayscale(100%)";

            user_vote_result_array.forEach(function (complaint_id) {

                if (complaint_id == data[i].id) {
                    img.style.filter = ""
                }
            })

            div_vote.appendChild(img);

            let div_vote_number = document.createElement("div")
            div_vote_number.classList.add(`votes`)
            div_vote_number.textContent = data[i].votes

            div_votesBox.appendChild(div_vote)
            div_votesBox.appendChild(div_vote_number)

            div.appendChild(li)
            div.appendChild(div_votesBox)

            complaintList.appendChild(div)
        }
    } catch (error) {
        console.error("Error", error)
    }
}

async function complaintClick(dataItem, users_id) {

    document.getElementById("modal-title").textContent = dataItem.title
    document.getElementById("modal-category").textContent = dataItem.category
    document.getElementById("modal-description").textContent = dataItem.description
    document.getElementById("modal-location").textContent = dataItem.location

    //Check if the user upvoted this complaint
    //const user_vote_response = await fetch(`http://localhost:3000/complaints/showcomplaint/${users_id}`)
    const user_vote_response = await fetch(`https://florincountycouncil.onrender.com/complaints/showcomplaint/${users_id}`)

    if (user_vote_response.status != 404) {
        const user_vote_result = await user_vote_response.json()
        Object.values(user_vote_result).forEach(value => {
            if (dataItem.id === value.complaint_id) {
                document.getElementById("modal-checkbox").checked = "checked"
            }
        })
    }

    document.getElementById("closeComplaint").setAttribute("complaint_id", dataItem.id);
    document.getElementById("closeComplaint").setAttribute("users_id", users_id);

    complaintModal.style.display = "block";
}
