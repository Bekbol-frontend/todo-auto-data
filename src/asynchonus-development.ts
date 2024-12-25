// Write a function that accepts an array of URLs,
// makes parallel queries for each of them, and returns an
// an array of results in the order in which the queries are completed.

// Example input data:
// const urls = ['https://jsonplaceholder.typicode.com/posts/1',
// 'https://jsonplaceholder.typicode.com/posts/2'];

// Expected result:
// [
// { data: { ... }, status: 200 },
// { data: { ... }, status: 200 }
// ]
interface IData {
  userId: number;
  id: number;
  title: string;
  body: string;
}

type RequestsResult = {
  data: IData;
  status: number;
};

export async function fetchAll(urls: string[]): Promise<RequestsResult[]> {
  try {
    const responses: Response[] = await Promise.all(
      urls.map((url) => fetch(url))
    );
    return Promise.all(
      responses.map((res) => res.json() as Promise<RequestsResult>)
    );
  } catch (error) {
    throw error;
  }
}

module.exports = { fetchAll };
