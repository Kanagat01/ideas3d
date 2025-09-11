type NoModelPlaceholderProps = {
  position?: [number, number, number];
  scale?: [number, number, number];
};

export function NoModelPlaceholder({
  position = [0, 0, 0],
  scale = [0.01, 0.01, 0.01],
}: NoModelPlaceholderProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[50, 50, 50]} />
      <meshStandardMaterial color="#cccccc" />
    </mesh>
  );
}
