var container, renderer, scene, camera, mesh, background, fov = 45;
var start = Date.now();
const PALETTE = ["#ACBCC6", "#96D3AE", "#004835", "#CED0CA", "#0e3cff", "#464646"];
var colorIndex = 0;
var timeMultiplier = 0.0005;
window.addEventListener('load', init);
$('body').dblclick(tweencolor);
var weight = {}
    weight.value = 2.0

var accelerometer = {alpha:0, beta:0, gamma:0}
var mobile = false;
var cursorX;
var cursorY;

function init() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        // some code..
        mobile = true;
       }
    document.onmousemove = function(e){
        cursorX = e.pageX;
        cursorY = e.pageY;
        $('#follower').css({
               left: 0 + THREE.Math.mapLinear(cursorX, 0, window.innerWidth, -100, 150),
               top:  window.innerHeight/2000 + THREE.Math.mapLinear(cursorY, 0, window.innerHeight, -100, 200),
        });

    }
    // setup shaker for mobile
    var myShakeEvent = new Shake({
        threshold: 10, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });
    myShakeEvent.start();

    window.addEventListener('shake', tweencolor, false);


    container = document.getElementById('three-container');

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 100;
    camera.target = new THREE.Vector3(0, 0, 0);

    scene.add(camera);

    var panoTexture = new THREE.TextureLoader().load('pano.jpg');

    var gn = new GyroNorm();
    var args = {
        frequency:50,					// ( How often the object sends the values - milliseconds )
        gravityNormalized:true,			// ( If the gravity related values to be normalized )
        orientationBase:GyroNorm.GAME,		// ( Can be GyroNorm.GAME or GyroNorm.WORLD. gn.GAME returns orientation values with respect to the head direction of the device. gn.WORLD returns the orientation values with respect to the actual north direction of the world. )
        decimalCount:2,					// ( How many digits after the decimal point will there be in the return values )
        logger:null,					// ( Function to be called to log messages from gyronorm.js )
        screenAdjusted:false			// ( If set to true it will return screen adjusted values. )
    };

    gn.init(args).then(function(){
      gn.start(function(data){
        // Process:
        // data.do.alpha	( deviceorientation event alpha value )
        // data.do.beta		( deviceorientation event beta value )
        // data.do.gamma	( deviceorientation event gamma value )
        // data.do.absolute	( deviceorientation event absolute value )

        accelerometer.alpha = data.do.alpha;
        accelerometer.beta = data.do.beta;
        accelerometer.gamma = data.do.gamma;
    
        // data.dm.x		( devicemotion event acceleration x value )
        // data.dm.y		( devicemotion event acceleration y value )
        // data.dm.z		( devicemotion event acceleration z value )
    
        // data.dm.gx		( devicemotion event accelerationIncludingGravity x value )
        // data.dm.gy		( devicemotion event accelerationIncludingGravity y value )
        // data.dm.gz		( devicemotion event accelerationIncludingGravity z value )
    
        // data.dm.alpha	( devicemotion event rotationRate alpha value )
        // data.dm.beta		( devicemotion event rotationRate beta value )
        // data.dm.gamma	( devicemotion event rotationRate gamma value )
      });
    }).catch(function(e){
      // Catch if the DeviceOrientation or DeviceMotion is not supported by the browser or device
    });

    // material = new THREE.ShaderMaterial({

    //     uniforms: {
    //         tShine: {
    //             type: "t",
    //             value: panoTexture
    //         },
    //         time: {
    //             type: "f",
    //             value: 0
    //         },
    //         weight: {
    //             type: "f",
    //             value: 0
    //         }
    //     },
    //     vertexShader: document.getElementById('vertexShader').textContent,
    //     fragmentShader: document.getElementById('fragmentShader').textContent

    // });


    background = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 60), new THREE.MeshBasicMaterial({
        color: 0xD3D0CB
    }));
    background.scale.x = -1;
    background.doubleSided = true;
    scene.add(background);
    material = new THREE.MeshBasicMaterial({color: 0x000000});

    mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 5), material);
    mesh.scale.set(0.9,0.9,0.9);
    scene.add(mesh);

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClear = true;

    container.appendChild(renderer.domElement);

    // var controls = new THREE.OrbitControls(camera, renderer.domElement);
    // controls.enableZoom = false;

    window.addEventListener('resize', onWindowResize, false);

    


    // $('.body-text').scroll(function () {
    //     var scrollTop = $(window).scrollTop();
    //     var height = $(window).height();

    //     $('.body-text').css({
    //         'opacity': ((height - scrollTop) / height)
    //     }); 

    //  });

    render();

}

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();

    mesh.rotation.y = scroll/100;
    camera.position.z = 100 + scroll/10;
    // Do something
});

function tweencolor() {
    var col = new THREE.Color(PALETTE[colorIndex % PALETTE.length]);
    TweenLite.to(background.material.color, 1, {
        r: col.r,
        g: col.g,
        b: col.b,
        onComplete: function () {
            colorIndex += 1;
        }
    });

    TweenLite.to(weight, 1, {
        value: 5.0 + Math.random()*5,
 
        onComplete: function () {
            TweenLite.to(weight, 1, {
                value: 2.0
            })
        }
    });


    // event trigger
    console.log(document.getElementsByClassName('squiggle'));
    $(".squiggle").toggleClass("squiggle-animation-class-a");
        $(".squiggle").toggleClass("squiggle-animation-class-b");

    // $(".squiggle").switchClass("squiggle-animation-class-a", "squiggle-animation-class-b");


}

function onWindowResize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

var start = Date.now();

function render() {

    // material.uniforms['time'].value = timeMultiplier * (Date.now() - start);
    // material.uniforms['weight'].value = weight.value, + 1.0 * (.5 + .5 * Math.sin(.00025 * (Date.now() - start)));
    if(mobile) {
    mesh.position.y = THREE.Math.mapLinear(accelerometer.beta, -180, 180, -20, 20);
    mesh.position.x = THREE.Math.mapLinear(accelerometer.gamma, -180, 180, -20, 20);
    $('#follower').css({
        left: 0 + THREE.Math.mapLinear(accelerometer.gamma, -180, 180, -50, 75),
        top:  window.innerHeight/2000 + THREE.Math.mapLinear(accelerometer.beta, -180, 180, -50, 75),
 });
    } else {
        mesh.position.y = THREE.Math.mapLinear(cursorY, window.innerHeight, 0, -5, 5);
        mesh.position.x = THREE.Math.mapLinear(cursorX, 0, window.innerWidth, -5, 5); 
        mesh.rotation.x = THREE.Math.mapLinear(cursorY, window.innerHeight, 0, -1, 1);
        mesh.rotation.y = THREE.Math.mapLinear(cursorX, 0, window.innerWidth, -1, 1); 
    }

    renderer.render(scene, camera);
    requestAnimationFrame(render);

}