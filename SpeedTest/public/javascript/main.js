// Setup three.js WebGL renderer. Note: Antialiasing is a big performance hit.
// Only enable it if you actually need to.
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setPixelRatio(window.devicePixelRatio);

// Append the canvas element created by the renderer to document body element.
document.body.appendChild(renderer.domElement);

// Create a three.js scene.
var scene = new THREE.Scene();

// Create a three.js camera.
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
var controls = new THREE.VRControls(camera);
controls.standing = false; //adds 1.6 to height if set true

// Apply VR stereo rendering to renderer.
var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

//Add some light
scene.add( new THREE.AmbientLight( 0xcccccc ) );

var skyLoader = new THREE.TextureLoader();
skyLoader.load("img/main_side.png", function(texture) {
    var geometry = new THREE.CylinderGeometry( 100, 100, 150,32, 1, true );
    var material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide
    });
    skybox = new THREE.Mesh(geometry, material);
    scene.add(skybox);
    setupStage();
});

var edgeCircleLoader = new THREE.TextureLoader();
edgeCircleLoader.load("img/circle_edge.png", function(texture) {
    var geometry = new THREE.CircleGeometry( 110, 32 );
    var material = new THREE.MeshBasicMaterial({
        map: texture
    });
    var edgeCircle_bottom = new THREE.Mesh(geometry, material);
    var edgeCircle_top = new THREE.Mesh(geometry, material);
    edgeCircle_bottom.position.y = -80;
    edgeCircle_bottom.lookAt(camera.position);
    edgeCircle_top.position.y = 80;
    edgeCircle_top.lookAt(camera.position);
    scene.add(edgeCircle_top);
    scene.add(edgeCircle_bottom);
});

// parent pivot point
parentPivot = new THREE.Object3D();
scene.add( parentPivot );

// pivots
var pivotCar = new THREE.Object3D();
var pivotPlane = new THREE.Object3D();
var pivotTrain = new THREE.Object3D();
var pivotLoop = new THREE.Object3D();
pivotCar.rotation.z = 0;
pivotPlane.rotation.z = 0;
pivotTrain.rotation.z = 0;
pivotLoop.rotation.z = 0;
parentPivot.add( pivotCar );
parentPivot.add( pivotPlane );
parentPivot.add( pivotTrain );
parentPivot.add( pivotLoop );

var car_distance = 0, train_distance = 0, plane_distance = 0, loop_distance = 0;

//creates objects and loads them into scene

var car_mtlLoader = new THREE.MTLLoader();
    car_mtlLoader.load( 'models/car.mtl', function( materials ) {
        materials.preload();
        var car_objLoader = new THREE.OBJLoader();
        car_objLoader.setMaterials( materials );
        car_objLoader.load( 'models/car.obj', function ( object ) {
            object.scale.set(.1,.1,.1);
            object.name = "car";
            object.rotation.x = .6;
            object.position.set(0,-.68,-2);
            pivotCar.add( object );
            });
    });

var plane_mtlLoader = new THREE.MTLLoader();
    plane_mtlLoader.load( 'models/plane.mtl', function( materials ) {
        materials.preload();
        var plane_objLoader = new THREE.OBJLoader();
        plane_objLoader.setMaterials( materials );
        plane_objLoader.load( 'models/plane.obj', function ( object ) {
            object.scale.set(.1,.1,.1);
            object.name = "plane";
            object.rotation.x = .7;
            object.position.set(0,.8,-2);
            pivotPlane.add( object );
        });
    });

var train_mtlLoader = new THREE.MTLLoader();
    train_mtlLoader.load( 'models/train.mtl', function( materials ) {
        materials.preload();
        var train_objLoader = new THREE.OBJLoader();
        train_objLoader.setMaterials( materials );
        train_objLoader.load( 'models/train.obj', function ( object ) {
            object.scale.set(.1,.1,.1);
            object.name = "train";
            object.rotation.x = .5;
            object.position.set(0,-.432,-2);
            pivotTrain.add( object );
        });
    });

var loop_mtlLoader = new THREE.MTLLoader();
    loop_mtlLoader.load( 'models/loop.mtl', function( materials ) {
        materials.preload();
        var loop_objLoader = new THREE.OBJLoader();
        loop_objLoader.setMaterials( materials );
        loop_objLoader.load( 'models/loop.obj', function ( object ) {
            object.scale.set(.05,.05,.05);
            object.name = "loop";
            object.rotation.x = .19;
            object.position.set(0,.35,-2);
            pivotLoop.add( object );
        });
    });


