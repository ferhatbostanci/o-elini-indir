const video = document.getElementById('video');
const audio = document.getElementById('audio');
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d");
let model = null;

const modelParams = {
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 3,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.8,    // confidence threshold for predictions.
};

handTrack.load(modelParams).then(lmodel => {
    // detect objects in the image.
    model = lmodel;
    console.log("Loaded Model!");
});

handTrack.startVideo(video).then(function (status) {
    document.getElementById('preview-area').hidden = true;
    console.log("Video started", status);
    if(status){
        runDetection();
    }
});

function runDetection() {
    model.detect(video).then(predictions => {
        console.log("Predictions: ", predictions);
        model.renderPredictions(predictions, canvas, context, video);
        requestAnimationFrame(runDetection);
        if(predictions.length > 0 && audio.paused){
            audio.play();
        }
    });
}