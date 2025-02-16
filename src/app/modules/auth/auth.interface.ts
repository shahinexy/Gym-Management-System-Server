export type TUserRegister = {
  name: string;
  age: number;
  gender: "male" | "female";
  email: string;
  password: string;
  role: "admin" | "trainer" | "trainee";
  isBlocked: boolean;
};

export type TLoginUser ={
  email: string;
  password: string;
}