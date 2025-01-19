import { UserGender, UserRoles } from 'src/modules/user/user.types';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserGender, default: UserGender.MALE })
  gender: UserGender;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  roles: UserRoles;

  @BeforeInsert()
  @BeforeUpdate()
  async beforeSave() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
