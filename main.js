status="";
baby=[];
detection="";
alarm="";
function preload(){
    alarm=loadSound("Alarm.wav");
}
function setup(){
    canvas=createCanvas(350,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(350,380);
    video.hide();   
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Baby";
}
function modelLoaded(){
    console.log("Model Loaded");
    status=true;    
}
function draw(){
    image(video,0,0,350,380);
    if(status !=""){
    objectDetector.detect(video,gotResult);   
    for(i=0;i<baby.length;i++){
        document.getElementById("status").innerHTML="Status: Detecting Baby";
        fill("#000000");
        percent=floor(baby[i].confidence*100);
        text(baby[i].label+ " "+percent+"%",baby[i].x+15,baby[i].y+15);
        noFill();
        stroke("#000000");
        rect(baby[i].x,baby[i].y,baby[i].width,baby[i].height);
}
    if(baby[i].label=="person"){
        document.getElementById("detection").innerHTML="Baby Found";
        console.log("Stop!");
        alarm.stop();
    }
    else{
        document.getElementById("detection").innerHTML="Baby Not Found";
console.log("Play!");
alarm.play();
    }
}
    if(baby.length==0){
        document.getElementById("detection").innerHTML="Baby Not Found";
        console.log("Play!");
        alarm.play();
    }
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        baby=results;
    }
}