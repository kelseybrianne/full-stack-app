const joinChallenge = async (event) => {
  event.preventDefault();

  const challenge_id = event.target.dataset.id;

  const response = await fetch("/api/userChallenge", {
    method: "POST",
    body: JSON.stringify({ challenge_id }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to join challenge");
  }
};

$(".join-in-btn").on("click", joinChallenge);
