import { RowDataPacket } from "mysql2/promise";

export interface ResultSetHeader {
  fieldCount: number;
  affectedRows: number;
  insertId: string;
  serverStatus: number;
  warningCount: number;
  message: string;
  protocol41: boolean;
  changedRows: number;
}
export interface IPagination {
  pagination: {
    pageSize: number;
    page: number;
    totalPage: number;
    totalData: number;
  };
}
export interface IResponseDataWithPagination<T> {
  data: T;
  meta: IPagination;
}
export interface ICountQuery {
  total: number;
}
