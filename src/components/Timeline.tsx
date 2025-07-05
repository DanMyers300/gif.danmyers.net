import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";
import { consumeContext } from "../utils/Context";

type ArrowPosition = { left: number; right: number };

const useArrowDrag = (
  arrow: keyof ArrowPosition,
  setArrowPositions: React.Dispatch<React.SetStateAction<ArrowPosition>>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  onDrag: (arrow: keyof ArrowPosition, percent: number) => void
) => {
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    let newPosition =
      ((clientX - containerRect.left) / containerRect.width) * 100;
    newPosition = Math.max(0, Math.min(100, newPosition));

    let clampedPosition = newPosition;
    if (arrow === "left" && clampedPosition > 99) clampedPosition = 99;
    if (arrow === "right" && clampedPosition < 1) clampedPosition = 1;

    onDrag(arrow, newPosition);

    setArrowPositions((prev) => {
      if (arrow === "left") {
        clampedPosition = Math.min(clampedPosition, prev.right - 2);
      }

      if (arrow === "right") {
        clampedPosition = Math.max(clampedPosition, prev.left + 2);
      }
      return {
      ...prev,
      [arrow]: clampedPosition,
    }});
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { handleMouseDown };
};

const Timeline = () => {
  const {previewPercent, setPreviewPercent, arrowPositions, setArrowPositions } = consumeContext();
  const containerRef = useRef<HTMLDivElement>(null);

  const handleArrowDrag = (arrow: keyof ArrowPosition, percent: number) => {
    console.log(arrow);
    setPreviewPercent(percent);
    console.log(previewPercent);
  };

  const {
    handleMouseDown: handleLeftArrowMouseDown,
  } = useArrowDrag("left", setArrowPositions, containerRef, handleArrowDrag);

  const {
    handleMouseDown: handleRightArrowMouseDown,
  } = useArrowDrag("right", setArrowPositions, containerRef, handleArrowDrag);

  return (
    <div className="absolute bg-[#70638a] w-full h-50 bottom-0">

      {/* Bars */}
      <div
        style={{
          left: `calc(${arrowPositions.left}% + 8px)`,
        }}
        className="absolute top-0 h-full w-px bg-red-500 transform -translate-x-1/2"
      />
      <div
        style={{
          left: `calc(${arrowPositions.right}% - 8px)`,
        }}
        className="absolute top-0 h-full w-px bg-red-500 transform -translate-x-1/2"
      />

      {/* Arrows */}
      <div
        ref={containerRef}
        className="absolute w-full h-2 text-white"
      >
        <FaArrowDown
          style={{
            left: `calc(${arrowPositions.left}% + 8px)`,
          }}
          className="absolute top-[-200%] cursor-pointer transform -translate-x-1/2"
          onMouseDown={handleLeftArrowMouseDown}
        />
        <FaArrowDown
          style={{
            left: `calc(${arrowPositions.right}% - 8px)`,
          }}
          className="absolute top-[-200%] cursor-pointer transform -translate-x-1/2"
          onMouseDown={handleRightArrowMouseDown}
        />
      </div>
    </div>
  );
};

export default Timeline;
