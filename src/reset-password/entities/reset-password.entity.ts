import { Users } from 'src/users/entities/users.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ResetPassword {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 128, nullable: false })
  token: string;

  @Column({ nullable: false, type: 'datetime' })
  expiration: Date;

  @ManyToOne(() => Users, (user) => user.resetPassword)
  user: Users;
}
