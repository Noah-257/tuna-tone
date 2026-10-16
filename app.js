const frequencyInput = document.getElementById('frequencyInput');
const detectButton = document.getElementById('detectButton');
const noteDisplay = document.getElementById('noteDisplay');
const frequencyDisplay = document.getElementById('frequencyDisplay');
const centsDisplay = document.getElementById('centsDisplay');
const statusDisplay = document.getElementById('statusDisplay');
const startMicrophoneButton = document.getElementById('startMicrophoneButton');

const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

detectButton.addEventListener('click', () => {
    const frequency = parseFloat(frequencyInput.value);

    //Make sure that the frequency is a valid number 
    if (isNaN(frequency) || frequency <= 0) {
        noteDisplay.textContent = "Detected Note: --";
        frequencyDisplay.textContent = "Enter a valid frequency";
        centsDisplay.textContent = "Cents: --";
        statusDisplay.textContent = "Status: --";
        return;
    }

    // Calculate the note number based on the frequency
    const noteNumber = Math.round(12 * (Math.log2(frequency / 440))) + 69;
    
    // Round the note number to the nearest integer to find the closest note
    const roundedNoteNumber = Math.round(noteNumber);

    // Calculate the note index within the octave (0-11) using modulo operation
    const noteIndex = ((roundedNoteNumber % 12) + 12) % 12; // Ensure the index is between 0 and 11

    // Get the note name from the noteNames array using the calculated index
    const noteName = noteNames[noteIndex];

    // Calculate the octave number based on the rounded note number
    const octave = Math.floor((roundedNoteNumber - 12) / 12);

    // Calculate the target frequency for the detected note
    const targetFrequency = 440 * Math.pow(2, (roundedNoteNumber - 69) / 12);

    // Calculate the cents difference between the detected frequency and the target frequency
    const cents = 1200 * Math.log2(frequency / targetFrequency);

    // Update the displays with the detected note, frequency, and cents
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

startMicrophoneButton.addEventListener('click', async () => {
    try {
        // Request microphone access
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Create an AudioContext to process the audio stream
        const audioContext = new AudioContext();

        // Create a MediaStreamSource from the microphone stream
        const source = audioContext.createMediaStreamSource(stream);

        // Create an AnalyserNode to analyze the audio data
        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 2048; // Set the FFT size for frequency analysis

        // Connect the source to the analyser
        source.connect(analyser);

        // Create a buffer to hold the audio data
        const buffer = new Float32Array(analyser.fftSize);

        console.log('Microphone access granted');
        console.log("AudioContext:", audioContext);
        console.log("Analyser:", analyser);

        startMicrophoneButton.textContent = "Microphone Started";

        // Function to read audio data from the analyser
        function readAudio(){
            // Get the time domain data from the analyser and store it in the buffer
            analyser.getFloatTimeDomainData(buffer);

            console.log(buffer);

            // Call the readAudio function again on the next animation frame to continuously read audio data
            requestAnimationFrame(readAudio);
        }

        readAudio();

    } catch (error) {
        console.error('Error accessing microphone:', error);
    }
});