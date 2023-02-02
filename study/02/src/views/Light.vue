<template>
  <div></div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";

// 场景
const initScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  return scene;
};

// 相机
const initCamera = () => {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.y = 0.2;
  return camera;
};

const initPlane = () => {
  const geometry = new THREE.PlaneGeometry(2000, 2000);
  const material = new THREE.MeshPhongMaterial({
    color: 0x999999,
    depthWrite: false,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotation.x = -Math.PI / 2;
  return plane;
};

// 渲染器
const initRender = () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  const height = 600;
  const width = (window.innerWidth / window.innerHeight) * height;
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  return renderer;
};

const scene = initScene();
const camera = initCamera();
const renderer = initRender();

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

const plane = initPlane();
scene.add(plane);

/**
 * 平行光
 * 光线的颜色
 * 光照强度，默认值1
 */
// const light = new THREE.DirectionalLight();
// light.position.set(0, 20, 10);
// const helper = new THREE.DirectionalLightHelper(light);
// scene.add(helper);
// scene.add(light);

/**
 * 半球光
 * 光源直接放置于场景之上，光照颜色从天空光线颜色渐变到地面光线颜色
 * (可选参数) 天空中发出光线的颜色。 缺省值 0xffffff
 * (可选参数) 地面发出光线的颜色。 缺省值 0xffffff
 * (可选参数) 光照强度。 缺省值 1
 */
const hemiLight = new THREE.HemisphereLight('red', 0x444444);
// hemiLight.position.set(0, 20, 0);
const helper1 = new THREE.HemisphereLightHelper(hemiLight);
scene.add(helper1)
scene.add(hemiLight);

const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
grid.material.opacity = 0.2;
grid.material.transparent = true;
scene.add(grid);

// renderer.render(scene, camera);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

function animate() {
  requestAnimationFrame(animate);
  //   cube.rotation.x += 0.01;controls.update();
  renderer.render(scene, camera);
}
animate();
</script>

<style lang="scss" scoped></style>
