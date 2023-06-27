export type ServiceResponse<T> = {
  type: number,
  message: string,
  data: null | T | string
};