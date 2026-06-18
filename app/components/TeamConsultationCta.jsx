import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";

import AppointmentBookingModal, { appointmentModalLinks } from "~/components/AppointmentBookingModal";
import { useAuth } from "~/context/AuthContext";
import { buildAuthRedirectUrl } from "~/utils/navigation";

export { appointmentModalLinks };

export default function TeamConsultationCta({ member }) {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (loading || !isAuthenticated) return;
    if (searchParams.get("book") === "1") {
      setModalOpen(true);
      const next = new URLSearchParams(searchParams);
      next.delete("book");
      setSearchParams(next, { replace: true });
    }
  }, [loading, isAuthenticated, searchParams, setSearchParams]);

  const handleBook = () => {
    if (!isAuthenticated) {
      navigate(buildAuthRedirectUrl("/login", `/team/${member.slug}?book=1`));
      return;
    }
    setModalOpen(true);
  };

  return (
    <>
      <div className="team-profile-cta" data-aos="fade-up">
        <h3>Ready to Start Your Healing Journey?</h3>
        <p>
          Book a free consultation with {member.name.split(" ").pop()} and discover the right Bach
          Flower Remedies for your emotional wellness.
        </p>
        <button type="button" className="btn-consult" onClick={handleBook}>
          <i className="bi bi-calendar-check" />
          Book Free Consultation
        </button>
      </div>

      <AppointmentBookingModal
        member={member}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        user={user}
      />
    </>
  );
}
