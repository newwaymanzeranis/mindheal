import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router";

import { useLang } from "~/context/LanguageContext";
import {
  collectAllTags,
  filterProducts,
  productHasTag,
} from "~/utils/emotionalTags";
import { imageSrc, productMindHealLabel } from "~/utils/format";

export default function MixSearchFilter({ products = [], onFilteredChange }) {
  const { tc } = useLang();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const toggleRef = useRef(null);

  const allTags = useMemo(() => collectAllTags(products), [products]);

  const filteredProducts = useMemo(
    () => filterProducts(products, { searchQuery, selectedTags }),
    [products, searchQuery, selectedTags]
  );

  useEffect(() => {
    onFilteredChange?.(filteredProducts);
  }, [filteredProducts, onFilteredChange]);

  useEffect(() => {
    if (!panelOpen) return;

    const handleClickOutside = (e) => {
      if (
        panelRef.current?.contains(e.target) ||
        toggleRef.current?.contains(e.target)
      ) {
        return;
      }
      setPanelOpen(false);
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setPanelOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [panelOpen]);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  const hasActiveFilters = searchQuery.trim() || selectedTags.length > 0;

  return (
    <div className="mix-search-filter mb-4">
      <div className="mix-search-bar">
        <div className="mix-search-input-wrap">
          <input
            type="search"
            className="mix-search-input"
            placeholder="Search Here"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search mixes by name or tag"
          />
          <i className="bi bi-search mix-search-icon" aria-hidden />
        </div>
        <button
          ref={toggleRef}
          type="button"
          className={`mix-search-more-btn ${panelOpen ? "mix-search-more-btn--active" : ""}`}
          onClick={() => setPanelOpen((open) => !open)}
          aria-expanded={panelOpen}
          aria-controls="mix-search-panel"
        >
          <i className="bi bi-list" aria-hidden />
          <span>Search More</span>
        </button>
      </div>

      {hasActiveFilters && (
        <div className="mix-search-active">
          <span className="mix-search-active-count">
            {filteredProducts.length} mix{filteredProducts.length !== 1 ? "es" : ""} found
          </span>
          <button type="button" className="mix-search-clear-btn" onClick={clearFilters}>
            Clear all
          </button>
        </div>
      )}

      {panelOpen && (
        <>
          <div
            className="mix-search-backdrop d-md-none"
            aria-hidden
            onClick={() => setPanelOpen(false)}
          />
          <div
            id="mix-search-panel"
            ref={panelRef}
            className="mix-search-panel"
            role="region"
            aria-label="Filter by emotional tags"
          >
            <div className="mix-search-panel-header d-md-none">
              <h3 className="mix-search-panel-title">Filter by Tags</h3>
              <button
                type="button"
                className="mix-search-panel-close"
                onClick={() => setPanelOpen(false)}
                aria-label="Close filter panel"
              >
                <i className="bi bi-x-lg" aria-hidden />
              </button>
            </div>

            <div className="mix-search-panel-body">
              <div className="mix-search-tags-col">
                <h3 className="mix-search-col-title d-none d-md-block">Tags</h3>
                <div className="mix-search-tags">
                  {allTags.map((tag) => {
                    const selected = selectedTags.includes(tag);
                    const matchCount = products.filter((p) => productHasTag(p, tag)).length;
                    return (
                      <button
                        key={tag}
                        type="button"
                        className={`mix-search-tag ${selected ? "mix-search-tag--selected" : ""}`}
                        onClick={() => toggleTag(tag)}
                        aria-pressed={selected}
                      >
                        {selected && <i className="bi bi-check-lg" aria-hidden />}
                        {tag}
                        <span className="mix-search-tag-count">{matchCount}</span>
                      </button>
                    );
                  })}
                </div>
                {selectedTags.length > 0 && (
                  <button
                    type="button"
                    className="mix-search-tags-clear"
                    onClick={() => setSelectedTags([])}
                  >
                    Clear tags
                  </button>
                )}
              </div>

              <div className="mix-search-results-col">
                <h3 className="mix-search-col-title">
                  Matching Mixes
                  <span className="mix-search-results-badge">{filteredProducts.length}</span>
                </h3>
                <div className="mix-search-results">
                  {filteredProducts.length === 0 ? (
                    <p className="mix-search-empty">
                      No mixes match your selection. Try fewer tags or search differently.
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        to={`/products/${product.slug}`}
                        className="mix-search-result-item"
                        onClick={() => setPanelOpen(false)}
                      >
                        <img
                          src={imageSrc(product.image)}
                          alt=""
                          className="mix-search-result-img"
                        />
                        <div className="mix-search-result-info">
                          <span className="mix-search-result-no">
                            {productMindHealLabel(product.mindHealNo, product.sortOrder)}
                          </span>
                          <span className="mix-search-result-name">{tc(product, "name")}</span>
                        </div>
                        <i className="bi bi-chevron-right mix-search-result-arrow" aria-hidden />
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
