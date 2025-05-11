// Get
const get = async (url) => {
  try {
    const res = await fetch(url);
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Post
const post = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Patch
const patch = async (url, body) => {
  try {
    const res = await fetch(url, {
      method: 'patch',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

// Delete
const del = async (url) => {
  try {
    const res = await fetch(url, {
      method: 'delete',
    });
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error(err.message);
  }
};

export default {
  get,
  post,
  patch,
  del,
};
