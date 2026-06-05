import { useEffect } from "react";
import { useNavigation } from "react-router";

export default function NavigationLoader() {
  const navigation = useNavigation();
  const isNavigating =
    navigation.state === "loading" || navigation.state === "submitting";

  useEffect(() => {
    document.body.classList.toggle("page-navigating", isNavigating);
    return () => document.body.classList.remove("page-navigating");
  }, [isNavigating]);

  if (!isNavigating) return null;

  return (
    <div className="nav-loader" role="status" aria-live="polite" aria-label="Loading page">
      <div className="nav-loader-bar" aria-hidden />
      <div className="nav-loader-overlay" aria-hidden>
        <div className="nav-loader-spinner" />
        <span className="nav-loader-text">Loading...</span>
      </div>
    </div>
  );
}
