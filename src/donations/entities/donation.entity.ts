import { ObjectType, Field, ID, Int } from '@nestjs/graphql';
import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity( { name: 'donations' } )
@ObjectType()
export class Donation {

	@PrimaryGeneratedColumn( 'uuid' )
	@Field( () => ID )
	id: string;

	@Column()
	@Field( () => Int )
	count: number;

	@Column()
	@Field( () => String )
	displayName: String;

	@Column()
	@Field( () => String )
	email: String;

	@Column( { nullable: true } )
	@Field( () => String, { nullable: true } )
	mobile: String;

	@Column( { nullable: true } )
	@Field( () => String, { nullable: true } )
	team: String;

	@Column( { nullable: true } )
	@Field( () => String, { nullable: true } )
	message: String;

	@CreateDateColumn()
	@Field( () => Date )
	createdAt: Date;

}
