type Props = {
  role: string;
  status?: "GOING" | "PENDING" | "DECLINED";
};

export default function ResponseStatus({ role, status = "PENDING" }: Props) {
  const borderColor =
    status === "GOING"
      ? "border-success"
      : status === "PENDING"
        ? "border-inactive"
        : "border-error";

  return (
    <div
      className={`${borderColor} bg-card-background flex h-8 items-center justify-center rounded-2xl border p-3 px-2 py-1 text-center text-xs font-medium shadow-sm`}
    >
      <span>
        {status === "GOING"
          ? "Going"
          : status === "DECLINED"
            ? "Not going"
            : role === "guest"
              ? "Host is awaiting your response"
              : "Pending"}
      </span>
    </div>
  );
}
