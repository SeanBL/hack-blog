//Update blog
document.getElementById("update-btn").addEventListener("click", (event) => {
    event.preventDefault();
    console.log("works");

    const body = document.getElementById("blog-content").value;
    const title = document.getElementById("blog-title").value;
    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    console.log(body, blog_id);

    fetch(`/api/blogpost/${blog_id}`, {
        method: 'PUT',
        headers: {
            'content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            body,
        }),
    }).then((result) => {
        if (!result.ok) {
            document.getElementById("update-error").textContent("failed to update blog");
        } else {
            //window.location.reload();
            document.location.replace('/dashboard');
        }
    });
});

document.getElementById("delete-btn").addEventListener("click", (event) =>{
    event.preventDefault();
    console.log("works");

    const blog_id = window.location.toString().split('/')[window.location.toString().split('/').length -1];
    console.log(blog_id);

    fetch(`/api/blogpost/${blog_id}`, {
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
    }).then((result) => {
        if (!result.ok) {
            document.getElementById("delete-error").textContent("failed to delete.");
        } else {
            document.location.replace('/dashboard');
        }
    });

});
