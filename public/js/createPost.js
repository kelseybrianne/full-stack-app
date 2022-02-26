const createPost = async (event) => {
  event.preventDefault();
  const select = document.querySelector("#post-to-challenge");

  // Collect values from the create post form
  const challenge_id =
    select.options[select.selectedIndex].getAttribute("data-id");
  const text = document.querySelector("#post-text").value.trim();

  if (challenge_id && text) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({ challenge_id, text }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, reload the homepage
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector("#new-post-form")
  .addEventListener("submit", createPost);
