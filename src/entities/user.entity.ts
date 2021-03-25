import {
  Entity,
  Column,
  BeforeInsert,
  OneToMany,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm';
import bcrypt from 'bcrypt';
import Budget from './budget.entity';

const saltRounds = parseInt(process.env.CRYPT_SALT as string, 10);

@Entity({ name: 'users' })
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string

  @Column()
  lastName?: string

  @Column()
  email!: string

  @OneToMany(() => Budget, budget => budget.user)
  budgets?: Budget[]

  @Column()
  password!: string

  @BeforeInsert()
  cryptPassword() {
    const salt = bcrypt.genSaltSync(saltRounds)
    this.password = bcrypt.hashSync(this.password, salt);
  }

  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: string

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: string

  // entity methods
  static async findOneWithJoins(id: string | number): Promise<User | undefined> {
    return await this.createQueryBuilder('user')
                     .leftJoinAndSelect('user.budgets', 'budget')
                     .where('user.id = :id', { id })
                     .getOne();
  }

  // User methods

  authorized(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }

  payload() {
    const { id } = this;
    return { id };
  }
}

export default User;
