import * as THREE from 'https://unpkg.com/three@0.159.0/build/three.module.js';

const canvas = document.getElementById("scene");

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xf6c1d1, 5, 20);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(devicePixelRatio);

// Luz
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// 🌷 Flor
const flower = new THREE.Group();

const petalGeo = new THREE.SphereGeometry(1, 32, 32);
petalGeo.scale(1, 1.5, 0.3);

const petalMat = new THREE.MeshStandardMaterial({
  color: 0xff7eb6,
  roughness: 0.4,
  metalness: 0.1
});

for (let i = 0; i < 8; i++) {
  const petal = new THREE.Mesh(petalGeo, petalMat);
  const angle = (i / 8) * Math.PI * 2;
  petal.position.set(Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5);
  petal.lookAt(0, 0, 0);
  flower.add(petal);
}

// Centro
const center = new THREE.Mesh(
  new THREE.SphereGeometry(0.6, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffc300 })
);
flower.add(center);

scene.add(flower);

// Animación
function animate() {
  flower.rotation.y += 0.005;
  flower.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();

// Resize
window.addEventListener("resize", () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Mensaje
document.getElementById("btn").onclick = () =>
  document.getElementById("msg").classList.toggle("hidden");
