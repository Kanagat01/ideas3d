import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { STLLoader } from "three-stdlib";
import { useLoader } from "@react-three/fiber";

interface ModelProps {
  url: string;
}

interface STLViewerProps {
  url: string;
  style?: React.CSSProperties;
}

function Model({ url }: ModelProps) {
  const geometry = useLoader(STLLoader, url);
  return (
    <mesh geometry={geometry}>
      <meshStandardMaterial color="#888" />
    </mesh>
  );
}

export default function STLViewer({ url, style }: STLViewerProps) {
  return (
    <div style={{ width: "100%", height: "400px", ...style }}>
      <Canvas camera={{ position: [0, 0, 80], fov: 60 }}>
        <ambientLight intensity={0.9} />
        <Stage adjustCamera intensity={1}>
          <Model url={url} />
        </Stage>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
