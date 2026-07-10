import { Link, useLocation, useNavigate } from "react-router";

import { useLang } from "~/context/LanguageContext";

const TEAM_SECTION_ID = "team";
const TEAM_SECTION_PATH = "/about#team";

function scrollToTeamSection() {
  const section = document.getElementById(TEAM_SECTION_ID);
  if (!section) return false;
  section.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export default function DoctorConsultFab() {
  const { t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (event) => {
    event.preventDefault();

    if (location.pathname === "/about") {
      scrollToTeamSection();
      window.history.replaceState(null, "", TEAM_SECTION_PATH);
      return;
    }

    navigate(TEAM_SECTION_PATH);
  };

  return (
    <Link
      to={TEAM_SECTION_PATH}
      className="doctor-consult-fab"
      aria-label={t("floating.doctorConsultAria")}
      onClick={handleClick}
    >
      <span className="doctor-consult-fab__avatar doctor-consult-fab__avatar--doctor" aria-hidden>
        <img src="/assets/img/doctor-consult-avatar.png" alt="" />
        <span className="doctor-consult-fab__badge">
          <i className="bi bi-heart-pulse" />
        </span>
      </span>
      <span className="doctor-consult-fab__body">
        <span className="doctor-consult-fab__copy">
          <span className="doctor-consult-fab__title">{t("floating.doctorConsult")}</span>
          <span className="doctor-consult-fab__sub">{t("floating.meetExperts")}</span>
        </span>
      </span>
    </Link>
  );
}

export { scrollToTeamSection, TEAM_SECTION_ID };
