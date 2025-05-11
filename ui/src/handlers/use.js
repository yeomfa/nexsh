import waiter from '../helpers/waiter';

export const use = {
  description: 'Switch or create databases',
  async handler(args, contextController) {
    // Clauss guard
    if (args.length === 0) {
      return {
        text: 'Invalid param, use `use help` for see available params',
        status: 'error',
      };
    }

    // Get param
    const param = args[0].trim();

    // Show help
    if (param === 'help') {
      return {
        text: `<span class="semibold">[database_name]</span>, Database name to use<br>`,
      };
    }

    // Find database
    const dbName = param;

    // Get all databes
    const { data: databasesData } = await waiter.get(`/api/v1/databases`);
    const databases = databasesData.databases;

    // Validate databse
    let database = databases.find((db) => db.name === dbName);

    // If not exist, then create
    if (!database) {
      const databaseData = await waiter.post(`/api/v1/databases`, {
        name: dbName,
      });

      // Handle error
      if (databaseData.status !== 'success') {
        return {
          text: `Error creating ${dbName} database; ${databaseData.message}`,
          status: 'error',
        };
      }

      // Update database
      database = databaseData.data.database;
    }

    // Update context
    contextController.updateCurrDatabase(database);

    return {
      text: `Switched to <span class= "semibold"> ${database.name}</span > database`,
      status: 'success',
    };
  },
};
