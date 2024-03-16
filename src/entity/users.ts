import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Tokens } from './tokens'

@Entity({ name: 'users', schema: 'public' })
export class Users extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number

  @Column({ name: 'identification', length: 191, unique: true })
    identification: string

  @Column({ name: 'first_name', length: 191 })
    firstName: string

  @Column({ name: 'last_name', length: 191 })
    lastName: string

  @Column({ name: 'birthday', length: 191, nullable: true })
    birthday: string

  @Column({ name: 'email', length: 255, unique: true })
    email: string

  @Column({ name: 'username', length: 25, unique: true })
    username: string

  @Column({ name: 'password', length: 255 })
    password: string

  @Column({ name: 'active', default: true })
    isActive: boolean

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
    deletedAt: Date

  @OneToMany(() => Tokens, token => token.user)
    tokens: Tokens[]
}
