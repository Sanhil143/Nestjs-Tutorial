import { Expose } from "class-transformer";

export class userDto {
  @Expose()
  userId:number;

  @Expose()
  email:string;
}