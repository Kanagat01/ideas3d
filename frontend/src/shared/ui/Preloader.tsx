import { FaSpinner } from "react-icons/fa";

export function Preloader() {
  return (
    <div className="preloader">
      <FaSpinner className="spinner" />
    </div>
  );
}
