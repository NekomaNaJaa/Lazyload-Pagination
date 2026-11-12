type Props = {
  value: number;
  options: number[];
  onChange: (value: number) => void;
};

export default function PageSizeSelect({ value, options, onChange }: Props) {
  return (
    <label className="mb-4 flex items-center gap-2">
      <span>แสดงต่อหน้า</span>
      <select
        className="rounded border px-2 py-1"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      >
        {options.map((n) => (
          <option key={n} value={n}>
            {n} รายการ
          </option>
        ))}
      </select>
    </label>
  );
}
