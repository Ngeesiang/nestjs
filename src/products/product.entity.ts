import { Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Product extends Model<Product> {
    @PrimaryGeneratedColumn('uuid') id: string;

    @CreateDateColumn() created: Date;

    @Column('text') title: string;

    @Column('text') description: string;

    @Column('int') price: number;
}