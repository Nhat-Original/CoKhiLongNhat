export type StandardResponse = {
  statusCode: number
  message: string
  data: object | null
}

const standardResponse = (statusCode: number, message: string, data: object | null = null): StandardResponse => {
  return {
    statusCode,
    message,
    data,
  }
}

export default standardResponse
