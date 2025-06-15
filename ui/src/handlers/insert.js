import waiter from '../helpers/waiter';

export const insert = {
  description: 'Insert new document in collection',
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
    if (args.length < 3 && !['help'].includes(args[0])) {
      return {
        text: 'Invalid param, use `insert help` for see available params',
        status: 'error',
      };
    }

    // Help
    if (args[0] === 'help') {
      return {
        text: `
        <span class="semibold">[collection_name]</span> [object], Insert object in collection<br>
      `,
      };
    }

    // Validate JSON object
    try {
      const documentObj = JSON.parse(args.slice(1).join(''));

      // Get collection
      const collectionName = args[0].trim();
      const data = await waiter.get(
        `/api/v1/databases/${currDatabase.name}/collections/${collectionName}`,
      );
      const collection = data.data?.collection;

      if (!collection) {
        return {
          text: 'Collection not exists in current database',
          status: 'error',
        };
      }

      // Build new document
      const document = {
        ...documentObj,
        dbId: currDatabase.id,
        collectionId: collection.id,
      };

      // Send request
      const documentData = await waiter.post(`/api/v1/documents`, document);

      if (documentData.status !== 'success') {
        return {
          text: 'Error when trying to create the document on the server',
          status: 'error',
        };
      }

      return {
        text: 'Document inserted',
        status: 'success',
      };
    } catch (e) {
      return {
        text: `${e.message}`,
        status: 'error',
      };
    }
  },
};
