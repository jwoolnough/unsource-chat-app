import "./style.css";

interface SkeletonTextProps {
  numberOfLines?: number;
  width?: string;
  className?: string;
}

const SkeletonText = ({
  numberOfLines = 1,
  width = "80%",
  className,
}: SkeletonTextProps) => {
  return (
    <span className={className} aria-hidden="true">
      {Array.from({ length: numberOfLines }, (_, i) => (
        <span
          className="skeleton relative inline-block h-[0.8em] max-w-full align-middle"
          style={{ width: i < numberOfLines - 1 ? "100%" : width }}
          key={i}
        ></span>
      ))}
    </span>
  );
};

export { SkeletonText };
