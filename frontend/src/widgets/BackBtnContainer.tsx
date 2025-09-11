import { BsArrowLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import Routes from "~/shared/routes";

export function BackBtnContainer({ grayBg = true }: { grayBg?: boolean }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(Routes.CATALOG_3D, { replace: true });
  };

  return (
    <div className={`back-btn-container${grayBg ? " gray-bg" : ""}`}>
      <button onClick={handleClick}>
        <BsArrowLeft />
        Назад
      </button>
    </div>
  );
}
