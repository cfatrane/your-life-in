export type Category = {
  color: string;
  label: string;
  max: number;
  min: number;
  parent?: string;
};

export type WeekCell = {
  id: number;
  isActive: boolean;
};
