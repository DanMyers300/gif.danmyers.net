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

export default useArrowDrag;
