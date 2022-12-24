// import * as THREE from "three";
// import { PointLight } from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//   80,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );

// const canvas = document.querySelector(".canvas");
// const renderer = new THREE.WebGLRenderer({ canvas });
// renderer.setClearColor(0xffffff, 0);
// renderer.setSize(window.innerWidth, window.innerHeight / 1.75);

// // Texture
// const texture = new THREE.TextureLoader().load(
//   "http://cdn.shopify.com/s/files/1/0248/7303/products/wrappingpaper-australiananimals-christmasv2copy.jpg?v=1658740431"
// );

// // Object
// const geometry = new THREE.BoxGeometry(3, 2, 1);
// const material = new THREE.MeshStandardMaterial({
//   map: texture,
// });
// const cube = new THREE.Mesh(geometry, material);
// scene.add(cube);

// // Light
// const light = new THREE.PointLight(0xffffff, 3, 100);
// light.position.set(0, 10, 10);
// scene.add(light);

// const controls = new OrbitControls(camera, canvas);
// camera.position.z = 5;

// function animate() {
//   requestAnimationFrame(animate);

//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);
// }

// animate();

// window.addEventListener("resize", () => {
//   renderer.setSize(window.innerWidth, window.innerHeight / 1.75);
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// });

import * as THREE from "three";

let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 800;

  scene = new THREE.Scene();

  const texture = new THREE.TextureLoader().load(
    "https://images.ctfassets.net/tmixeg4ntbht/1LfwI03caMissfKMZGfHrP/e4352a9ce89df4c2c676289f26a933cd/jimmykk.jpg"
  );

  const geometry = new THREE.BoxGeometry(300, 200, 100);
  const material = new THREE.MeshBasicMaterial({ map: texture });

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const canvas = document.querySelector(".canvas");
  // const renderer = new THREE.WebGLRenderer({ canvas });

  renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.005;
  mesh.rotation.y += 0.01;

  renderer.render(scene, camera);
}
