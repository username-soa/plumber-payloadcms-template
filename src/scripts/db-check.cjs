const { createRequire } = require("module");
let pg;
try {
	pg = require("pg");
} catch (e) {
	try {
		const requirePostgres = createRequire(
			require.resolve("@payloadcms/db-postgres"),
		);
		pg = requirePostgres("pg");
	} catch (e2) {
		console.error("Could not resolve pg module");
		process.exit(1);
	}
}
const { Client } = pg;

const connectionString =
	"postgresql://postgres.neprbwaikfbjfnnwarmq:iumLCtL4tyGYgEmG@aws-1-eu-west-1.pooler.supabase.com:6543/postgres";

const client = new Client({
	connectionString,
	ssl: {
		rejectUnauthorized: false,
	},
});

async function run() {
	try {
		await client.connect();

		// Get all tables starting with 'forms'
		const resTables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name LIKE 'forms%'
      ORDER BY table_name;
    `);

		const tables = resTables.rows.map((r) => r.table_name);
		console.log("Tables found:", tables);

		const columnsMap = {};

		for (const table of tables) {
			const resColumns = await client.query(
				`
        SELECT column_name, data_type, is_nullable
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = $1
        ORDER BY ordinal_position;
      `,
				[table],
			);

			columnsMap[table] = resColumns.rows;
		}

		console.log(JSON.stringify(columnsMap, null, 2));
	} catch (err) {
		console.error("Error:", err);
	} finally {
		await client.end();
	}
}

run();
