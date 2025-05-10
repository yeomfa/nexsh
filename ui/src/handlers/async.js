export const async = {
  description: 'Testing async method with promise',
  async handler() {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({
          text: 'async function tested!',
          status: 'success',
        });
      }, 2000),
    );
  },
};
