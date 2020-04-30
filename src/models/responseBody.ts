export interface ResponseBody {
    status: number,
    error: boolean,
    body: object | any
}

export const ResponseBodyBuilder = (status: number, error: boolean, body: any): ResponseBody => {
    const responseBody: ResponseBody = {
      status,
      error,
      body
    };
    return responseBody
  }
