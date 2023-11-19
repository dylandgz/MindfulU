let scaleFactor = 1;
let modalImage;


let themeButton = document.getElementById("theme-button");
let searchIcon = document.getElementById('search-icon');

const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");
    if (searchIcon.src.endsWith('search-alt-2-svgrepo-dark-mode.svg')) {
        // If the icon is currently in light mode, change it to the dark mode icon
            searchIcon.src = 'search-alt-2-svgrepo-com.svg';
            searchIcon.alt = 'Dark Icon';
    } else {
        // If the icon is currently in dark mode, change it back to the light mode icon
            searchIcon.src = 'search-alt-2-svgrepo-dark-mode.svg';
            searchIcon.alt = 'Light Icon';
    }
    
};


themeButton.addEventListener("click", toggleDarkMode);



document.addEventListener('DOMContentLoaded', () => {

  const form = document.getElementById('sign-petition'); 
  const signaturesDiv = document.querySelector('.signatures'); 


    const validateForm = (event) => {
      event.preventDefault(); // Prevent the form from submitting traditionally

      let containsErrors = false;
      const formElements = form.elements;

      // Create the person object
      const person = {
        name: formElements["name"] ? formElements["name"].value : '',
        hometown: formElements["hometown"] ? formElements["hometown"].value : '',
        email: formElements["email"] ? formElements["email"].value : ''
      };

      // Regular expression for basic email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      // Validate the name and hometown text inputs
      if (person.name.length < 2 || person.hometown.length < 2) {
        // Add error class to the respective input if condition fails
        if (person.name.length < 2) formElements["name"].classList.add('error');
        if (person.hometown.length < 2) formElements["hometown"].classList.add('error');
        containsErrors = true;
      } else {
        // Remove error class if present
        formElements["name"].classList.remove('error');
        formElements["hometown"].classList.remove('error');
      }

      // Validate the email input
      if (!emailRegex.test(person.email)) {
        formElements["email"].classList.add('error');
        containsErrors = true;
      } else {
        formElements["email"].classList.remove('error');
      }

      // If there are no errors, proceed to add the signature
      if (!containsErrors) {
        addSignature(person); // Pass the person object to addSignature function
        toggleModal(person);
      }
    };

    // You will also need to refactor the addSignature function to accept the person object.



  const addSignature = () => {
    const name = document.querySelector('input[name="name"]').value;
    const hometown = document.querySelector('input[name="hometown"]').value;

    const newSignature = document.createElement('p');
    newSignature.textContent = `${name} from ${hometown} supports this.`;
    signaturesDiv.appendChild(newSignature);

    form.reset(); 
  };


  form.addEventListener('submit', validateForm);
});




let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};


// Select all containers that can be revealed
let revealableContainers = document.querySelectorAll('.revealable');

// Function to reveal containers
function reveal() {
  let windowHeight = window.innerHeight;

  for (let i = 0; i < revealableContainers.length; i++) {
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add('active');
    } else {
      revealableContainers[i].classList.remove('active');
    }
  }
}

// Add the reveal function as a scroll event listener
window.addEventListener('scroll', reveal);



// Assuming you have a person object structured like this:
// const person = { name: 'Syra van Narwhal', hometown: 'Las Vegas' };

function toggleModal(person) {
  // Select the modal and content elements
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');

  // Set the content of the modal
  modalContent.textContent = `Thank you so much ${person.name}! ${person.hometown} represent!`;

  // Display the modal
  modal.style.display = 'flex';





      // Select the image inside the modal
      modalImage = document.getElementById('modal-image-id'); // replace with your image's ID

      // Start the heartbeat animation
      const intervalId = setInterval(scaleImage, 500); // 500 milliseconds = 0.5 seconds

      // Stop the heartbeat animation after 4 seconds
      setTimeout(() => {
        clearInterval(intervalId);
        // ... existing code to hide the modal ...
      }, 4000);




    

  // Hide the modal after 4 seconds (4000 milliseconds)
  setTimeout(() => {
    modal.style.display = 'none';
  }, 4000);
}
function scaleImage() {
  // Toggle scaleFactor between 1 and 0.8
  scaleFactor = (scaleFactor === 1) ? 0.8 : 1;
  // Apply the transform to the modalImage
  modalImage.style.transform = `scale(${scaleFactor})`;
}
