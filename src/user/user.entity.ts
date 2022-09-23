import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../config/config.service';
import { Post } from '../post/post.entity';
import {UserRoles} from './enum/UserRoles';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;

  @Column()
  email: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: string;

  @Column()
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;

  @BeforeInsert()
  @BeforeUpdate()
  async setPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(
        this.password,
        parseInt(ConfigService.getVariable('SALT_LENGTH')),
      );
    }
  }
}
