const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import Models
const User = require('./app/models/User');
const Customer = require('./app/models/Customer');
const Case = require('./app/models/Case');

async function seedDatabase() {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected successfully!");

        // Clear existing data
        console.log("Clearing existing data...");
        await User.deleteMany({});
        await Customer.deleteMany({});
        await Case.deleteMany({});
        console.log("Database cleared.");

        // 1. Seed Users
        console.log("Seeding Users...");
        const hashedAdminPassword = await bcrypt.hash('admin123', 10);
        const hashedPassword = await bcrypt.hash('password123', 10);

        const admin = new User({
            username: 'admin',
            password_hash: hashedAdminPassword,
            role: 'admin'
        });

        const employee1 = new User({
            username: 'alice_smith',
            password_hash: hashedPassword,
            role: 'employee'
        });

        const employee2 = new User({
            username: 'bob_jones',
            password_hash: hashedPassword,
            role: 'employee'
        });

        await admin.save();
        await employee1.save();
        await employee2.save();
        console.log("Users seeded successfully!");

        // 2. Seed Customers
        console.log("Seeding Customers...");
        const customers = [
            { name: 'Acme Corporation', contact_info: 'contact@acme.com | +1 (555) 019-2834', status: 'active' },
            { name: 'Wayne Enterprises', contact_info: 'info@waynecorp.com | +1 (555) 043-9821', status: 'active' },
            { name: 'Stark Industries', contact_info: 'support@stark.com | +1 (555) 089-3321', status: 'active' },
            { name: 'Initech Corp', contact_info: 'peter@initech.com | +1 (555) 012-9900', status: 'inactive' },
            { name: 'Globex Corporation', contact_info: 'hank@globex.com | +1 (555) 077-8811', status: 'active' },
            { name: 'Tyrell Corporation', contact_info: 'replicant@tyrell.co | +1 (555) 066-5544', status: 'active' },
            { name: 'Umbrella Corp', contact_info: 'lab@umbrella.org | +1 (555) 033-2211', status: 'inactive' }
        ];

        const insertedCustomers = await Customer.insertMany(customers);
        console.log("Customers seeded successfully!");

        // 3. Seed Cases
        console.log("Seeding Cases...");
        const cases = [
            {
                customer_id: insertedCustomers[0]._id, // Acme
                assigned_to: employee1._id, // Alice
                priority: 'high',
                status: 'open'
            },
            {
                customer_id: insertedCustomers[1]._id, // Wayne
                assigned_to: employee2._id, // Bob
                priority: 'medium',
                status: 'in-progress'
            },
            {
                customer_id: insertedCustomers[2]._id, // Stark
                assigned_to: admin._id, // Admin
                priority: 'high',
                status: 'open'
            },
            {
                customer_id: insertedCustomers[4]._id, // Globex
                assigned_to: employee1._id, // Alice
                priority: 'low',
                status: 'closed'
            },
            {
                customer_id: insertedCustomers[0]._id, // Acme
                assigned_to: employee2._id, // Bob
                priority: 'medium',
                status: 'closed'
            },
            {
                customer_id: insertedCustomers[5]._id, // Tyrell
                assigned_to: employee1._id, // Alice
                priority: 'high',
                status: 'in-progress'
            }
        ];

        await Case.insertMany(cases);
        console.log("Cases seeded successfully!");

        console.log("\nDatabase successfully seeded and ready to go!");
        console.log("------------------------------------------------");
        console.log("Demo Credentials:");
        console.log("1. Username: admin         | Password: admin123 (Admin Role)");
        console.log("2. Username: alice_smith   | Password: password123 (Employee Role)");
        console.log("3. Username: bob_jones     | Password: password123 (Employee Role)");
        console.log("------------------------------------------------");

        mongoose.connection.close();
    } catch (err) {
        console.error("Error seeding database:", err);
        mongoose.connection.close();
    }
}

seedDatabase();
