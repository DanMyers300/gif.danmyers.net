import { useVideoContext } from "./Context";
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

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
    if (arrow === "left" && clampedPosition > 50) clampedPosition = 50;
    if (arrow === "right" && clampedPosition < 50) clampedPosition = 50;

    onDrag(arrow, clampedPosition);

    setArrowPositions((prev) => ({
      ...prev,
      [arrow]: clampedPosition,
    }));
  };

  const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
  const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };
  const handleTouchEnd = () => {
    window.removeEventListener("touchmove", handleTouchMove);
    window.removeEventListener("touchend", handleTouchEnd);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  const handleTouchStart = () => {
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);
  };

  return { handleMouseDown, handleTouchStart };
};

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

