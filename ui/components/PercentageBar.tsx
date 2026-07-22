type Props = {
  data: { label: string; amount: number; color: string }[];
};

export default function PercentageBar({ data }: Props) {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  return (
    <div className="flex w-full overflow-hidden rounded-3xl">
      {data.map((item) => {
        const percentage = total > 0 ? (item.amount / total) * 100 : 0;
        return (
          <div
            key={item.label}
            className="h-4"
            style={{
              width: `${percentage}%`,
              backgroundColor: `${item.color}`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
