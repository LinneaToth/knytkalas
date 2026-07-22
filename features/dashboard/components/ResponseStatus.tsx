type Props = {
  role: "guest" | "host";
  status: "GOING" | "PENDING" | "DECLINED";
};

export default function ResponseStatus({ role, status }: Props) {
  return (
    <div className="bg-primary h-full w-full rounded-md text-center">
      {role === "host" && <span>Organizer</span>}
      {status === "PENDING" && role === "guest" ? (
        <span>Let the host know if you can make it!</span>
      ) : (
        <div className="group flex items-center gap-2">
          <span>
            {status === "GOING"
              ? "You are going!"
              : "You have declined the invitation"}
          </span>
        </div>
      )}
    </div>
  );
}
