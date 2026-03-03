import { useState } from "react";

export function useBirthDate() {
  return useState<string | null>(null);
}
