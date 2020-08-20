var hypnoBall, position, database;

function setup(){
    database = firebase.database();

    createCanvas(500,500);
    hypnoBall = createSprite(250,250,10,10);
    hypnoBall.shapeColor = "red";

    var hypnoBallPos = database.ref('ball/position');

    hypnoBallPos.on('value', readPosition, showError);

}

function draw(){
    background("white");
    
    if(position !== undefined){

        if(keyDown(LEFT_ARROW)){
            writePosition(-5,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(5,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-5);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+5);
        }


        drawSprites();

    }
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x': position.x + x,
        'y': position.y + y
    });
}

function readPosition(data){    
    position = data.val();

    hypnoBall.x = position.x;
    hypnoBall.y = position.y;
}

function showError(){
    console.log("Error while accessing the database")
}