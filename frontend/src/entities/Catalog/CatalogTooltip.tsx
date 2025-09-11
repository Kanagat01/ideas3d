import { Fragment, ReactNode } from "react";
import type { CatalogObjStatus } from "./types";

type Props = {
  name: string;
  status: CatalogObjStatus;
  data: ReactNode[];
};

export function CatalogTooltip({ name, status, data }: Props) {
  return (
    <div className="catalog-tooltip">
      <div>
        <div className="catalog-tooltip__name">{name}</div>
        <div className="catalog-tooltip__status">
          {status === "DEV" ? (
            <>
              <div className="circle red" />в разработке
            </>
          ) : (
            <>
              <div className="circle green" />
              готов к постройке
            </>
          )}
        </div>
      </div>
      <div className="vertical-divider" />
      <div className="catalog-tooltip__data">
        {data.map((el, idx) => (
          <Fragment key={idx}>
            <span>{el}</span>
            {idx !== data.length - 1 && <div className="horizontal-divider" />}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
