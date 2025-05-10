// Get
const get = async (url) => {
  const data = await fetch(url)
    .then((res) => res.json())
    .catch((err) => {
      throw new Error(err.message);
    });

  return data;
};

export default {
  get,
};
