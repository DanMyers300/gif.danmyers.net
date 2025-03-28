import { useState } from "react";
import { FaArrowDown } from "react-icons/fa";

const Arrows = () => {
  const [arrowPositions, setArrowPositions] = useState<{ left: number; right: number }>({
    left: 25,
    right: 75,
  });

  const handleArrowDrag = (arrow: "left" | "right", clientX: number) => {
    const timeline = document.querySelector(".timeline-container");
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const newPosition = ((clientX - timelineRect.left) / timelineRect.width) * 100;

    setArrowPositions((prev) => ({
      ...prev,
      [arrow]: Math.max(0, Math.min(100, newPosition)),
    }));
  };
  return (
    <div className="text-white">
      <FaArrowDown
        style={{ left: `${arrowPositions.left}%` }}
        className="absolute cursor-pointer transform -translate-x-1/2"
        onMouseDown={() => {
          const onMouseMove = (e: MouseEvent) => handleArrowDrag("left", e.clientX);
          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      />
      <FaArrowDown
        style={{ left: `${arrowPositions.right}%` }}
        className="absolute cursor-pointer transform -translate-x-1/2"
        onMouseDown={() => {
          const onMouseMove = (e: MouseEvent) => handleArrowDrag("right", e.clientX);
          const onMouseUp = () => {
            window.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener("mouseup", onMouseUp);
          };
          window.addEventListener("mousemove", onMouseMove);
          window.addEventListener("mouseup", onMouseUp);
        }}
      />
    </div>
  );
};

//const Arrows = () => {
//  return (
//    <div className="absolute bottom-[18%] bg-black text-white w-screen">
//      <FaArrowDown
//        className="absolute left-10 cursor-pointer transform -translate-x-1/2"
//      />
//      <FaArrowDown
//        className="absolute right-10 cursor-pointer transform translate-x-1/2"
//      />
//    </div>
//  );
//};

export default Arrows;