//Loads text
 var textMaterial = new THREE.MeshBasicMaterial( { color: 0xffffff } );
var font_type, font_param;

var textLoader = new THREE.FontLoader();
textLoader.load( 'lib/helvetiker_regular.typeface.json', function ( font ) {
    font_type = font;
    font_param = {
        font: font_type,
        size: 1,
        height: .001,
        curveSegments: 2
    }
    
    car_textLoader();
    plane_textLoader();
    train_textLoader();    
    loop_textLoader();    
});

function car_textLoader() {
    var textGeo = new THREE.TextGeometry(car_distance + " miles", font_param);
    textGeo.computeBoundingBox();
    var textMesh = new THREE.Mesh( textGeo, textMaterial );
    textMesh.name = "carSprite"; 
    textMesh.position.set(2.7,-7.52,-20 );                     
    pivotCar.add( textMesh );
}

function plane_textLoader() {
    var textGeo = new THREE.TextGeometry(plane_distance + " miles", font_param);
    textGeo.computeBoundingBox();
    var textMesh = new THREE.Mesh( textGeo, textMaterial );
    textMesh.name = "planeSprite"; 
    textMesh.position.set(5.4, 8.28,-20 );                     
    pivotPlane.add( textMesh );
} 


function train_textLoader() {
    var textGeo = new THREE.TextGeometry(train_distance + " miles", font_param);
    textGeo.computeBoundingBox();
    var textMesh = new THREE.Mesh( textGeo, textMaterial );
    textMesh.name = "trainSprite"; 
    textMesh.position.set(4.9, -4.28,-20 );                     
    pivotTrain.add( textMesh );
}

function loop_textLoader() {
    var textGeo = new THREE.TextGeometry(loop_distance + " miles", font_param);
    textGeo.computeBoundingBox();
    var textMesh = new THREE.Mesh( textGeo, textMaterial );
    textMesh.name = "loopSprite"; 
    textMesh.position.set(2.9, 3.32,-20 );                     
    pivotLoop.add( textMesh );
}



/*  Average Speeds
-Car: 60mph
-Boeing 747: 565mph
-Bullet Train: 200mph
-Hyperloop Speed: 760mph
*/
var secToHour = 4 / 3600;
//updates distance
setInterval(function(){ 
    car_distance += secToHour * 60;
    plane_distance += secToHour * 565;
    train_distance += secToHour * 200;
    loop_distance += secToHour * 760;
    
    pivotCar.getObjectByName("carSprite").geometry = new THREE.TextGeometry(car_distance.toFixed(2) + " miles", font_param);
    pivotPlane.getObjectByName("planeSprite").geometry = new THREE.TextGeometry(plane_distance.toFixed(2) + " miles", font_param);
    pivotTrain.getObjectByName("trainSprite").geometry = new THREE.TextGeometry(train_distance.toFixed(2) + " miles", font_param);
    pivotLoop.getObjectByName("loopSprite").geometry = new THREE.TextGeometry(loop_distance.toFixed(2) + " miles", font_param);
}, 4000);

// Create a VR manager helper to enter and exit VR mode.
var params = {
  hideButton: false, // Default: false.
  isUndistorted: false // Default: false.
};
var manager = new WebVRManager(renderer, effect, params);


 
    
/* Relative Speed
-Car: .0789
-Boeing 747: .7472
-Bullet Train: .2631
-Hyperloop: 1
*/
var loop_speed = .008;
var car_speed = loop_speed * 0.0789;
var train_speed = loop_speed * 0.2631;
var plane_speed = loop_speed * 0.7472;

// Request animation frame loop function
var lastRender = 0;
function animate(timestamp) {
  var delta = Math.min(timestamp - lastRender, 500);
  lastRender = timestamp;
  controls.update();


  pivotCar.rotation.y += car_speed;  
  pivotTrain.rotation.y += train_speed;  
  pivotPlane.rotation.y += plane_speed;
  pivotLoop.rotation.y += loop_speed;
  
  

  // Render the scene through the manager.
  manager.render(scene, camera, timestamp);
  effect.render(scene, camera);
  vrDisplay.requestAnimationFrame(animate);
}


// White area light, intensity = 1, 
                    //PointLight( color,    intensity, distance, decay )
var light = new THREE.PointLight( 0xff0000,     1,       100,      1   );
light.position.set( 50, 50, 50 ); // Light source coordinates
scene.add( light );



