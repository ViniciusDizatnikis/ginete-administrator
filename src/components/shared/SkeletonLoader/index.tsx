import type { CSSProperties } from "react";
import styles from "./styles.module.css";

interface SkeletonLoaderProps {
  width?: string | number;
  height?: string | number;
  variant?: "text" | "rectangular" | "circular";
  count?: number;
  animated?: boolean;
  className?: string;
  style?: CSSProperties;
}

const SkeletonLoader = ({
  width = "100%",
  height,
  variant = "rectangular",
  count = 1,
  animated = true,
  className,
  style: styleParam,
}: SkeletonLoaderProps) => {
  const skeletonHeight = height ?? (variant === "text" ? "1em" : "100%");

  return (
    <>
      {Array.from({ length: Math.max(0, Math.floor(count)) }, (_, index) => (
        <span
          key={index}
          className={[
            styles.skeleton,
            styles[variant],
            animated ? styles.animated : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            width,
            height: skeletonHeight,
            ...styleParam,
          }}
          aria-hidden="true"
        />
      ))}
    </>
  );
};

export default SkeletonLoader;
