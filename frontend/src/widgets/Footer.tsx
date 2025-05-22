import { Link } from "react-router-dom";

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
      <Link to={"#"}>Пользовательское соглашение</Link>{" "}
      {mode === "desktop" && "|"}{" "}
      <Link to={"#"}>Политика обработки персональных данных</Link>
    </div>
    <div className={`footer__company-info footer__company-info--${mode}`}>
      <span>ООО “ИДЕЯ 3Д СТРОЙ”</span>
      <span>ИНН: 4217211879</span>
      <span>ОРГН: 1244200013243</span>
    </div>
  </>
);
