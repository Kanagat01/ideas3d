import { Environment, OrbitControls } from "@react-three/drei";

export function CommonSceneElements() {
  return (
    <>
      <Environment preset="studio" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[50, 50, 50]} intensity={1} />
      <OrbitControls makeDefault />
    </>
  );
}
