import { useState, useEffect } from "react";
import { useUnit } from "effector-react";
import {
  $catalog,
  getCatalogFx,
  filtersDefault,
  filterCatalog,
  CatalogFiltersModal,
  CatalogCard,
  Pagination,
} from "~/entities/Catalog";
import { Preloader } from "~/shared/ui";

export default function Catalog3DPage() {
  const [isLoading, catalog] = useUnit([getCatalogFx.pending, $catalog]);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState<typeof filtersDefault>(filtersDefault);

  const resetFilters = () => setFilters(filtersDefault);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    getCatalogFx();
    setCurrentPage(1);
  }, [filters]);

  const { houses, mafs } = filterCatalog(catalog, filters);

  const combinedItems = [
    ...houses.map((h) => ({ ...h, itemType: "house" as const })),
    ...mafs.map((m) => ({ ...m, itemType: "maf" as const })),
  ];

  const totalPages = Math.ceil(combinedItems.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedItems = combinedItems.slice(startIdx, startIdx + itemsPerPage);

  if (isLoading) return <Preloader />;
  return (
    <div className="catalog">
      <div className="catalog-actions">
        <button>По коллекциям</button>
        <span className="catalog-actions__divider"></span>
        <button
          onClick={() => {
            setFilters(filtersDefault);
          }}
        >
          Все изделия
        </button>
      </div>
      <button className="filter-btn" onClick={() => setModalOpen(true)}>
        Фильтр
      </button>
      <CatalogFiltersModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        resetFilters={resetFilters}
        catalog={catalog}
      />
      <div className="catalog-cards-container">
        <div className="catalog-cards-grid">
          {combinedItems.length === 0 ? (
            <div className="no-results">
              <div>Ничего не найдено по вашему фильтру.</div>
              <button className="reset-filters-btn" onClick={resetFilters}>
                Сбросить фильтр
              </button>
            </div>
          ) : (
            paginatedItems.map((item) => (
              <CatalogCard key={item.itemType + item.id} item={item} />
            ))
          )}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
