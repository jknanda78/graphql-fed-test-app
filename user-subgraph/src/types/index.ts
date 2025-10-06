export type Message = {
  msg: string;
  error: boolean;
  code: string;
};

export type Session = {
  id: string;
};

export type User = {
  id: string;
  email: string;
  name: Name;
  createdAt: string;
};

export type Name = {
  firstName: string;
  lastName: string;
};

export type UserInput = {
  email: string;
  name: Name;
};

export type UserTable = {
  userId: string;
  emailId: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  sessions: string;
};
