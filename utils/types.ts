export interface SignUpType {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginType {
  email: string;
  password: string;
}

export interface DatabaseType {
  users: any;
}
