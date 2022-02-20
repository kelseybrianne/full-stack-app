const createChallenge = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const title = document.querySelector('#challenge-title').value.trim();
    const description = document.querySelector('#description').value.trim();
    const endDate = document.querySelector('#datepicker').value.trim();
  
    console.log(title, description, endDate);

    if (title && description && endDate) {
      // Send a POST request to the API endpoint
    
      const response = await fetch('/api/challenge', {
        method: 'POST',
        body: JSON.stringify({ title, description, endDate }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the homepage
        // document.location.replace('/');
      } else {
        alert(response.statusText);
      }
    }
  };

  document.querySelector("#post-challenge-btn").addEventListener('submit', createChallenge);
