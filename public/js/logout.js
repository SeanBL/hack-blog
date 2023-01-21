//console.log("Logout js is connected");

const logout = async (event) => {
    //event.preventDefault();
    document.cookie = "loginToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/login;";
    console.log("Logout button is working")
    location.reload();
  }
  
  const logoutBtn = document.getElementById("logout-btn");
  logoutBtn.addEventListener("click", logout)