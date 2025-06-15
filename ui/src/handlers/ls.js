import waiter from '../helpers/waiter';

export const ls = {
  description: 'List databases and collections',
  async handler(args, contextController) {
    // Guard clauss
    if (
      args.length === 0 ||
      !['help', 'dbs', 'collections', 'col'].includes(args[0].trim())
    )
      return {
        text: 'Invalid param, use `ls help` for see available params',
        status: 'error',
      };

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
    if (param === 'collections' || param === 'col') {
      const { currDatabase } = contextController;

      if (!currDatabase.id)
        return {
          text: 'You should select a database with `use database_name` command',
          status: 'error',
        };

      const { data } = await waiter.get(
        `/api/v1/databases/${currDatabase.name}/collections`,
      );
      const collections = data.collections;
      const collectionsOutput =
        collections.length > 0
          ? collections.map((collection) => collection.name).join('<br>')
          : 'empty';
      return {
        text: collectionsOutput,
        status: collections.length > 0 ? 'success' : '',
      };
    }
  },
};
