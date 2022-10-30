import { Resolver, Query, Mutation, Args, Int, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { DonationsService } from './donations.service';
import { Donation } from './entities/donation.entity';
import { CreateDonationInput, OrderByArgs } from './dto';

const pubSub = new PubSub();

@Resolver( () => Donation )
export class DonationsResolver {

	constructor(
		private readonly donationsService: DonationsService
	) { }

	@Mutation( () => Donation )
	async createDonation(
		@Args( 'createDonationInput' ) createDonationInput: CreateDonationInput
	): Promise<Donation> {

		const donation = await this.donationsService.create( createDonationInput );

		const total = await this.donationsService.totalDonations();

		pubSub.publish( 'totalUpdated', { totalUpdated: total } );

		return donation;

	}

	@Query( () => [ Donation ], { name: 'donations' } )
	findAll(
		@Args() orderBy: OrderByArgs
	): Promise<Donation[]> {
		return this.donationsService.findAll( orderBy );
	}

	@Query( () => Donation, { name: 'donation' } )
	findOne(
		@Args( 'id', { type: () => String } ) id: string
	): Promise<Donation> {
		return this.donationsService.findOne( id );
	}

	// Aggregations
	@Query( () => Int, { name: 'totalDonations' } )
	totalDonations(): Promise<number> {
		return this.donationsService.totalDonations();
	}

	// Subscriptions
	@Subscription( () => Int )
	totalUpdated() {
		return pubSub.asyncIterator( 'totalUpdated' );
	}

}
