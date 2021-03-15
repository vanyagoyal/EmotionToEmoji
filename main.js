Webcam.set({
    height:300 ,
    width:350 ,
    image_format:'png' ,
    png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach(camera);

function snap(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='image' src='"+data_uri+"' >";
    });
}

console.log("ml5 version-" , ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/gKUM6EKiB/model.json',modelloaded);

function modelloaded(){
    console.log("Model Loaded!!");
}

function speak(){
    var synth = window.speechSynthesis;
    data1 = "The First Prediction is " + pre1;
    data2 = "The Second Prediction is " + pre2;
    var utter = new SpeechSynthesisUtterance(data1 + data2);
    utter.rate = 0.5;
    synth.speak(utter);
}

function check(){
    img = document.getElementById("image");
    classifier.classify(img , gotresult);
}

function gotresult(error , result){
    if (error){
        console.error(error);
    } else {
        console.log(result);
    }

    document.getElementById("result_ename").innerHTML = result[0].label;
    document.getElementById("result_ename2").innerHTML = result[1].label;

    pre1 = result[0].label;
    pre2 = result[1].label;

    speak();

    if (result[0].label == "Happy") 
    {
        document.getElementById("update_e").innerHTML = '&#128522;';
        document.getElementById("quote").innerHTML = "Be happy with what you have. Be excited about what you want.";
    } 
    else if (result[0].label == "Sad") 
    {
        document.getElementById("update_e").innerHTML = '&#128532;';
        document.getElementById("quote").innerHTML = "Stop crying about what happened, Start smiling at what you can.";
    } 
    else if(result[0].label == "Angry") 
    {
        document.getElementById("update_e").innerHTML = '&#128548;';
        document.getElementById("quote").innerHTML = "Angry people are not always wise.";
    }


    if (result[1].label == "Happy") 
    {
        document.getElementById("update_e2").innerHTML = '&#128522;';
    } 
    else if (result[1].label == "Sad") 
    {
        document.getElementById("update_e2").innerHTML = '&#128532;';
    } 
    else if(result[1].label == "Angry") 
    {
        document.getElementById("update_e2").innerHTML = '&#128548;';
    }
}