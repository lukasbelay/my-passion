import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";
import * as dat from "dat.gui";
import { Clock, Sphere } from "three";

var control = new (function () {
  this.rotationSpeed = 0.02;
})();

let gui = new dat.GUI();
gui.add(control, "rotationSpeed", 0, 280, 0.01);
const textureLoader = new THREE.TextureLoader();
const normalTexture = textureLoader.load("height2.jpg");

const Scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(Scene, camera);

/*const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({
  //color: 0xff6347,
  normalMap: normalTexture,
});
const torus = new THREE.Mesh(geometry, material);

Scene.add(torus);

torus.position.x = -20;
*/
const pointLight = new THREE.AmbientLight(0xffffff);
pointLight.position.set(20, 20, 20);

Scene.add(pointLight);

const spaceTexture = new THREE.TextureLoader().load("space.jpg");
Scene.background = spaceTexture;

const moonTexture = new THREE.TextureLoader().load("moon.jpg");

let moon = new THREE.Mesh(
  new THREE.SphereGeometry(8, 64, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
    /*metalness: 0.2,
    roughness: 0.9,
    */
  })
);

Scene.add(moon);

moon.position.x = 20;
moon.position.z = -5;

const stats = Stats();
document.body.appendChild(stats.dom);

//const controls = new OrbitControls(camera, renderer.domElement);

function rotate() {
  requestAnimationFrame(rotate);

  //controls.update();
  renderer.render(Scene, camera);
  stats.update();
}

rotate();

function animate() {
  requestAnimationFrame(animate);

  //torus.rotation.x += 6.5;
  //torus.rotation.y += 6;
  //torus.rotation.z += 6;
  moon.rotation.y += control.rotationSpeed;
  renderer.render(Scene, camera);
}

animate();

THREE.LoopRepeat;
