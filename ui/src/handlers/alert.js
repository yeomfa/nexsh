export const alert = {
  description: 'Show alert in the current window',
  handler(args) {
    window.alert(args.join(' ').trim() || 'This is a alert');
    return {
      text: 'Done!',
    };
  },
};
