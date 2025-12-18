import { useEffect } from "react";

export function useResizeObserver(
  ref: React.RefObject<HTMLElement>,
  callback: (width: number) => void
) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.contentRect) {
          callback(entry.contentRect.width);
        }
      }
    });

    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [ref, callback]);
}
