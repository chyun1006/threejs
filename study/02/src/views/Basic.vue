<script setup>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import RobotGlb from "../assets/models/RobotExpressive.glb";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const myCanvasRef = ref();
const initRender = () => {
  const canvas = myCanvasRef.value;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  return renderer;
};

const initScene = () => {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xe0e0e0);
  // scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
  return scene;
};

const initCamera = () => {
  const fov = 45;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 100;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  // 设置相机的位置
  // camera.position.set(0, 0, 5);
  camera.position.set(-5, 3, 10);
  camera.lookAt(new THREE.Vector3(0, 2, 0));
  // camera.position.z = 5;
  return camera;
};

onMounted(() => {
  //初始化场景
  const scene = initScene();
  // 初始化相机
  const camera = initCamera();
  // 初始化渲染器
  const renderer = initRender();
  const height = 600;
  const width = (window.innerWidth / window.innerHeight) * height;
  renderer.setSize(width, height);

  // 几何体
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // 基础材质
  // const basic_material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

  const meshphong_material = new THREE.MeshPhongMaterial({ color: "#e100ff" });
  // 网格
  const cube = new THREE.Mesh(geometry, meshphong_material);
  cube.rotateY(10);

  scene.add(cube);

  // 点光源
  // const light = new THREE.PointLight(0xff0000, 1, 100);
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  // light.position.set(0, 10, 10);
  // scene.add(light);

  // const loader = new GLTFLoader();
  // loader.load(RobotGlb, function (glft) {
  //   console.log("--glft--", glft);
  // });

  // const mesh = new THREE.Mesh(
  //   new THREE.PlaneGeometry(200, 200),
  //   new THREE.MeshPhongMaterial({ color: 0xffff00 })
  // );
  // mesh.rotation.x = -Math.PI / 2;
  // scene.add(mesh);

  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  hemiLight.position.set(0, 20, 0);
  scene.add(hemiLight);

  const dirLight = new THREE.DirectionalLight(0xffffff);
  dirLight.position.set(0, 20, 10);
  scene.add(dirLight);

  // ground

  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2000, 2000),
    new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  scene.add(mesh);

  const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  // const geometry11 = new THREE.PlaneGeometry(1, 1);
  // const material22 = new THREE.MeshBasicMaterial({
  //   color: 0xffff00,
  //   side: THREE.DoubleSide,
  // });
  // const plane = new THREE.Mesh(geometry11, material22);
  // plane.rotation.x = 1;
  // scene.add(plane);

  // const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  // grid.material.opacity = 0.2;
  // grid.material.transparent = true;
  // scene.add(grid);

  // 轨道控制器
  // new OrbitControls(camera,renderer.domElement)

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.update();
  function animate() {
    requestAnimationFrame(animate);
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    controls.update();
  }

  animate();
});
</script>

<template>
  <canvas id="my-canvas" ref="myCanvasRef"></canvas>
</template>

<style scoped></style>
