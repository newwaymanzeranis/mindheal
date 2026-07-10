import { productYoutubeUrl } from "~/utils/youtube";

export default function ProductVideoPlayButton({
  product,
  className = "",
  ariaLabel = "Play product video",
}) {
  return (
    <a
      href={productYoutubeUrl(product)}
      className={`glightbox pulsating-play-btn pulsating-play-btn--sm ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <span className="play">
        <i className="bi bi-play-fill" />
      </span>
    </a>
  );
}
