import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Spoiler = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="spoiler">
      <button className="spoiler__header" onClick={() => setIsOpen(!isOpen)}>
        {title}
        <IoIosArrowDown className={`arrow ${isOpen ? "open" : ""}`} />
      </button>
      <div className="spoiler__bottom-line" />
      <div
        className="spoiler__body"
        style={
          isOpen
            ? {
                height: "auto",
                marginTop: "1em",
                marginBottom: "1.25em",
              }
            : { height: 0 }
        }
      >
        {children}
      </div>
    </div>
  );
};
