nosex = 0;
nosey = 0;

function preload() {
    Mustache = loadImage('https://i.postimg.cc/zfWpBv4X/mustache-png.webp');
}

function setup() {
    canvas = createCanvas(550, 400);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(550, 400);
    video.hide();
    poseNet = ml5.poseNet(video, model_loaded);
    poseNet.on("pose", got_poses);
}

function draw() {
    image(video, 0, 0, 550, 400);
    image(Mustache, nosex, nosey, 60, 30);
}

function capture() {
    save("MustacheFilterImage.png");
}

function model_loaded() {
    console.log("PoseNet Initialized!");
}

function got_poses(results) {
    if (results.length > 0) {
        console.log(results);
        console.log("Nose X = " + (results[0].pose.nose.x).toFixed(2) + ", Nose Y = " + (results[0].pose.nose.y).toFixed(2));
        nosex = (results[0].pose.nose.x).toFixed(2) - 30;
        nosey = (results[0].pose.nose.y).toFixed(2) + 15;
    }
}