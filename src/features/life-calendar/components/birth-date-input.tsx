import { Input } from "@/components/ui/input";

type BirthDateInputProps = {
  onChange: (value: string) => void;
};

export function BirthDateInput({ onChange }: BirthDateInputProps) {
  return (
    <Input
      className="h-12 w-fit"
      onChange={(event) => onChange(event.target.value)}
      type="date"
    />
  );
}
