import {useVideoContext} from "./Context"
import { useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

const useArrowDrag = (
  arrow: keyof ArrowPosition,
  setArrowPositions: React.Dispatch<React.SetStateAction<ArrowPosition>>,
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = ((clientX - containerRect.left) / containerRect.width) * 100;

    setArrowPositions((prev) => {
      const updatedPosition = Math.max(0, Math.min(100, newPosition));

      // Ensure the left arrow doesn't go beyond 50%
      if (arrow === "left" && updatedPosition > 50) {
        return { ...prev, [arrow]: 50 };
      }

      // Ensure the right arrow doesn't go below 50%
      if (arrow === "right" && updatedPosition < 50) {
        return { ...prev, [arrow]: 50 };
      }

      return { ...prev, [arrow]: updatedPosition };
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

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
  const {arrowPositions, setArrowPositions} = useVideoContext();

  const { handleMouseDown: handleLeftArrowMouseDown, handleTouchStart: handleLeftArrowTouchStart } =
    useArrowDrag("left", setArrowPositions, containerRef);

  const { handleMouseDown: handleRightArrowMouseDown, handleTouchStart: handleRightArrowTouchStart } =
    useArrowDrag("right", setArrowPositions, containerRef);

  return (
    <div ref={containerRef} className="absolute bottom-42 w-full h-2 text-white bg-black">
      <FaArrowDown
        style={{ left: `${arrowPositions.left}%` }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleLeftArrowMouseDown}
        onTouchStart={handleLeftArrowTouchStart}
      />
      <FaArrowDown
        style={{ left: `${arrowPositions.right}%` }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleRightArrowMouseDown}
        onTouchStart={handleRightArrowTouchStart}
      />
    </div>
  );
};

export default Arrows;
