import { writeFile } from 'node:fs/promises';
const { dirname } = import.meta;
// Write JSON
export const writeJSON = async (resource, object) => {
  try {
    await writeFile(
      `${dirname}/../resources/${resource}.json`,
      JSON.stringify(object),
    );
  } catch (err) {
    throw new Error(err.message);
  }
};
