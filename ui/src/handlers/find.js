import waiter from '../helpers/waiter';

export const find = {
  description: 'Find documents by collection in current DB',
  async handler(args, contextController) {
    const { currDatabase } = contextController;

    // Validate DBS
    if (!currDatabase.id) {
      return {
        text: 'You should select a database with `use database_name` command',
        status: 'error',
      };
    }

    // Validate args
    if (args.length < 1) {
      return {
        text: 'Invalid param, use `find help` for see available params',
        status: 'error',
      };
    }

    // Help
    if (args[0].trim() === 'help') {
      return {
        text: `
        <span class="semibold">[collection_name]</span>, list all documents in collection<br>
      `,
      };
    }

    // Get collection
    const collectionName = args[0].trim();

    try {
      const { data: colData } = await waiter.get(
        `/api/v1/databases/${currDatabase.name}/collections/${collectionName}`,
      );

      const collection = colData?.collection;

      // Validate collection
      if (!collection) {
        return {
          text: 'Collection not exists in current database',
          status: 'error',
        };
      }

      // Get all documents
      const { data: docsData } = await waiter.get(
        `/api/v1/databases/${currDatabase.name}/collections/${collectionName}/documents`,
      );

      const documents = docsData?.documents;
      const output = documents
        .map((document) => `<pre>${JSON.stringify(document, null, 2)} </pre>`)
        .join('');

      return {
        text: output,
        status: 'success',
      };
    } catch (err) {
      return {
        text: `${e.message}`,
        status: 'error',
      };
    }
  },
};
