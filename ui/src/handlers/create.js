import waiter from '../helpers/waiter';

export const create = {
  description: 'Create DB or Collection',
  async handler(args, contextController) {
    // Validate args
    if (
      args.length === 0 ||
      !['database', 'collection', 'db', 'col', 'help'].includes(args[0])
    ) {
      return {
        text: 'Invalid param, use `create help` for see available params',
        status: 'error',
      };
    }

    const param = args[0].trim();

    // Show help
    if (param === 'help') {
      return {
        text: `
        <span class="semibold">database | db [database_name]</span>, Create database<br>
        <span class="semibold">collection | col [collection_name]</span>, Create collection
      `,
      };
    }

    // Validate resource name
    if (args.length < 2 || !args[1].trim()) {
      return {
        text: 'Empty resource name, use `create [database | collection | db | col] [resource_name]`',
        status: 'error',
      };
    }

    const resourceName = args[1].trim();

    // Create database
    if (param === 'db' || param === 'database') {
      // Validate database name is not in use
      // 1) Get db
      const { data: dbData } = await waiter.get(
        `/api/v1/databases/${resourceName}`,
      );

      // 2) If exits return warning
      if (dbData?.database) {
        return {
          text: 'Database name is already in use!',
          status: 'error',
        };
      }

      // 3) Else, then create database
      const resDBData = await waiter.post(`/api/v1/databases`, {
        name: resourceName,
      });

      if (resDBData.status === 'success') {
        return {
          text: `${resourceName} created`,
          status: 'success',
        };
      }
    }

    // Create collection
    if (param === 'col' || param === 'collection') {
      // Valida curr database
      const { currDatabase } = contextController;
      if (!currDatabase.id)
        return {
          text: 'You should select a database with `use database_name` command',
          status: 'error',
        };

      // Validate collection is not in use
      // 1) Get collection
      const { data: colData } = await waiter.get(
        `/api/v1/databases/${currDatabase.name}/collections/${resourceName}`,
      );

      // 2) If exits return warning
      if (colData?.collection) {
        return {
          text: 'Collection name is already in use!',
          status: 'error',
        };
      }

      // 3) Else, then create new collection
      const resData = await waiter.post(`/api/v1/collections`, {
        name: resourceName,
        dbId: currDatabase.id,
      });

      console.log(resData);

      if (resData.status === 'success') {
        return {
          text: `${resourceName} created`,
          status: 'success',
        };
      }
    }
  },
};
