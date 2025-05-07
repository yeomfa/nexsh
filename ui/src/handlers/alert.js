export const alert = {
  description: 'Show alert in the current window',
  handler() {
    window.alert('This is a alert');
    return {
      text: 'Done!',
    };
  },
};
