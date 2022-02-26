const createPost = async (event) => {
    event.preventDefault();
    const select = document.querySelector('#post-to-challenge');

    // Collect values from the login form
    const challenge_id = select.options[select.selectedIndex].getAttribute('data-id');
    const text = document.querySelector("#post-text").value.trim();
  
    console.log(challenge_id, text );

    if (challenge_id && text) {
      
      // Send a POST request to the API endpoint
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({ challenge_id, text }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector("#new-post-form").addEventListener('submit', createPost);