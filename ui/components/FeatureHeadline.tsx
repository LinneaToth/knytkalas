type Props = {
  size?: "small" | "medium" | "large";
  children: string;
  extraStyling?: string;
};

export default function FeatureHeadline({
  children,
  size = "medium",
  extraStyling,
}: Props) {
  let styling =
    "relative z-10 text-secondary before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:-z-10 before:[-webkit-text-stroke:6px_white] " +
    (extraStyling ? `${extraStyling} ` : "");

  styling +=
    size === "small"
      ? "text-md md:text-xl"
      : size === "medium"
        ? "text-xl md:text-3xl"
        : "text-3xl md:text-4xl";

  return (
    <h1 className={styling} data-text={children}>
      {children}
    </h1>
  );
}
