export interface IGoals {
  _id: string;
  questionText: string;
  options: GoalOption[];
  isActive: boolean;
  createdAt: string;
  __v: number;
}
export interface IGoalOption {
  text: string;
  isActive: boolean;
  _id: string;
}
