# Learn-backend

create .donenv file in root darectory variable name 
PORT=
MONGO_DB=

connect with mysql
import mysql from "mysql";
import util from "util";
import dotenv  from "dotenv";
dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  // debug: true,
});

const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

export { getConnectionAsync };


write controllers with mysql
import { getConnectionAsync } from "../config/db.js";
import util from "util";
import bcript from 'bcrypt'

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const Password = await bcript.hash(password, 10)
    if (!name) return res.status(400).json({ error: "Name is required." });
    const con = await getConnectionAsync();
    const createTeamQuery =
      "INSERT INTO user(name,email,password) VALUES (?,?,?)";
    const insertTeam = await util.promisify(con.query).bind(con)(createTeamQuery,[name, email, Password]);

    if (!insertTeam) {
      con.release();
      return res.status(401).json({ error: "Signup faild" });
    }
    con.release();
    return res.status(200).json("Signup successfully",);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email) return res.status(400).json({ error: "Email is required." });
    if (!password) return res.status(400).json({ error: "Password is required." });

    // Get a connection from the pool
    const con = await getConnectionAsync();

    // SQL query to get the user data
    const getUserQuery = "SELECT * FROM user WHERE email = ?";
    const rows = await util.promisify(con.query).bind(con)(getUserQuery, [email]);

    // Release the connection
    con.release();

    // Check if user exists
    if (rows.length === 0) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const user = rows[0];

    // Compare the provided password with the stored hashed password
    const isMatch = bcript.compare(password, user.password);

    // Check if the password is correct
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    // Send a success response with the user data (excluding password)
    const userData = {
      id: user.sno,
      name: user.name,
      email: user.email
    };

    return res.status(200).json({ message: "Login successful", user: userData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};



export { signup, login };
