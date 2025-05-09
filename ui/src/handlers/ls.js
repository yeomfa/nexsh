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
        text: 'Invalid param, use `ls help` for see avaliable params',
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
      return await fetch('/api/v1/databases')
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const dbs = data.data.databases;
          const dbsOutput = dbs.map((db) => db.name).join('<br>');

          return {
            text: dbsOutput,
            status: 'success',
          };
        })
        .catch((err) => {
          return {
            text: `Error: ${err.message}`,
            status: 'error',
          };
        });
    }

    // List collections
    if (param === 'collections') {
    }
  },
};
