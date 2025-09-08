import { connection } from "./connection";

/**
 * Connects to the database, drops existing tables if they exist,
 */
const connectDB = async () => {
  const { schema } = connection;

  // Drop existing tables if they exist
  await schema.dropTableIfExists("article");
  await schema.dropTableIfExists("user");

  // Create the user table
  await schema.createTable("user", (table) => {
    table.text("userId").notNullable().primary();
    table.enum("accountType", ["ADMIN", "USER", "GUEST", "AUTHOR"]).notNullable();
    table.text("name").notNullable();
    table.text("email").notNullable().unique();
    table.text("createdAt").notNullable();
  });

  // Create the article table
  await schema.createTable("article", (table) => {
    table.text("articleId").notNullable().primary();
    table.text("userId").notNullable().references("userId").inTable("user");
    table.text("title").notNullable();
    table.text("createdAt").notNullable();
  });

  // Insert sample data into the user table
  await connection.table("user").insert([
    {
      userId: "902bb37b-a002-4f4f-b3f2-97bda6db3de8",
      accountType: "USER",
      name: "John Doe",
      email: "john.doe@email.com",
      createdAt: "2025-08-29T09:00:00.000Z",
    },
    {
      userId: "e8bc0cb2-a22d-49dc-857e-fc824ed3710e",
      accountType: "USER",
      name: "Brian Armstrong",
      email: "brian.armstrong@email.com",
      createdAt: "2025-08-30T10:00:00.000Z",
    },
  ]);

  // Insert sample data into the article table
  await connection.table("article").insert([
    {
      articleId: "e8bc0cb2-a22d-49dc-857e-fc824ed3710e",
      userId: "902bb37b-a002-4f4f-b3f2-97bda6db3de8",
      title: "Article 1",
      createdAt: "2025-08-29T09:00:00.000Z",
    },
    {
      articleId: "902bb37b-a002-4f4f-b3f2-97bda6db3de8",
      userId: "e8bc0cb2-a22d-49dc-857e-fc824ed3710e",
      title: "Article 2",
      createdAt: "2025-08-30T10:00:00.000Z",
    },
  ]);

  // Exit the process
  process.exit();
};

// Execute the connectDB function
connectDB();
