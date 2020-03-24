import { Entity, Column, ObjectIdColumn, BeforeInsert } from 'typeorm';

@Entity({
  name: 'User',
})
export class User {
  @ObjectIdColumn()
  _id: string;
  @Column()
  username: string;
  @Column()
  password: string;
  @Column()
  role: string;
  @Column()
  activate: boolean;

}
