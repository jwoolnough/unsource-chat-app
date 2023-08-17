import { useEffect } from "react";

const CONTENT_SIZE_CLASSES = {
  sm: 'content-sm',
  md: 'content-md',
  lg: 'content-lg',
} as const;

type ContentSize = keyof typeof CONTENT_SIZE_CLASSES;

const useContentSize = (targetSize: ContentSize) => {
  useEffect(() => {
    const contentElement = document?.getElementById("content");

    if (!contentElement) {
      return;
    }

    contentElement.classList.remove(
      ...Object.values(CONTENT_SIZE_CLASSES)
    );
    contentElement.classList.add(CONTENT_SIZE_CLASSES[targetSize], 'content-ready');
      
  }, [targetSize])
};

export { useContentSize };
