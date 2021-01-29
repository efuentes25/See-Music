
let song, button, uploadedAudio;
let fft, wave;
let w, c;

//Different Tracks
let tracks = ["Without You.mp3", "His Theme.mp3", "Can't Hold Us.mp3","The Weeknd Missed You.mp3",
  "How Deep Is Your Love.mp3",
  "Lost Sky Dreams.mp3"]; 

//loads the music
function preload() {
  song = loadSound(tracks);

}
 

//Calls uploadedAudioPlay function to get song
function manual_load(path) {
  uploadedAudio = loadSound(path, uploadedAudioPlay);
}

//song becomes the new file
function uploadedAudioPlay(audioFile) {


  if (song.isPlaying()) {
    song.pause();
  }

  song = audioFile;
  song.loop();

}


function setup() {
  let cnv = createCanvas(950, 600);
  colorMode(HSB);
  button = createButton("play");
  button.mousePressed(playButton);
  keyTyped();
  c = 1;

  fft = new p5.FFT(0.8, 16);
  wave = new p5.FFT();
  

  w = width / 30;

  
}

function draw() {
  background(0);
  
  messages();
  drawWave();
  let spectrum = fft.analyze();
  for (let i = 0; i < spectrum.length; i++) {
    let amp = spectrum[i];
    let y = map(amp, 0, 600, height, 0);
    fill(spectrum[i], 85, 100);
    noStroke();
    rect((i * w) + width * 0.50, y, w - 2, height);
    rect(width * 0.49 - (i * w), y, w - 2, height);
    //rect(i * w, y, w - 2, height - y);
    // rect(width - (i * w), y, w, height);
  }

}

function drawWave() {
  let waveform = wave.waveform();
  noFill();
  beginShape();
  for (let i = 0; i < waveform.length; i++) {
    let x = map(i, 0, waveform.length, 0, width);
    let y = map(waveform[i], -1, 1, 0, height);
    if (waveform[i] < -0.01) {
      stroke(360, 100, 100);
    } else if (waveform[i] < 0.02 && waveform[i] > -0.01) {
      stroke(60, 100, 100);
    } else if (waveform[i] < 0.05 && waveform[i] > 0.02) {
      stroke(125, 100, 100);
    } else if (waveform[i] < 0.06 && waveform[i] > 0.05) {
      stroke(232, 100, 100);
    }
    else {
      stroke(278, 100, 100);
    }

    vertex(x, y);
  }
  endShape();
}

function messages(){
  fill(255);

  textSize(12);
  text(("Press spacebar to start or the play button"), width * 0.02, 30);
  text(("Press the number keys to switch tracks --->"), width * 0.02, 50);
  text(("0: Without You by Avicii "), width * 0.29, 30);
  text(("1: His Theme / Undertale by Toby Fox"), width * 0.57, 30);
  text(("2: Can't Hold Us by Macklemore "), width * 0.29, 50);
  text(("3: Missed You by The Weenkd"), width * 0.57, 50);
  text(("4: How Deep is Your Love by Calvin Harris "), width * 0.29, 70);
  text(("5: Lost Sky by Dreams"), width * 0.57, 70);



  fill(c, 85, 100);
  textSize(30);
  text("SEE MUSIC", width * .81, 40);

  textSize(15);
  fill(255);
  text("Low Frequency", width * 0.02, height * .25);
  text("High Frequency", width * 0.45, height * .25);
  text("Low Frequency", width * .85, height * .25);

  c = c % 360;
  c++;
}
// This is the play/pause button on the screen. 
function playButton() {
  if (!song.isPlaying()) {
    song.play();
    button.html("pause");
    console.log("Playing")
  } else {
    song.pause(); 
    button.html("play");
    console.log("Not Playing")
  }
}

// If the spacebar is pressed, it play/pauses the music
function keyTyped() {
  if (!song.isPlaying() && (key == " ")) {
    song.play();
    console.log("Playing")
  }
  else {
    song.pause();
    console.log("Not Playing");
  }
}

//calls Manual load function and returns song by specific index
function play_new_song(index) {
  manual_load(tracks[index]);

}

//Listens for the users keyCode and sends index
window.addEventListener('keypress', function (e) {
  let keyCode = e.keyCode;

  // audio switching
  if (keyCode >= 48 && keyCode <= 53) {
    let index = keyCode - 48;
    play_new_song(index);
    console.log(keyCode);
  }
}); 