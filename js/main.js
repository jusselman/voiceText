//Init SpeechSynth API //

const synth = window.speechSynthesis;

//Dom elements //
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

// Init Voices Array //
let voices = [];

const getVoices = () => {
  voices = synth.getVoices();


  //Loop through voices and create an option for each one //
  voices.forEach(voice => {
    //create option element //
    const option = document.createElement('option');
    //fill the option with the voice and language
    option.textContent = voice.name + '('+ voice.lang +')';

    // Set needed option attributes //
    option.setAttribute('data-lang', voice.lang);
    option.setAttribute('data-name', voice.name);
    voiceSelect.appendChild(option);

  });
}

getVoices();

if(synth.onvoiceschanged !== undefined) {
  synth.onvoiceschanged = getVoices;
}

// Speak //
const speak = () => {


  //check if speaking //
  if(synth.speaking) {
    console.error('Already Speaking');
    return;
  }
  if(textInput.value !== '') {
    //background animation //
    body.style.background = '#000 url(img/wav.gif)';
    body.style.backgroundRepeat = 'repeat-x';
    body.style.backgroundSize = '100% 100%';
    //Get speak text //
    const speakText = new SpeechSynthesisUtterance(textInput.value);
    //Speak End //
    speakText.onend = e => {
      console.log('Done speaking...');
      body.style.background = '#000';
    }
    //Speak Error //
    speakText.onerror = e => {
      console.error('Something went wrong');
    };
    // Selected Voice //
      const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    // Loop through voices //
    voices.forEach(voice => {
      if(voice.name === selectedVoice) {
        speakText.voice = voice;
      }
    });

    // set pitch and rate
    speakText.rate = rate.value;
    speakText.pitch = pitch.value;
    // Speaking
    synth.speak(speakText);
    }
  };


  // Event listeners //

  //text form submit //
  textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
  });

  // rate value change //
  rate.addEventListener('change', e => (rateValue.textContent = rate.value));

  // rate value change //
  pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));

  // voice select change //
  voiceSelect.addEventListener('change', e => speak());
