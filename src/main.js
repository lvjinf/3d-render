import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// 创建零件
const createGear = () => {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  return new THREE.Mesh(geometry, material);
};

const createScrew = () => {
  const geometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
  return new THREE.Mesh(geometry, material);
};

const createSpring = () => {
  const geometry = new THREE.TorusGeometry(0.5, 0.1, 16, 100);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  return new THREE.Mesh(geometry, material);
};

const createHollowCylinder = () => {
  const geometry = new THREE.CylinderGeometry(0.5, 0.5, 1, 32, 1, true);
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true });
  return new THREE.Mesh(geometry, material);
};

const gear = createGear();
scene.add(gear);

const screw = createScrew();
screw.position.set(2, 0, 0);
scene.add(screw);

const spring = createSpring();
spring.position.set(-2, 0, 0);
scene.add(spring);

const hollowCylinder = createHollowCylinder();
hollowCylinder.position.set(0, 2, 0);
scene.add(hollowCylinder);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 渲染循环
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// 处理窗口调整大小
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});