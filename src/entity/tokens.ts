import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Users } from './users'

@Entity({ name: 'tokens', schema: 'public' })
export class Tokens extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
    id: number

  @Column({ name: 'jti', unique: true })
    jti: string

  @Column({ name: 'expires_at' })
    expiresAt: number

  @CreateDateColumn({ type: 'timestamp', name: 'created_at', default: () => 'CURRENT_TIMESTAMP(6)' })
    createdAt: Date

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updatedAt: Date

  @DeleteDateColumn({ type: 'timestamp', name: 'deleted_at', nullable: true })
    deletedAt: Date

  @ManyToOne(() => Users, user => user.tokens)
    user: Users
}
