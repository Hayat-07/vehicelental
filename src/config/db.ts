
import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
    connectionString: config.dbUrl
});

const initDB = async () => {
    if (!config.dbUrl) {
        console.warn('DB URL (DBURL) is not set. Skipping database initialization.');
        return;
    }

    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) UNIQUE NOT NULL,
                password VARCHAR(100) NOT NULL CHECK (char_length(password) >= 6),
                phone VARCHAR(15) NOT NULL,
                role VARCHAR(100) CHECK (role IN ('admin', 'customer'))
            );
        `);

        await pool.query(`
            CREATE TABLE IF NOT EXISTS vehicles (
                id SERIAL PRIMARY KEY,
                vehicle_name VARCHAR(100) NOT NULL,
                type VARCHAR(100) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
                registration_number VARCHAR(100) UNIQUE NOT NULL,
                daily_rent_price NUMERIC NOT NULL CHECK (daily_rent_price > 0),
                availability_status VARCHAR(100) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            );
        `);

        await pool.query(`
        CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        customer_id INTEGER REFERENCES users(id),
        vehicle_id INTEGER REFERENCES vehicles(id),
        rent_start_date DATE NOT NULL,
        rent_end_date DATE NOT NULL CHECK (rent_end_date > rent_start_date),
        total_price NUMERIC NOT NULL CHECK (total_price > 0),
        status VARCHAR(100) NOT NULL CHECK (status IN ('active', 'returned', 'cancelled'))
    )
`);


        console.log('Database initialized from initDB on db.ts page');
    } catch (err) {
        console.error('Failed to initialize database:', err);
        throw err;
    }
};

export default initDB;