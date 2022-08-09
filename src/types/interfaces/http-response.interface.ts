export interface InfoPagination {
  /** The length of the response */
  count: number
  /** The amount of pages */
  pages: number
  /** Link to the next page (if it exists) */
  next: string 
  /** Link to the previous page (if it exists) */
  prev: string 
}

export interface HTTPResponse<T> {
  /**
   * The API will automatically paginate the responses. You will receive up to `20` documents per page.
   */
  info?: InfoPagination
  results?: T
}