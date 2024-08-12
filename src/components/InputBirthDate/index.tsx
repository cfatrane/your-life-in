"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";

function InputBirthDate() {
  const [birthDate, setBirthDate] = useState<string | null>(null);

  return (
    <Input
      className="w-36"
      onChange={(event) => setBirthDate(event.target.value)}
      type="date"
    />
  );
}
export default InputBirthDate;
