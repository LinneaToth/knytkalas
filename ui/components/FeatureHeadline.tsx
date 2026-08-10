type Props = {
  size?: "small" | "medium" | "large";
  children: string;
  extraStyling?: string;
  color?: string;
};

export default function FeatureHeadline({
  children,
  size = "medium",
  extraStyling,
  color,
}: Props) {
  let styling =
    `relative z-10 ${color ? ` text-${color} ` : "text-secondary"} font-bagel before:content-[attr(data-text)] before:absolute before:left-0 before:top-0 before:-z-10 before:[-webkit-text-stroke:6px_white] ` +
    (extraStyling ? `${extraStyling} ` : "");

  styling +=
    size === "small"
      ? "text-md md:text-xl"
      : size === "medium"
        ? "text-xl md:text-3xl"
        : "text-5xl";

  return (
    <span className={styling} data-text={children}>
      {children}
    </span>
  );
}
