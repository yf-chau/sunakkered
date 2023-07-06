async function checkToken() {
    // Retrieve the user's token from local storage or cookies
    const token = await localStorage.getItem('token');
    
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
      window.location.assign("home.html");
    }
    
    signOut();
  });
  
  checkToken();
  