import {
  OrbitControls,
  useGLTF,
  useAnimations,
  Html,
  PerspectiveCamera,
  Loader,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useState, useEffect, useRef, Fragment, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";

const Model = () => {
  const [IsTrue, setIsTrue] = useState(false);
  const model = useGLTF("/src/assets/car.glb");
  const doorRef = useRef();
  const car = useRef();
  const { actions } = useAnimations(model.animations, model.scene);
  const camera = useThree((state) => state.camera);

  const [smoothCameraPosition] = useState(() => new THREE.Vector3(10, 100, 10));
  const [smoothCameraTarget] = useState(() => new THREE.Vector3());
  // console.log(car.current);
  useEffect(() => {
    if (IsTrue) {
      actions?.["Armature|ArmatureAction"]?.play();
    }
  }, [IsTrue]);

  function anime(e) {
    console.log(e);
    console.log(e.target.value);
    setIsTrue((prev) => !prev);
  }
  console.log(IsTrue);
  useFrame((state, delta) => {
    TWEEN.update() * delta;
  });

  function changeCord() {
    Cam(1.12, 0.46, -4.85);
  }

  function Cam(xCord, yCord, zCord) {
    const coords = {
      x: camera.position.x,
      y: camera.position.y,
      z: camera.position.z,
    };
    console.log(coords);
    new TWEEN.Tween(coords)
      .to({ x: xCord, y: yCord, z: zCord })
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => camera.position.set(coords.x, coords.y, coords.z))
      .start();
    console.log("click");
  }
  // 1.15 -0.1342, -0.62
  //.to({ x: 1.12, y: 0.46, z: -4.85 })
  // .to({ x: 1.15, y: -0.1342, z: -0.62 })
  return (
    <>
      {/* <PerspectiveCamera makeDefault position={(0, 0, 4)} /> */}
      <primitive object={model.scene} position={[0, -1, 2]} />
      <Html>
        <button className="camera" onClick={changeCord}>
          cam
        </button>
        <button onClick={anime}>door</button>
      </Html>
    </>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));
// function Test() {
//   console.log("clicked");
// }
root.render(
  <>
    <Suspense fallback={null}>
      <Canvas camera={[250, 0.1, 1000, [22202, 5, 5]]}>
        <OrbitControls minPolarAngle={Math.PI / 4} />
        <ambientLight intensity={1} />
        <directionalLight intensity={1} />
        <Model />
      </Canvas>
    </Suspense>
    <Loader />
  </>
);
