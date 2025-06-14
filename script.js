const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('#voices');
const options = document.querySelectorAll('[name="rate"], [name="pitch"]');
const textarea = document.querySelector('#text');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

function populateVoices() {
  voices = speechSynthesis.getVoices();
  voicesDropdown.innerHTML = voices
    .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
    .join('');
}

function setVoice() {
  msg.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) speechSynthesis.speak(msg);
}

function setOption() {
  msg[this.name] = this.value;
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', () => {
  msg.text = textarea.value;
  toggle();
});
stopButton.addEventListener('click', () => toggle(false));

msg.text = textarea.value;