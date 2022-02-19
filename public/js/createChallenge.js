const postChallengeBtn = document.querySelector("#post-challenge-btn")

const createChallenge = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#challenge-title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const endDate = document.querySelector('#description').value.trim();
  
    if (title && description) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/challenge', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the homepage
        document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  postChallengeBtn.addEventListener('submit', createChallenge);