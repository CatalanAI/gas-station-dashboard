export interface CardData {
  id: string;
  type: string;
  value: string | number;
  label: string;
  icon: string;
  percentage: number;
  backgroundColor: string;
  iconBackgroundColor: string;
  progressGradient: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
  message?: string;
}