import { ConfigProvider, Slider } from "antd";
import Select, { GroupBase, StylesConfig } from "react-select";

export function RangeInput({
  label,
  minValue,
  maxValue,
  onMinValueChange,
  onMaxValueChange,
}: {
  label: string;
  minValue: number;
  maxValue: number;
  onMinValueChange: (value: number) => void;
  onMaxValueChange: (value: number) => void;
}) {
  return (
    <div className="input-container">
      <label>{label}</label>

      <ConfigProvider
        theme={{
          token: { colorPrimary: "#000" },
          components: {
            Slider: {
              trackBg: "var(--nav-item-color)",
              trackHoverBg: "var(--nav-item-color)",
            },
          },
        }}
      >
        <Slider
          range
          step={1}
          min={0}
          max={1_000_000}
          value={[minValue, maxValue]}
          onChange={(value) => {
            onMinValueChange(value[0]);
            onMaxValueChange(value[1]);
          }}
        />
      </ConfigProvider>
      <div className="range-inputs">
        <input
          type="number"
          min={0}
          max={1_000_000}
          value={minValue}
          onChange={(e) => onMinValueChange(Number(e.target.value))}
        />
        <div className="range-inputs__divider" />
        <input
          type="number"
          min={0}
          max={1_000_000}
          value={maxValue}
          onChange={(e) => onMaxValueChange(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export function Checkbox(props: {
  label: string;
  options: (string | number)[];
  values: (string | number)[];
  handleChange: (value: string | number) => void;
}) {
  return (
    <div className="input-container">
      <label>{props.label}</label>
      <div className="options">
        {props.options.map((value, key) => {
          const id = `option-${props.label}-${key}`;
          return (
            <label
              key={key}
              htmlFor={id}
              className={`checkbox${typeof value === "number" ? " wide" : ""}`}
            >
              {value}
              <input
                id={id}
                checked={props.values.includes(value)}
                onChange={(_e) => props.handleChange(value)}
                type="checkbox"
              />
            </label>
          );
        })}
      </div>
    </div>
  );
}

const selectStyles: StylesConfig<
  {
    value: string | number;
    label: string | number;
  },
  false,
  GroupBase<{
    value: string | number;
    label: string | number;
  }>
> = {
  control: (base, _state) => ({
    ...base,
    border: "none",
    borderRadius: 0,
    borderBottom: "2px solid var(--nav-item-color)",
    backgroundColor: "transparent",
    boxShadow: "none",
    "&:hover": {
      borderBottom: "2px solid var(--nav-item-color)",
    },
  }),
  indicatorSeparator: () => ({ display: "none" }),
  menuPortal: (base) => ({ ...base, zIndex: 9999, paddingTop: 0 }),
  singleValue: (base) => ({
    ...base,
    color: "#000",
    fontSize: "14px",
    textTransform: "uppercase",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused
      ? "rgba(0, 0, 0, 0.1)"
      : "rgba(0, 0, 0, 0.05)",
    color: "#000",
    fontSize: "12px",
    textTransform: "uppercase",
    cursor: "pointer",
  }),
};

export function CustomSelect(props: {
  label: string;
  value: string | number;
  options: { value: string | number; label: string }[];
  handleChange: (value: string | number) => void;
}) {
  return (
    <div className="input-container">
      <label>{props.label}</label>
      <Select
        value={props.options.find((option) => option.value === props.value)}
        options={props.options}
        onChange={(option) => props.handleChange(option?.value ?? props.value)}
        placeholder="Не выбрано"
        noOptionsMessage={() => "Ничего не найдено"}
        styles={selectStyles}
        menuPortalTarget={
          typeof document !== "undefined" ? document.body : null
        }
        menuPosition="fixed"
        isClearable
      />
    </div>
  );
}
