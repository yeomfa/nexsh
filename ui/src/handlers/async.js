export const async = {
  description: 'Testing async method with promise',
  async handler() {
    return Promise.resolve().then(() => {
      for (let index = 0; index < 10000000000; index++) {}

      return {
        text: 'async function tested!',
        status: 'success',
      };
    });
  },
};
