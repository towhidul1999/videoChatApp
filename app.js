const video = document.getElementById('video');
const muteBtn = document.getElementById('muteBtn');
const cameraOff = document.getElementById('cameraOff');
const selectCam = document.getElementById('selectCam');
const selectMic = document.getElementById('selectMic');

let mediaStream;
let mute = false;
let camera = true;

//sound mute/unmute handler
muteBtn.addEventListener('click', () => {
    if (mute) {
        mute = false;
        muteBtn.innerText = 'Mute';

        mediaStream.getAudioTracks()
            .forEach(track => {
                console.log(track);
                //unmute audio
                track.enabled = true;
            });
    } else {
        mute = true;
        muteBtn.innerText = 'Unmute';

        mediaStream.getAudioTracks()
            .forEach(track => {
                console.log(track);
                //mute audio
                track.enabled = false;
            });
    }
});

//camera off/on handler
cameraOff.addEventListener('click', () => {
    if (camera) {
        camera = false;
        cameraOff.innerText = 'Camera On';

        mediaStream.getVideoTracks()
            .forEach(track => {
                console.log(track);
                //turn off camera
                track.enabled = false;
            });
    } else {
        camera = true;
        cameraOff.innerText = 'Camera Off';

        mediaStream.getVideoTracks()
            .forEach(track => {
                console.log(track);
                //turn on camera
                track.enabled = true;
            });
    }
})

async function getMedia() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        mediaStream = stream;
        console.log(stream);
        displayMedia();
    } catch (error) {
        console.log(error);
    }
};

getMedia();

function displayMedia() {
    video.srcObject = mediaStream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
};

async function getAllCameras() {
    try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        console.log(allDevices);
        allDevices.forEach(device => {
            if (device.kind === 'videoinput') {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label;
                selectCam.appendChild(option);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

getAllCameras();

async function getAllMicrophone() {
    try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        console.log(allDevices);
        allDevices.forEach(device => {
            if (device.kind === 'audioinput') {
                const option = document.createElement('option');
                option.value = device.deviceId;
                option.textContent = device.label;
                selectMic.appendChild(option);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

getAllMicrophone();