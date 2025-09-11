import { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import { CatalogFilterFields } from "~/entities/Catalog/CatalogFilterFields";
import type { Catalog } from "~/entities/Catalog/types";
import { filtersDefault } from "~/entities/Catalog/useCatalogFilters";

type Filters = typeof filtersDefault;

interface CatalogFiltersModalProps {
  open: boolean;
  onClose: () => void;
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  catalog: Catalog;
}

export const CatalogFiltersModal: FC<CatalogFiltersModalProps> = ({
  open,
  onClose,
  filters,
  setFilters,
  // resetFilters,
  catalog,
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    if (open) setLocalFilters(filters);
  }, [open, filters]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFilters(localFilters);
    onClose();
  };

  const onReset = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // resetFilters();
    setLocalFilters(filtersDefault);
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnHidden
      maskClosable={true}
      styles={{
        content: {
          padding: "25px 15px",
          width: "min(90%, 380px)",
          backgroundColor: "var(--dialog-bg)",
          justifySelf: "center",
          borderRadius: "3rem",
        },
        body: {
          background: "var(--dialog-bg)",
          border: "1px solid transparent",
          borderRadius: "3rem",
        },
      }}
    >
      <form onSubmit={onSubmit} onReset={onReset}>
        <div className="filter__title">фильтр</div>
        <div className="filter__divider" />
        <div className="filter__content">
          <CatalogFilterFields
            filters={localFilters}
            setFilters={setLocalFilters}
            catalog={catalog}
          />
        </div>
        <div className="filter__actions">
          <button type="reset">Очистить</button>
          <button type="submit">Применить</button>
        </div>
      </form>
    </Modal>
  );
};
