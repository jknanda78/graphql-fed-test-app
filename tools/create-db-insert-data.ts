import { connection } from './connection';

/**
 * Connects to the database, drops existing tables if they exist,
 */
const connectDB = async () => {
  const { schema } = connection;

  // Drop existing tables if they exist
  await schema.dropTableIfExists('article');
  await schema.dropTableIfExists('user');

  // Create the user table
  await schema.createTable('user', table => {
    table.text('userId').notNullable().primary();
    table.text('firstName').notNullable();
    table.text('lastName').notNullable();
    table.text('emailId').notNullable().unique();
    table.text('createdAt').notNullable();
    table.specificType('sessions', 'object[]');
  });

  // Create the article table
  await schema.createTable('article', table => {
    table.text('articleId').notNullable().primary();
    table.text('userId').notNullable().references('userId').inTable('user');
    table.text('emailId').notNullable().references('emailId').inTable('user'); // Denormalized field for @provides directive
    table.text('title').notNullable();
    table.text('createdAt').notNullable();
  });

  // Insert sample data into the user table
  await connection.table('user').insert([
    {
      userId: '902bb37b-a002-4f4f-b3f2-97bda6db3de8',
      firstName: 'John',
      lastName: 'Doe',
      emailId: 'john.doe@email.com',
      createdAt: '2025-08-29T09:00:00.000Z',
      sessions: JSON.stringify([
        { id: '364e9093-3119-48e6-826d-eca5ee72c3ec' },
        { id: 'dcd8c0af-d2b8-4487-ba53-9b4d158f4b93' },
        { id: '4208ebb1-e415-4447-96f5-8eae510ccaeb ' },
      ]),
    },
    {
      userId: 'e8bc0cb2-a22d-49dc-857e-fc824ed3710e',
      firstName: 'Brian',
      lastName: 'Armstrong',
      emailId: 'brian.armstrong@email.com',
      createdAt: '2025-08-30T10:00:00.000Z',
      sessions: JSON.stringify([{ id: '894bfb35-3d9e-4053-8e41-174299a77dfd' }]),
    },
  ]);

  // Insert sample data into the article table
  await connection.table('article').insert([
    {
      articleId: 'e8bc0cb2-a22d-49dc-857e-fc824ed3710e',
      userId: '902bb37b-a002-4f4f-b3f2-97bda6db3de8',
      emailId: 'john.doe@email.com',
      title: 'Article 1',
      createdAt: '2025-08-29T09:00:00.000Z',
    },
    {
      articleId: 'a881c407-923a-48ff-8c69-481893df39b4',
      userId: 'e8bc0cb2-a22d-49dc-857e-fc824ed3710e',
      emailId: 'brian.armstrong@email.com',
      title: 'Article 2',
      createdAt: '2025-08-30T10:00:00.000Z',
    },
    {
      articleId: 'a4cecefe-8d55-4dec-a056-e8a0209ce8ee',
      userId: '902bb37b-a002-4f4f-b3f2-97bda6db3de8',
      emailId: 'john.doe@email.com',
      title: 'Article 3',
      createdAt: '2025-09-01T09:00:00.000Z',
    },
    {
      articleId: '47978892-2036-4415-8005-e76b910c800e',
      userId: '902bb37b-a002-4f4f-b3f2-97bda6db3de8',
      emailId: 'john.doe@email.com',
      title: 'Article 4',
      createdAt: '2025-09-02T09:00:00.000Z',
    },
  ]);

  // Exit the process
  process.exit();
};

// Execute the connectDB function
connectDB();
