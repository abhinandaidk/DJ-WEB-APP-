song=""
LeftWristX = 0;
LeftWristY = 0;

RightWristX = 0;
RightWristY = 0;

score_leftwrist = 0;

function preload(){
song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);

    video= createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
if(results.length>0){
    score_leftwrist = results[0].pose.keypoints[9].score;
    score_rightwrist = results[0].pose.keypoints[10].score;
    console.log("Score RW =" + score_rightwrist + "Score LW = " + score_leftwrist);

    console.log(results);
    LeftWristX = results[0].pose.leftWrist.x;
    LeftWristY = results[0].pose.leftWrist.y;
    console.log("LeftWrist X = " +LeftWristX+ "Left Wrist Y = "+LeftWristY);

    RightWristX = results[0].pose.rightWrist.x;
    RightWristY = results[0].pose.rightWrist.y;
    console.log("RightWrist X = " + RightWristX + "Right Wrist Y = " + RightWristY);
}
}

function modelLoaded(){
    console.log("PoseNet initiailized");
}

function draw(){
    image(video,0,0,600,500);
    fill("#FF0000");
    stroke("#FF0000");

    if(score_rightwrist > 0.2){
    circle(RightWristX, RightWristY, 20);
    if(RightWristX > 0 && RightWristY<=100){
        document.getElementById("speed").innerHTML = "Speed = 0.5x";
        song.rate(0.5);
    }
    else if(RightWristX > 100 && RightWristY<=200){
        document.getElementById("speed").innerHTML = "Speed = 1x";
        song.rate(1);
    }
    else if(RightWristX > 200 && RightWristY<=300){
        document.getElementById("speed").innerHTML = "Speed = 1.5x";
        song.rate(1.5);
    }
    else if(RightWristX > 300 && RightWristY<=400){
        document.getElementById("speed").innerHTML = "Speed = 2x";
        song.rate(2);
    }
    else if(RightWristX > 400 && RightWristY<=500){
        document.getElementById("speed").innerHTML = "Speed = 2.5x";
        song.rate(2.5);
    }
   }


    if(score_leftwrist > 0.2){
    circle(LeftWristX, LeftWristY, 20);
    InNumberleftWristY = Number(LeftWristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
    }
}
function play(){
    song.play();
    song.setVolume();
    song.rate(1);
}