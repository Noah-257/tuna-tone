const frequencyInput = document.getElementById('frequencyInput');
const detectButton = document.getElementById('detectButton');
const noteDisplay = document.getElementById('noteDisplay');
const frequencyDisplay = document.getElementById('frequencyDisplay');
const centsDisplay = document.getElementById('centsDisplay');
const statusDisplay = document.getElementById('statusDisplay');

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

detectButton.addEventListener('click', () => {
    const frequency = parseFloat(frequencyInput.value);

    const noteNumber = Math.round(12 * (Math.log2(frequency / 440))) + 69;
    
    const roundedNoteNumber = Math.round(noteNumber);

    const noteIndex = ((roundedNoteNumber % 12) + 12) % 12; // Ensure the index is between 0 and 11

    const noteName = noteNames[noteIndex];

    const octave = Math.floor((roundedNoteNumber - 12) / 12);

    const targetFrequency = 440 * Math.pow(2, (roundedNoteNumber - 69) / 12);

    const cents = 1200 * Math.log2(frequency / targetFrequency);

    noteDisplay.textContent = `Detected Note: ${noteName}${octave}`;
    frequencyDisplay.textContent = `${frequency.toFixed(2)} Hz`;
    centsDisplay.textContent = `Cents: ${cents.toFixed(2)}`;

    // Update the status display based on the cents value
    if (Math.abs(cents) <= 5) {
        statusDisplay.textContent = "In Tune";
    } else if (cents < 0) {
        statusDisplay.textContent = "Flat";
    } else {
        statusDisplay.textContent = "Sharp"; 
    }    
});