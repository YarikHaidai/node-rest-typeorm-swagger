import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '../config/config.service';

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

  @Column()
  role: string;

  @Column()
  password: string;

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
