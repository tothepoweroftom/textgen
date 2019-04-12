var container, renderer, scene, camera, mesh, background, fov = 45;
var start = Date.now();
const PALETTE = ["#ACBCC6", "#96D3AE", "#004835", "#CED0CA", "#0e3cff", "#464646"];
var colorIndex = 0;
var timeMultiplier = 0.0005;
window.addEventListener('load', init);
$('body').dblclick(tweencolor);
var weight = {}
    weight.value = 2.0



function init() {

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



    material = new THREE.ShaderMaterial({

        uniforms: {
            tShine: {
                type: "t",
                value: panoTexture
            },
            time: {
                type: "f",
                value: 0
            },
            weight: {
                type: "f",
                value: 0
            }
        },
        vertexShader: document.getElementById('vertexShader').textContent,
        fragmentShader: document.getElementById('fragmentShader').textContent

    });
    background = new THREE.Mesh(new THREE.SphereGeometry(500, 60, 60), new THREE.MeshBasicMaterial({
        color: 0xD3D0CB
    }));
    background.scale.x = -1;
    background.doubleSided = true;
    scene.add(background);

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

    material.uniforms['time'].value = timeMultiplier * (Date.now() - start);
    material.uniforms['weight'].value = weight.value, + 1.0 * (.5 + .5 * Math.sin(.00025 * (Date.now() - start)));


    renderer.render(scene, camera);
    requestAnimationFrame(render);

}