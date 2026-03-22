require('dotenv').config();
const mongoose = require('mongoose');
const Client = require('./models/Client');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mini-compliance-tracker';

const clients = [
  { companyName: 'LedgersCFO', country: 'USA', entityType: 'Corporation' },
  { companyName: 'Stark Industries', country: 'USA', entityType: 'LLC' },
  { companyName: 'Wayne Enterprises', country: 'USA', entityType: 'Corporation' },
  { companyName: 'Acme Corp', country: 'UK', entityType: 'LTD' }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing clients
    await Client.deleteMany({});
    console.log('🧹 Cleared existing clients');

    // Insert new clients
    const inserted = await Client.insertMany(clients);
    console.log(`🌱 Seeded ${inserted.length} clients successfully!`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seed();
