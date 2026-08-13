type Props = {
  status: "PENDING" | "GOING" | "DECLINED";
  amt: number;
};

export default function GuestsIcon({ status, amt }: Props) {
  const styleMap = {
    PENDING: " bg-inactive ",
    GOING: " bg-success ",
    DECLINED: " bg-warning ",
  };

  const style = `flex items-center rounded-lg  py-1 text-xs font-semibold flex-col`;

  return (
    <div className={style}>
      <p>
        {status === "PENDING"
          ? "Pending: "
          : status === "GOING"
            ? "Accepted: "
            : "Declined: "}
        {amt}
      </p>
    </div>
  );
}
