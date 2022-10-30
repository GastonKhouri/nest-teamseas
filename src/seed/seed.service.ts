import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Donation } from '../donations/entities/donation.entity';

import { DonationsService } from '../donations/donations.service';
import { SEED_DONATIONS } from './data/seed-data';

@Injectable()
export class SeedService {

	private isProd: boolean;

	constructor(

		configService: ConfigService,

		@InjectRepository( Donation )
		private readonly donationsRepository: Repository<Donation>,

		private readonly donationsService: DonationsService,

	) {
		this.isProd = configService.get( 'STATE' ) === 'prod';
	}

	async executeSeed(): Promise<boolean> {

		if ( this.isProd ) {
			throw new UnauthorizedException( 'Can not run seed in production' );
		}

		// Delete database
		await this.clearDatabase();

		// Load donations
		await this.loadDonations();

		return true;

	}

	async clearDatabase() {

		// Delete all donations
		await this.donationsRepository.createQueryBuilder()
			.delete()
			.where( {} )
			.execute();

	}

	async loadDonations(): Promise<void> {

		const donations = SEED_DONATIONS.map( donation => {
			return this.donationsService.create( donation );
		} );

		await Promise.all( donations );

	}

}