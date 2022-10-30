import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DonationsService } from './donations.service';
import { DonationsResolver } from './donations.resolver';
import { Donation } from './entities/donation.entity';

@Module( {
	providers: [ DonationsResolver, DonationsService ],
	exports: [ DonationsService, TypeOrmModule ],
	imports: [ TypeOrmModule.forFeature( [ Donation ] ) ],
} )
export class DonationsModule { }
