import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@ArgsType()
export class OrderByArgs {

	@Field( () => String, { nullable: true } )
	@IsOptional()
	@IsString()
	direction: string = 'desc';

	@Field( () => String, { nullable: true } )
	@IsOptional()
	@IsString()
	field: string = 'createdAt';

}