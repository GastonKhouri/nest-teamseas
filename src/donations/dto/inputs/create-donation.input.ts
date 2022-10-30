import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class CreateDonationInput {

	@Field( () => Int )
	@Min( 1 )
	count: number;

	@Field( () => String )
	@IsString()
	@MinLength( 3 )
	@Transform( ( { value } ) => value.trim() )
	displayName: string;

	@Field( () => String )
	@IsEmail()
	@Transform( ( { value } ) => value.trim() )
	email: string;

	@Field( () => String, { nullable: true } )
	@IsString()
	@IsOptional()
	@Transform( ( { value } ) => value.trim() )
	mobile?: string;

	@Field( () => String, { nullable: true } )
	@IsString()
	@IsOptional()
	@Transform( ( { value } ) => value.trim() )
	team?: string;

	@Field( () => String, { nullable: true } )
	@IsString()
	@IsOptional()
	@Transform( ( { value } ) => value.trim() )
	message?: string;

}
