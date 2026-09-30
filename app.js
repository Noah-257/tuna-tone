const frequencyInput = document.getElementById('frequencyInput');
const detectButton = document.getElementById('detectButton');
const noteDisplay = document.getElementById('noteDisplay');
const frequencyDisplay = document.getElementById('frequencyDisplay');

detectButton.addEventListener('click', () => {
    const frequency = parseFloat(frequencyInput.value);

    console.log(frequency);
});