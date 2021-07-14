import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true })
    email!: string;

    @Column({ nullable: false })
    password!: string;
  
    @Column()
    name!: string;
  
    @CreateDateColumn()
    createdAt!: Date;
  }
  