export type TUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
  isBlocked: boolean;
};
