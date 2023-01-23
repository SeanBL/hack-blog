//console.log("Logout js is connected");

const logout = (event) => {
    //event.preventDefault();
    document.cookie = "logintoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=localhost";
    console.log("Logout button is working")
    //location.href('/');
  }
  
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", logout)