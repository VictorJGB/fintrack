export default interface Income {
  _id: string;
  date: Date;
  source: string;
  amount: number;
  createdAt?: Date;
}

export interface APIResponse {
  page: number;
  pageCount: number;
  firstPage: number;
  lastPage: number;
  itemsPerPage: number;
  data: Income[];
}
