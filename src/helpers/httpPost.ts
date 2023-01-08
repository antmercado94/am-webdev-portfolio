type PostOptions = {
  endpoint: string;
  method: string;
  headers: HeadersInit;
  data: BodyInit;
};

/**
 * @param options
 * @returns req data
 */
export async function post(options: PostOptions) {
  const controller = new AbortController();
  const endpoint = options.endpoint,
    method = options.method,
    headers = options.headers,
    data = options.data;
  try {
    /** fetch */
    const result = await fetch(endpoint, {
      signal: controller.signal,
      method: method,
      headers: headers,
      body: data,
    });
    /** 500 error handling */
    if (result.status === 504 || result.status === 500)
      throw Error("Unexpected error: could not send email.");

    return await result.json();
  } catch (err: any) {
    if (err.name === "AbortError") {
      return;
    } else {
      return { errors: { server: err.message } };
    }
  }
}
