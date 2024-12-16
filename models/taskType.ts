import { Timestamp } from "firebase/firestore";

export interface TaskType {
  id: string;
  title: string;
  description: string;
  timestamp: Timestamp;
}
