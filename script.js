import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.168.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.168.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('container');

// Escena, cámara, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f0f5); // Fondo muy suave pastel

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(0, 1.5, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// Controles (puedes girar con mouse/touch)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;

// Luces suaves
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 10, 7);
scene.add(dirLight);

// Grupo para el tulipán
const tulipGroup = new THREE.Group();
scene.add(tulipGroup);

// Tallo (cilindro verde menta pastel)
const stemGeometry = new THREE.CylinderGeometry(0.08, 0.12, 3.2, 12);
const stemMaterial = new THREE.MeshStandardMaterial({ color: 0xa8e6cf }); // verde pastel
const stem = new THREE.Mesh(stemGeometry, stemMaterial);
stem.position.y = 1.6;
tulipGroup.add(stem);

// Hoja simple (plano curvado)
const leafGeometry = new THREE.PlaneGeometry(0.8, 2.5, 4, 6);
const leafMaterial = new THREE.MeshStandardMaterial({ color: 0xb2e8b2, side: THREE.DoubleSide });
const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
leaf.position.set(0.4, 1.2, 0);
leaf.rotation.z = Math.PI / 5;
leaf.rotation.y = Math.PI / 6;
tulipGroup.add(leaf);

// Pétalos del tulipán (en forma de gota, 6 pétalos en pastel)
const petalColors = [0xffb6c1, 0xffd1dc, 0xe0bbe4, 0xc7ceea, 0xffe4e1, 0xf8c8dc]; // rosas/lilas pastel
const petalGeometry = new THREE.SphereGeometry(0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 1.8); // media esfera achatada

for (let i = 0; i < 6; i++) {
  const petal = new THREE.Mesh(petalGeometry, new THREE.MeshStandardMaterial({
    color: petalColors[i % petalColors.length],
    roughness: 0.4,
    metalness: 0.05
  }));
  
  petal.scale.set(0.7, 1.1, 0.5); // forma de pétalo alargado
  petal.position.y = 3.2;
  
  const angle = (i / 6) * Math.PI * 2;
  petal.rotation.z = angle + Math.PI / 2;
  petal.rotation.y = angle;
  
  tulipGroup.add(petal);
}

// Texto 3D "Fatima" (usa geometría de texto)
const loader = new THREE.FontLoader();
loader.load('https://cdn.jsdelivr.net/npm/three@0.168.0/examples/fonts/helvetiker_regular.typeface.json', function(font) {
  const textGeometry = new THREE.TextGeometry('Fatima', {
    font: font,
    size: 0.8,
    height: 0.08,
    curveSegments: 12,
  });
  
  const textMaterial = new THREE.MeshStandardMaterial({ color: 0xd81b60 });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  
  textGeometry.computeBoundingBox();
  const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
  textMesh.position.set(-textWidth / 2, 0.4, 0);
  
  scene.add(textMesh);
});

// Animación
function animate() {
  requestAnimationFrame(animate);
  tulipGroup.rotation.y += 0.003; // giro suave
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});