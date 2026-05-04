import React from "react";

const Color = (props) => {
  const { colorData, selectedColor, setColor } = props;
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((item, index) => {
            const isSelected = selectedColor === item?._id;
            return (
              <li
                className={isSelected ? "selected-color" : ""}
                onClick={() => setColor(item?._id)}
                style={{ backgroundColor: item?.title }}
                key={index}
                role="button"
                tabIndex={0}
                aria-label={`Select ${item?.title || "color"}`}
                aria-pressed={isSelected}
                title={item?.title}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setColor(item?._id);
                  }
                }}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
