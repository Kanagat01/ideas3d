import { Link } from "react-router-dom";
import Routes from "~/shared/routes";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__logo">
        <img src="/assets/logo-footer.png" alt="logo" />
      </div>
      <TermsAndInfo mode="desktop" />
      <div className="footer--mobile">
        <TermsAndInfo mode="mobile" />
      </div>
    </footer>
  );
}

const TermsAndInfo = ({ mode }: { mode: string }) => (
  <>
    <div className={`footer__terms footer__terms--${mode}`}>
      <Link to={Routes.USER_AGREEMENT}>Пользовательское соглашение</Link>{" "}
      {mode === "desktop" && <span className="footer__terms__divider" />}
      <Link to={Routes.PRIVACY_POLICY}>
        Политика обработки персональных данных
      </Link>
    </div>
    <div className={`footer__company-info footer__company-info--${mode}`}>
      <div style={{ textWrap: "nowrap" }}>ООО “ИДЕЯ 3Д СТРОЙ”</div>
      <div style={{ textWrap: "nowrap" }}>ИНН: 4217211879</div>
      <div style={{ textWrap: "nowrap" }}>ОРГН: 1244200013243</div>
    </div>
  </>
);
