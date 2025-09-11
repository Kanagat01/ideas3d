import * as THREE from "three";
import { STLLoader } from "three-stdlib";
import { Canvas, useLoader, useThree } from "@react-three/fiber";
import {
  Suspense,
  useLayoutEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Bounds, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { CommonSceneElements } from "~/shared/ui/CommonSceneElements";
import { NoModelPlaceholder } from "~/shared/ui/NoModelPlaceholder";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

export type ViewerCoordinates = {
  cameraPosition: [number, number, number];
  target: [number, number, number];
};

type ControlsConfig = Partial<{
  enablePan: boolean;
  enableZoom: boolean;
  enableRotate: boolean;
  maxPolarAngle: number;
  minPolarAngle: number;
}>;

type ModelViewerProps = {
  url?: string;
  file?: File | Blob;
  initialView?: ViewerCoordinates;
  controlsConfig?: ControlsConfig;
};

type CameraControlsBridgeProps = {
  initialView?: ViewerCoordinates;
  controlsConfig?: ControlsConfig;
  onChange?: (coords: ViewerCoordinates) => void;
};

function SingleModel({
  url,
  file,
  hasInitialView,
}: {
  url?: string;
  file?: File | Blob;
  hasInitialView: boolean;
}) {
  const blobUrl = file ? URL.createObjectURL(file) : undefined;
  const input = url ?? blobUrl ?? "";
  const geometry = useLoader(STLLoader, input);

  useLayoutEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  if (geometry && geometry.computeVertexNormals)
    geometry.computeVertexNormals();

  if (hasInitialView) {
    // No auto-fit — just render mesh
    return (
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#cccccc"
          metalness={0.2}
          roughness={0.45}
          clearcoat={0.25}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  return (
    <Bounds fit clip observe>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#cccccc"
          metalness={0.2}
          roughness={0.45}
          clearcoat={0.25}
          flatShading
          side={THREE.DoubleSide}
        />
      </mesh>
    </Bounds>
  );
}

const CameraControlsBridge = forwardRef(function CameraControlsBridge(
  { initialView, controlsConfig = {} }: CameraControlsBridgeProps,
  ref
) {
  const orbitRef = useRef<OrbitControlsImpl | null>(null);
  const { camera, gl } = useThree();

  useLayoutEffect(() => {
    if (
      initialView &&
      Array.isArray(initialView.cameraPosition) &&
      initialView.cameraPosition.length === 3 &&
      Array.isArray(initialView.target) &&
      initialView.target.length === 3
    ) {
      camera.position.set(...initialView.cameraPosition);
      orbitRef.current?.target.set(...initialView.target);
      camera.lookAt(...initialView.target);
    }
  }, [initialView, camera]);

  useImperativeHandle(ref, () => ({
    getCoordinates: (): ViewerCoordinates => ({
      cameraPosition: camera.position.toArray() as [number, number, number],
      target: (orbitRef.current?.target?.toArray?.() as [
        number,
        number,
        number
      ]) || [0, 0, 0],
    }),
    setCameraPosition: (
      position: [number, number, number] = [0, 0, 150],
      target: [number, number, number] = [0, 0, 0]
    ) => {
      camera.position.set(...position);
      camera.lookAt(...target);
      orbitRef.current?.target.set(...target);
    },
  }));

  return (
    <OrbitControls
      ref={orbitRef}
      domElement={gl.domElement}
      {...controlsConfig}
    />
  );
});

export const ModelViewer = forwardRef(function ModelViewer(
  { url, file, initialView, controlsConfig }: ModelViewerProps,
  ref
) {
  return (
    <Canvas
      style={{
        width: "100%",
        maxWidth: 600,
        aspectRatio: "2/3",
        height: "80vh",
        margin: "0 auto",
        overflow: "hidden",
        touchAction: "none",
        background: "transparent",
      }}
      gl={{ antialias: true, alpha: true }}
    >
      <PerspectiveCamera
        makeDefault
        fov={60}
        position={[0, 0, 150]}
        near={0.1}
        far={1000}
      />
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 20, 40]} intensity={1.1} castShadow />
      <Suspense fallback={null}>
        {url || file ? (
          <SingleModel url={url} file={file} hasInitialView={!!initialView} />
        ) : (
          <NoModelPlaceholder />
        )}
        <CommonSceneElements />
      </Suspense>
      <CameraControlsBridge
        ref={ref}
        initialView={initialView}
        controlsConfig={{
          enablePan: false,
          enableZoom: false,
          enableRotate: true,
          minPolarAngle: Math.PI / 2, 
          maxPolarAngle: Math.PI / 2,
          ...controlsConfig,
        }}
      />
    </Canvas>
  );
});
