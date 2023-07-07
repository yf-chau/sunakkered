
window.onload = fetchData;
async function fetchData() {
    console.log("bananana")
    try {
      const response = await fetch("https://florincountycouncil.onrender.com/events/upcoming");
      const data = await response.json();
  
      const tbody = document.getElementById('dataBody');
  
   
      data.forEach(event => {
       
        const newRow = document.createElement('tr');
  
       
        const nameCell = document.createElement('td');
        nameCell.textContent = event.event_name;
        newRow.appendChild(nameCell);
  
        const dateCell = document.createElement('td');
        dateCell.textContent = event.event_start_date;
        newRow.appendChild(dateCell);
  
        const locationCell = document.createElement('td');
        locationCell.textContent = event.location;
        newRow.appendChild(locationCell);
        const popup = document.getElementById('popup');
        const signUpCell = document.createElement('td');
        const signUpImage = document.createElement('img');
        const signUpLink = document.createElement('a');
        signUpLink.href = '#';
        signUpImage.src = 'images/hand-up.png'; 
        signUpImage.length = 30
        signUpImage.width = 30
        signUpImage.style.margin = '30px';
        signUpLink.appendChild(signUpImage);
        signUpCell.appendChild(signUpImage);
        newRow.appendChild(signUpCell);
        signUpImage.addEventListener('click', function() {
            popup.style.display = 'block'; // Show the popup
          });
        tbody.appendChild(newRow);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  document.getElementById("popup").addEventListener("submit", async (e) => {
   
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        // 'Authorization': localStorage.getItem("token"),
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            
            description: form.get("description"),
            DBS: form.get("dbs"),
            skills: form.get("skills"),
            interest: form.get("interests"),
        })
    }

    const response = await fetch("http://localhost:3000/volunteer/create", options);
    // const response = await fetch("https://florincountycouncil.onrender.com/events/create", options);
    const data = await response.json();

    if (response.status == 201) {
        // Show the confirmation popup
        document.getElementById('confirmation').style.display = 'block';
      } else {
        // Show an alert with the error message
        alert(data.error);
      }
})

document.getElementById('close').addEventListener("click", function() {
    window.location.reload();
  });


async function checkToken() {
   
    const token = await localStorage.getItem('token');
    
    if (token && token !== "") {
      document.getElementById('signin-btn').style.display = 'none';
      document.getElementById('signout-btn').style.display = 'block';
      console.log("User is authenticated");
    
    } else {
      document.getElementById('signin-btn').style.display = 'block';
      document.getElementById('signout-btn').style.display = 'none';
      console.log("User is not authenticated");
  
    }
  }
  
  document.getElementById("signout-btn").addEventListener("click", async (e) => {
    function signOut() {
      localStorage.removeItem('token');
      window.location.assign("home.html");
    }
    
    signOut();
  });
  
  checkToken();
  