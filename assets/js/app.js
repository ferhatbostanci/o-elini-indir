const video = document.querySelector('#video');
const audio = document.querySelector('#audio');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
const modelParams = {flipHorizontal: true, imageScaleFactor: 0.7, maxNumBoxes: 20, iouThreshold: 0.5, scoreThreshold: 0.79,};
let model;

handTrack.startVideo(video).then(status => {
    if(status){
        navigator.getUserMedia({video: {}}, stream => {
                video.srcObject = stream;
                setInterval(runDetection, 100);
            }, error => console.log(error)
        );
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        model.renderPredictions(predictions, canvas, context, video);
        if(predictions.length > 0 && audio.paused){
            audio.play();
        }
    });
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});