import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config();

export const databaseConnection = async () => {
  var db_url = process.env.DATABASE_URL as string;
  const db_username = process.env.DATABASE_USERNAME as string;
  const db_password = process.env.DATABASE_PASSWORD as string;
  const db_name = process.env.DATABASE_NAME;

  try {
    const [path, query] = db_url?.split("?");

    db_url = `${path}${db_name}?${query}`;

    db_url = db_url
      ?.replace("<db_username>", db_username)
      .replace("<db_password>", db_password);

    await mongoose
      .connect(db_url)
      .then((value) => console.log("Database is connected."));
  } catch (error) {
    console.log("Unable to Connect to Database");
    return error;
  }
};
