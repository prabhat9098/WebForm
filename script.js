document.getElementById('dietaryRequirements').addEventListener('change', function() {
    const otherDietaryField = document.getElementById('otherDietaryField');
    if (this.value === 'Other') {
        otherDietaryField.classList.remove('hidden');
    } else {
        otherDietaryField.classList.add('hidden');
        document.getElementById('otherDietary').value = '';
    }
});

document.getElementById('event-form').addEventListener('submit', function(event) {
    event.preventDefault();
    alert('Form submitted successfully!');
    // Add form submission logic here (e.g., sending data to a server)
});
