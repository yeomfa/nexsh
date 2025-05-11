import waiter from '../helpers/waiter';

export const ls = {
  description: 'List databases and collections',
  async handler(args) {
    // Guard clauss
    console.log(args);
    if (
      args.length === 0 ||
      !['help', 'dbs', 'collections'].includes(args[0].trim())
    )
      return {
        text: 'Invalid param, use `ls help` for see available params',
        status: 'error',
      };

    let text = '';
    let status = '';
    const param = args[0].trim();

    // Show help
    if (param === 'help') {
      return {
        text: `
        <span class="semibold">dbs</span>, list databases<br>
        <span class="semibold">collections</span>, list collections
      `,
      };
    }

    // List dbs
    if (param === 'dbs') {
      const { data } = await waiter.get('/api/v1/databases');
      const dbs = data.databases;
      const dbsOutput = dbs.map((db) => db.name).join('<br>');

      return {
        text: dbsOutput,
        status: 'success',
      };
    }

    // List collections
    if (param === 'collections') {
      const currDatabase = {};

      if (!currDatabase.id)
        return {
          text: 'You should select a database with `use database_name` command',
          status: 'error',
        };

      // const { data } = await waiter.get('/api/v1/databases/:id/collections');
      const collections = data.collections;
      const collectionsOutput = collections
        .map((collection) => collection.name)
        .join('<br>');

      return {
        text: collectionsOutput,
        status: 'success',
      };
    }

    // List collections
    if (param === 'collections') {
    }
  },
};
