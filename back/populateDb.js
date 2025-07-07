import { sql } from "./dbConnection.js";
import { hash } from "argon2";

const createAllTables = async () => {
  try {
    console.log("Creating all database tables...");

    // 1. Create Users table first
    console.log("Creating Users table...");
    await sql`
      CREATE TABLE IF NOT EXISTS Users(
        id SERIAL PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user'
      );
    `;

    // Add test users
    console.log("Adding test users...");

    // Hash the passwords properly
    const adminPassword = await hash("admin123");
    const userPassword = await hash("user123");

    await sql`
      INSERT INTO Users(username, email, password, role) 
      VALUES 
        ('admin', 'admin@example.com', ${adminPassword}, 'admin'),
        ('user', 'user@example.com', ${userPassword}, 'user')
      ON CONFLICT (email) DO NOTHING;
    `;

    // 2. Create Treatments table
    console.log("Creating Treatments table...");
    await sql`
      CREATE TABLE IF NOT EXISTS Treatments(
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(255) NOT NULL,
        start_time TIME NOT NULL, 
        link_to_cover_image VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    // Add some test treatments
    console.log("Adding test treatments...");
    await sql`
      INSERT INTO Treatments(title, category, start_time, link_to_cover_image)
      VALUES 
        ('Haircut', 'Hair', '08:00:00', 'https://media.istockphoto.com/id/640274128/photo/barber-using-scissors-and-comb.webp?s=2048x2048&w=is&k=20&c=JfHrRbaY4VFXB3S3e-ZdNneYAoakxw0E3OK8egtEYPQ='),
        ('Pedicure', 'Nails', '09:00:00', 'https://media.istockphoto.com/id/545984710/photo/woman-in-nail-salon-receiving-pedicure-by-beautician.webp?s=2048x2048&w=is&k=20&c=a_8JAgm-51ahgdFGn_r5sifAD8S86xzs3FAippkmKSE='),
        ('Thai Massage', 'Massage', '15:00:00', 'https://media.istockphoto.com/id/1484026069/photo/relaxation-woman-back-massage-with-masseur-in-cosmetology-spa-centre.webp?s=2048x2048&w=is&k=20&c=03gKm1RrNCxBmJS74gJU_cvkSxbaThARIu4nEJcLmss=')
      ON CONFLICT DO NOTHING;
    `;

    // 3. Create Treatment Reservations table
    console.log("Creating Treatment Reservations table...");
    await sql`
      CREATE TABLE IF NOT EXISTS Treatment_Reservations(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
        treatment_id INTEGER REFERENCES Treatments(id) ON DELETE CASCADE,
        reserved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(20) DEFAULT 'reserved' CHECK (status IN ('reserved', 'completed', 'cancelled')),
        rating SMALLINT CHECK (rating > 0 AND rating <= 5),
        completed_at TIMESTAMP,
        notes TEXT
      );
    `;

    // 4. Create treatment categories table and data
    console.log("Creating Categories table...");
    await sql`
    CREATE TABLE IF NOT EXISTS Categories (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
    console.log("Adding default categories...");
    await sql`
    INSERT INTO Categories(name, description)
    VALUES 
      ('Hair', 'Beauty treatments for hair'),
      ('Nails', 'Beauty treatments for nails'),
      ('Massage', 'Beauty body treatments')
    ON CONFLICT DO NOTHING;
  `;

    // Create indexes for better performance
    console.log("Creating indexes...");
    await sql`
      CREATE INDEX IF NOT EXISTS idx_treatment_reservations_user_id ON Treatment_Reservations(user_id);
    `;
    await sql`
      CREATE INDEX IF NOT EXISTS idx_treatment_reservations_treatment_id ON Treatment_Reservations(treatment_id);
    `;
    console.log("✅ All tables created successfully!");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
  } finally {
    await sql.end();
  }
};

createAllTables();
