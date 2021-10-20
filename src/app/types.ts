export interface Ticket {
  requester: string,
  course: string,
  status: Status,
  reason: string,
}

export interface Person {
  name: string,
  isStudent: boolean
}

export interface Course {
  department: string,
  courseId: number
}

export enum Status {
  new,
  pending,
  resolved,
}
