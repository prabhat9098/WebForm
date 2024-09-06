// Fetch event details from URL parameters when the page loads
window.onload = function () {
    // Get the event details from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const eventName = urlParams.get('eventName');
    const eventDate = urlParams.get('eventDate');
    const eventVenue = urlParams.get('eventVenue');

    // Populate the form fields with the fetched event details
    if (eventName) document.getElementById('eventName').value = eventName;
    if (eventDate) document.getElementById('eventDate').value = eventDate;
    if (eventVenue) document.getElementById('eventVenue').value = eventVenue;

    console.log('Fetched Event Details:', { eventName, eventDate, eventVenue });
};

// Function to handle form submission
function submitForm(event) {
    // Prevent default form submission behavior
    event.preventDefault();

    // Collect all form data
    const formData = {
        eventName: document.getElementById('eventName').value,
        eventDate: document.getElementById('eventDate').value,
        eventVenue: document.getElementById('eventVenue').value,
        title: document.getElementById('title').value,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        mobile: document.getElementById('mobile').value,
        email: document.getElementById('email').value,
        practiceName: document.getElementById('practiceName').value,
        dietaryRequirements: getDietaryRequirements(), // Fetch multiple selected options
        AHPRANumber: document.getElementById('AHPRANumber').value,
        RACGP: document.getElementById('RACGP').value,
        otherCPD: document.getElementById('otherCPD').value,
        terms: document.getElementById('terms').checked
    };

    console.log('Form Data:', formData);

    // Show success message after form submission
    alert("Form submitted successfully!");


    // Construct the URL with all form data as query parameters
    const baseURL = "https://dev-sjghc.creatio.com/0/ServiceModel/UsrAnonymousEventRegistrationService.svc/CreateEvent";
    const queryParams = Object.keys(formData)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(formData[key])}`)
        .join('&');
    const fullURL = `${baseURL}?${queryParams}`;

    // Redirect to the constructed URL to submit the data
    window.location.href = fullURL;
}


// Fetch selected dietary requirements, including 'Other' if specified
function getDietaryRequirements() {
    const dietarySelect = document.getElementById('dietaryRequirements');
    const selectedOptions = Array.from(dietarySelect.selectedOptions).map(option => option.value);
    
    // If 'Other' is selected, append the value from the input field
    if (selectedOptions.includes('Other')) {
        const otherDietary = document.getElementById('otherDietary').value;
        if (otherDietary) {
            // Remove 'Other' and add the specified value
            const index = selectedOptions.indexOf('Other');
            selectedOptions.splice(index, 1, otherDietary);
        }
    }
    
    return selectedOptions;
}

// Handle showing/hiding 'Other' dietary field
document.getElementById('dietaryRequirements').addEventListener('change', function() {
    const otherDietaryField = document.getElementById('otherDietaryField');
    if (Array.from(this.selectedOptions).some(option => option.value === 'Other')) {
        otherDietaryField.classList.remove('hidden');
    } else {
        otherDietaryField.classList.add('hidden');
        document.getElementById('otherDietary').value = ''; // Clear the other field if hidden
    }
});

// Attach the submitForm function to the form's submit event
document.getElementById('event-form').addEventListener('submit', submitForm);