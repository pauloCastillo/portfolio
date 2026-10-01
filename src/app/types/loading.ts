export type LoadingProps = {
  showLoader?: boolean;
  loaderLabel?: string;
  skeletonItems?: number;
};

export type SkeletonProps = {
  width?: string | number;
  height?: string | number;
  rounded?: string;
  className?: string;
};

export type LoaderProps = {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
};