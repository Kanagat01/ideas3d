import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import { ReactNode, Suspense, useState } from "react";
import { Canvas, useLoader, ThreeEvent } from "@react-three/fiber";
import { Bounds, Environment, OrbitControls } from "@react-three/drei";

type ModelData = {
  id: number;
  url: string;
  tooltip: ReactNode;
};

function SingleModel({
  id,
  url,
  tooltip,
  position,
  onHover,
  onClick,
}: ModelData & {
  position: [number, number, number];
  onHover: (md: ModelData | null, evt?: ThreeEvent<PointerEvent>) => void;
  onClick: () => void;
}) {
  const geom = useLoader(STLLoader, url);
  geom.computeVertexNormals();

  return (
    <mesh
      geometry={geom}
      position={position}
      scale={[0.01, 0.01, 0.01]}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover({ id, url, tooltip }, e);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        onHover(null);
      }}
      onClick={onClick}
    >
      <meshStandardMaterial
        metalness={0.6}
        roughness={0.4}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export function MultiModelViewer({
  models,
}: {
  models: (ModelData & { onClick: () => void })[];
}) {
  const [hovered, setHovered] = useState<{
    md: ModelData;
    x: number;
    y: number;
  } | null>(null);

  const handleHover = (
    md: ModelData | null,
    evt?: ThreeEvent<PointerEvent>
  ) => {
    if (md && evt) {
      setHovered({ md, x: evt.clientX, y: evt.clientY });
    } else {
      setHovered(null);
    }
  };

  const spacing = 100;
  const offset = ((models.length - 1) / 2) * spacing;

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        camera={{ fov: 50, near: 0.1, far: 5000 }}
        style={{ width: "100%", height: "75vh" }}
      >
        <Suspense fallback={null}>
          <Bounds fit margin={1.2}>
            <group>
              {models.map((m, i) => (
                <SingleModel
                  key={i}
                  {...m}
                  position={[i * spacing - offset, 0, 0]}
                  onHover={handleHover}
                  onClick={m.onClick}
                />
              ))}
            </group>
          </Bounds>

          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[50, 50, 50]} intensity={1} />
          <OrbitControls makeDefault />
        </Suspense>
      </Canvas>

      {hovered && (
        <div
          className="tooltip"
          style={{
            top: hovered.y,
            left: hovered.x,
          }}
        >
          {hovered.md.tooltip}
        </div>
      )}
    </div>
  );
}
