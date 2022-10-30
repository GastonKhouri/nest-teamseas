import { Resolver, Mutation } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {

	constructor(
		private readonly seedService: SeedService
	) { }

	@Mutation( () => Boolean, { name: 'executeSeed', description: 'Build database' } )
	executeSeed() {
		return this.seedService.executeSeed();
	}

}
