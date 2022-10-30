import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SeedService } from './seed.service';
import { SeedResolver } from './seed.resolver';

import { DonationsModule } from '../donations/donations.module';

@Module( {
	providers: [ SeedResolver, SeedService ],
	imports: [
		ConfigModule,
		DonationsModule
	]
} )
export class SeedModule { }
