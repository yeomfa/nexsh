export const log = {
  description: 'Use console.log() from nexsh',
  handler(args) {
    console.log(args.join(' '));

    return {
      text: 'Done!',
    };
  },
};
