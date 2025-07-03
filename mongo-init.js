// MongoDB initialization script
db = db.getSiblingDB('mern_auth');

// Create collection
db.createCollection('users');

// Create indexes
db.users.createIndex({ "username": 1 }, { unique: true });
db.users.createIndex({ "createdAt": 1 });

print('Database initialized successfully!');