import { UserGender, UserRoles } from 'src/modules/user/user.types';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LikeEntity } from './Like.entity';

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

  @OneToMany(() => LikeEntity, (like) => like.user)
  likes: LikeEntity[]

  @BeforeInsert()
  @BeforeUpdate()
  async beforeSave() {
    if (!this.password) return;

    this.password = await bcrypt.hash(this.password, 10);
  }
}
