const joinChallenge = async (event) => {
    event.preventDefault();

    const challenge_id = event.target.dataset.id;
    console.log(event.target)
    console.log(challenge_id);

      const response = await fetch("/api/userChallenge", {
        method: "POST",
        body: JSON.stringify({ challenge_id }),
        headers: { "Content-Type": "application/json" },
      });
      // This isn't taking me to the homepage.
      if (response.ok) {
        // document.location.replace("/");
      } else {
        alert("Failed to create account");
      }

  };
// document.querySelector(".join-in-btn").addEventListener("click", joinChallenge);

console.log($('.join-in-btn'))

$(".join-in-btn").on('click', joinChallenge)