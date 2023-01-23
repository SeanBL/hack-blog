document.getElementById('login_form').addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);

    document.getElementById("errors").textContent = "";
    fetch("/api/user/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password,
        }),
    }).then((result) => {
        if (!result.ok) {
            document.getElementById("errors").textContent = "Unable to login";
        } else {
            window.location.replace('/homepage');
        }
    })
});
