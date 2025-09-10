export interface Goal {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: 'points' | 'sales' | 'recruits';
  deadline: string;
}

export interface Bonus {
  id: string;
  name: string;
  amount: number;
  achievedDate: string;
  status: 'achieved' | 'pending';
}

export interface MonthlyEarning {
  month: string;
  total: number;
  bonuses: Bonus[];
}

export interface DownlineMember {
  name: string;
  level: string;
}

export interface Rank {
  level: number;
  name: string;
  requirements: string;
}

export interface FboData {
  id: string,
  name: string;
  memberLevel: string;
  totalCC: number;
  thisMonthCC: number;
  lastMonthCC: number;
  downlineCount: number;
  downline:DownlineMember[];
  thisMonthOrderCC: number;
  lastMonthOrderCC: number;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}