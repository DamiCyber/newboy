const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
	const count = await prisma.house.count();
	if (count > 0) {
		console.log('Houses already seeded');
		return;
	}
	await prisma.house.createMany({
		data: [
			{
				title: 'Modern Family Home',
				description: 'Spacious 4-bedroom near city center.',
				address: '123 Maple St',
				city: 'Lagos',
				pricePerNight: 150,
				bedrooms: 4,
				bathrooms: 3,
				imageUrl: 'https://picsum.photos/seed/house1/800/500',
				isActive: true
			},
			{
				title: 'Beachfront Apartment',
				description: 'Cozy 2-bedroom with ocean views.',
				address: '45 Ocean Ave',
				city: 'Accra',
				pricePerNight: 200,
				bedrooms: 2,
				bathrooms: 2,
				imageUrl: 'https://picsum.photos/seed/house2/800/500',
				isActive: true
			}
		]
	});
	console.log('Seeded sample houses');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

