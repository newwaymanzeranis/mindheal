import { useEffect, useState } from "react";
import { useNavigation } from "react-router";

import { useSiteScripts } from "~/hooks/useSiteScripts";

const MAX_INITIAL_WAIT = 8000;

export default function NavigationLoader() {
  const navigation = useNavigation();
  const scriptsReady = useSiteScripts();
  const [initialLoad, setInitialLoad] = useState(true);

  const isNavigating =
    navigation.state === "loading" || navigation.state === "submitting";

  useEffect(() => {
    if (scriptsReady) {
      setInitialLoad(false);
      return;
    }

    const timer = setTimeout(() => setInitialLoad(false), MAX_INITIAL_WAIT);
    return () => clearTimeout(timer);
  }, [scriptsReady]);

  const isLoading = isNavigating || initialLoad;

  useEffect(() => {
    document.body.classList.toggle("page-navigating", isLoading);
    return () => document.body.classList.remove("page-navigating");
  }, [isLoading]);

  if (!isLoading) return null;

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
