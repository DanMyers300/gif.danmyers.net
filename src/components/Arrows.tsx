import { useState, useRef } from "react";
import { FaArrowDown } from "react-icons/fa";

type ArrowPosition = { left: number; right: number };

const useArrowDrag = (
  arrow: keyof ArrowPosition,
  setArrowPositions: React.Dispatch<React.SetStateAction<ArrowPosition>>,
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newPosition = ((e.clientX - containerRect.left) / containerRect.width) * 100;

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

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleMouseMove);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handleMouseDown = () => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return handleMouseDown;
};

const Arrows = () => {
  const [arrowPositions, setArrowPositions] = useState<ArrowPosition>({
    left: 25,
    right: 75,
  });

  const containerRef = useRef<HTMLDivElement>(null);

  const handleLeftArrowDrag = useArrowDrag("left", setArrowPositions, containerRef);
  const handleRightArrowDrag = useArrowDrag("right", setArrowPositions, containerRef);

  return (
    <div ref={containerRef} className="absolute bottom-42 w-full h-2 text-white bg-black">
      <FaArrowDown
        style={{ left: `${arrowPositions.left}%` }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleLeftArrowDrag}
      />
      <FaArrowDown
        style={{ left: `${arrowPositions.right}%` }}
        className="absolute top-0 cursor-pointer transform -translate-x-1/2"
        onMouseDown={handleRightArrowDrag}
      />
    </div>
  );
};

export default Arrows;

