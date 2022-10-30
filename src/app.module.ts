import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';

import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DonationsModule } from './donations/donations.module';
import { SeedModule } from './seed/seed.module';

@Module( {
	imports: [

		ConfigModule.forRoot(),

		GraphQLModule.forRoot<ApolloDriverConfig>( {
			driver: ApolloDriver,
			autoSchemaFile: join( process.cwd(), 'src/schema.gql' ),
			playground: false,
			subscriptions: {
				'graphql-ws': true,
				'subscriptions-transport-ws': true,
			},
			plugins: [
				ApolloServerPluginLandingPageLocalDefault
			]
		} ),

		TypeOrmModule.forRoot( {
			type: 'postgres',
			host: process.env.DB_HOST,
			port: +process.env.DB_PORT,
			username: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
			synchronize: true,
			autoLoadEntities: true
		} ),

		DonationsModule,

		SeedModule,

	],
	controllers: [],
	providers: [],
} )
export class AppModule { }
