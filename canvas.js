import * as THREE from "three";
import { PointLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  80,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setClearColor(0xffffff, 0);
renderer.setSize(window.innerWidth, window.innerHeight);

// Texture
const texture = new THREE.TextureLoader().load(
  "https://images.ctfassets.net/tmixeg4ntbht/1xsfUOXmL3qXEAlcJDwlD9/37d433de028fd1b91900b96e69dd67cf/wrapping_paper.jpeg?h=250"
);

// Object
const geometry = new THREE.BoxGeometry(3, 3, 1.5);
const material = new THREE.MeshStandardMaterial({
  map: texture,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Light
const light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 10, 10);
scene.add(light);

const controls = new OrbitControls(camera, canvas);
camera.position.z = 8;

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
