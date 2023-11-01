import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { TableNames } from '../enums/table-names.enum';
import { BaseEntity } from './base-entity';

@Entity({
    name: TableNames.Users,
})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;

    @Column()
    password: string;

    @Column({
        unique: true,
    })
    email: string;

    @Column({ nullable: true })
    surname: string | null;

    @Column({ nullable: true })
    name: string | null;

    @Column({ nullable: true })
    access_token: string | null;

    // @Column({ nullable: true })
    // phone: string | null;

    //   @ManyToMany(() => RoleEntity, role => role.users)
    //   @JoinTable({
    //     name: TableNames.UsersXRoles,
    //     joinColumn: {
    //       name: 'userId',
    //     },
    //     inverseJoinColumn: {
    //       name: 'roleId',
    //     },
    //   })
    //   roles: RoleEntity[];
}
