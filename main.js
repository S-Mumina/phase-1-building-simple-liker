// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
document.addEventListener('DOMContentLoaded', () => {
  const errorModal = document.getElementById('modal');
  const errorModalMessage = document.getElementById('modal-message');
  const likeButtons = document.querySelectorAll('.like');

  // Function to handle the server response
  function handleServerResponse(response) {
    if (response === "Pretend remote server notified of action!") {
      return FULL_HEART;
    } else {
      throw new Error("Server error");
    }
  }

  // Function to update heart appearance
  function updateHeartAppearance(heart) {
    heart.classList.toggle('activated-heart');
    if (heart.textContent === EMPTY_HEART) {
      heart.textContent = FULL_HEART;
    } else {
      heart.textContent = EMPTY_HEART;
    }
  }

  // Function to handle like button clicks
  function likeButtonClickHandler(event) {
    const heart = event.target;
    mimicServerCall()
      .then(response => {
        updateHeartAppearance(heart);
      })
      .catch(error => {
        errorModalMessage.textContent = error.message;
        errorModal.classList.remove('hidden');
        setTimeout(() => {
          errorModal.classList.add('hidden');
        }, 3000);
      });
  }

  // Add event listener to each like button
  likeButtons.forEach(button => {
    button.addEventListener('click', likeButtonClickHandler);
  });
});

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject(new Error("Random server error. Try again."));
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

