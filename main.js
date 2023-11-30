status="";
objects=[];
function setup(){
    canvas=createCanvas(500, 500);
    canvas.center();
    canvas.position(380,250);
    video=createCapture(VIDEO);
    video.hide();
}
function draw(){
    image (video, 0, 0, 500, 500);
    if(status!= ""){
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="status:object detected";
            document.getElementById("number_of_objects").innerHTML="number of ojects detected are:" + objects.length;
            fill("#FF0000");
            percent=floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15 );
            noFill();
            stroke("#FF0000");
       rect( objects[i].x, objects[i].y, objects[i].width, objects[i].height);

        }
    }
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;

}
function start(){
objectDetector=ml5.objectDetector('cocossd', modelLoaded);
document.getElementById("status").innerHTML="status: detecting objects";
object_name=document.getElementById("object_name").value;
}
function modelLoaded(){
    console.log('Model is loaded');
    status=true;
}