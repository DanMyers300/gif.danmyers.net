import { useVideoContext } from "./Context";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import useArrowDrag from "../utils/arrowDrag";

type ArrowPosition = { left: number; right: number };

const Arrows = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    arrowPositions,
    setArrowPositions,
    setPreviewPercent,
  } = useVideoContext();

  const handleArrowDrag = (arrow: keyof ArrowPosition, percent: number) => {
    console.log(arrow);
    setPreviewPercent(percent);
  };

  const {
    handleMouseDown: handleLeftArrowMouseDown,
    handleTouchStart: handleLeftArrowTouchStart,
  } = useArrowDrag("left", setArrowPositions, containerRef, handleArrowDrag);

  const {
    handleMouseDown: handleRightArrowMouseDown,
    handleTouchStart: handleRightArrowTouchStart,
  } = useArrowDrag("right", setArrowPositions, containerRef, handleArrowDrag);

  return (
    <div
      ref={containerRef}
      className="absolute bottom-42 w-full h-2 text-white bg-black"
    >
      <FaArrowDown
        style={{
          left: `calc(${arrowPositions.left}% + 8px)`,
        }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleLeftArrowMouseDown}
        onTouchStart={handleLeftArrowTouchStart}
      />
      <FaArrowDown
        style={{
          left: `calc(${arrowPositions.right}% - 8px)`,
        }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleRightArrowMouseDown}
        onTouchStart={handleRightArrowTouchStart}
      />
    </div>
  );
};

export default Arrows;

