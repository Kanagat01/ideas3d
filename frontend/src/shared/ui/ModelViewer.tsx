import * as THREE from "three";
import { OrbitControls, STLLoader } from "three-stdlib";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Environment } from "@react-three/drei";

type ModelViewerProps = { url: string };

function Model({ url }: ModelViewerProps) {
  const geom = useLoader(STLLoader, url);
  geom.computeVertexNormals();
  const ref = useRef<THREE.Mesh>(null);
  const { camera, gl } = useThree();

  useEffect(() => {
    if (ref.current && camera instanceof THREE.PerspectiveCamera) {
      const box = new THREE.Box3().setFromObject(ref.current);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      ref.current.position.sub(center);

      const maxDim = Math.max(size.x, size.y, size.z);
      const fov = camera.fov * (Math.PI / 180);
      const distance = maxDim / (2 * Math.tan(fov / 2));

      camera.position.set(0, 0, distance * 1.5);
      camera.near = distance / 100;
      camera.far = distance * 10;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0, 0);

      const controls = new OrbitControls(camera, gl.domElement);
      controls.target.set(0, 0, 0);
      controls.update();

      return () => controls.dispose();
    }
  }, [camera, gl, geom]);

  return (
    <>
      <mesh ref={ref}>
        <primitive object={geom} attach="geometry" />
        <meshStandardMaterial
          metalness={0.8}
          roughness={0.2}
          side={THREE.DoubleSide}
        />
      </mesh>
      <ambientLight />
      <directionalLight position={[10, 10, 10]} />
      <directionalLight position={[-10, -10, -10]} />
    </>
  );
}

export function ModelViewer({ url }: ModelViewerProps) {
  return (
    <Canvas
      camera={{ fov: 45, near: 0.1, far: 1000, position: [0, 0, 100] }}
      style={{ width: "100%", height: "80vh" }}
    >
      <Suspense fallback={null}>
        <Model url={url} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}
