const createChallenge = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#challenge-title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const ending_date = document.querySelector('#datepicker').value.trim();
  
    console.log(title, description, ending_date);

    if (title && description && ending_date) {
      
      // Send a POST request to the API endpoint
      const response = await fetch('/api/challenge', {
        method: 'POST',
        body: JSON.stringify({ title, description, ending_date }),
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

  document.querySelector("#post-challenge-btn").addEventListener('submit', createChallenge);
