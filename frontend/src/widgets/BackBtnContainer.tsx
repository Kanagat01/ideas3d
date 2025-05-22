import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function BackBtnContainer({ grayBg = true }: { grayBg?: boolean }) {
  const navigate = useNavigate();

  return (
    <div className={`back-btn-container${grayBg ? " gray-bg" : ""}`}>
      <button onClick={() => navigate(-1)}>
        <BsArrowLeft />
        Назад
      </button>
    </div>
  );
}
