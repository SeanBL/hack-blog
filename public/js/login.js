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
            return null;
        } else {
            return result.json();
        }
    })
});

document.getElementById('signup_form').addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username_register").value;
    const password = document.getElementById("password_register").value;
    console.log(username, password);

    document.getElementById("signup_errors").textContent = "";
    fetch("/api/user", {
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
            document.getElementById("signup_errors").textContent = "Unable to create user";
            return null;
        } else {
            return result.json();
        }
    })
});