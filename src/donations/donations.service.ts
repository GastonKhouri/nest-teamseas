import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateDonationInput, OrderByArgs } from './dto';
import { Donation } from './entities/donation.entity';

@Injectable()
export class DonationsService {

	constructor(
		@InjectRepository( Donation )
		private readonly donationsRepository: Repository<Donation>,
	) { }

	create( createDonationInput: CreateDonationInput ): Promise<Donation> {
		return this.donationsRepository.save( createDonationInput );
	}

	findAll( orderBy: OrderByArgs ): Promise<Donation[]> {

		const { field, direction } = orderBy;

		return this.donationsRepository.find( {
			order: {
				[ field ]: direction
			}
		} );

	}

	findOne( id: string ): Promise<Donation> {
		return this.donationsRepository.findOneBy( { id } );
	}

	// Aggregations
	async totalDonations(): Promise<number> {

		const { totalDonations } = await this.donationsRepository
			.createQueryBuilder( 'donation' )
			.select( 'SUM(donation.count)', 'totalDonations' )
			.getRawOne();

		return totalDonations;

	}

}
