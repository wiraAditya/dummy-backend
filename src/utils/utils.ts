import { Request } from "express";
import {
  ICountQuery,
  IResponseDataWithPagination,
} from "../types/dataManipulationResponse";
import { queryAndConvertToJson } from "./databasev2";

export function generateId(prefix: string, randPrefix?: string) {
  const epoch = new Date().getTime();
  const rand = Math.floor(Math.random() * 90) + 10;
  return `${prefix}_${randPrefix ?? ""}${rand}_${epoch}`;
}
export function generateEpochDate(inDate?: string) {
  return inDate ? new Date(inDate).getTime() : new Date().getTime();
}
export function generateResponseData<T>(
  data: T,
  page: number,
  pageSize: number,
  totalData: number
): IResponseDataWithPagination<T> {
  const totalPage = Math.ceil(totalData / pageSize);

  return {
    data: data,
    meta: {
      pagination: {
        page: page,
        pageSize: pageSize,
        totalData: totalData,
        totalPage: totalPage == 0 ? 1 : totalPage,
      },
    },
  };
}
export async function paginationObject(
  req: Request,
  query: string,
  param?: any[] | undefined
) {
  const page = parseInt(req.query.page?.toString() ?? "") || 1; // Get the page number from the request query
  const pageSize = parseInt(req.query.pageSize?.toString() ?? "") || 10; // Get the page size from the request query
  const offset = (page - 1) * pageSize;
  const totalData = await queryAndConvertToJson<ICountQuery[]>(query, param);

  return { page, pageSize, offset, totalData: totalData[0].total ?? 0 };
}

export function getPaginationObject(param: { page: number; pagesize: number }) {
  return {
    page: param.page,
    pageSize: param.pagesize,
    ofset: (param.page - 1) * param.pagesize,
  };
}

export function incrementString(originalString: string): string {
  const index = originalString.search(/\d/);

  if (index !== -1) {
    const prefix = originalString.slice(0, index);
    const numberStr = originalString.slice(index);

    let number = parseInt(numberStr, 10) + 1;

    const formattedNumber = number.toString().padStart(numberStr.length, "0");

    return prefix + formattedNumber;
  } else {
    return originalString;
  }
}

export function isValidDateFormat(inputDate: string): boolean {
  // Format tanggal yang diizinkan dalam contoh ini adalah "YYYY-MM-DD"
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  // Mencocokkan inputDate dengan regular expression dateFormatRegex
  if (!dateFormatRegex.test(inputDate)) {
    return false;
  }

  // Memeriksa kevalidan tanggal menggunakan JavaScript Date
  const dateObject = new Date(inputDate);
  const isValidDate = !isNaN(dateObject.getTime());

  return isValidDate;
}
// TODO: change this code later
// export function getPayloadFromJwt(
//   token: string
// ): { id: string; email: string }| JwtPayload {
//   try {
//     const secretKey = "$3mp4KM4mbu";
//     const payload = verify(token, secretKey);
//     return payload;
//   } catch (error) {
//     if (error instanceof TokenExpiredError) {
//       return false;
//     } else {
//       return false;
//     }
//   }
// }
export function formatHumanReadableDate(isoDateString: string): string {
  const date = new Date(isoDateString);

  const day = date.getDate();
  const month = new Intl.DateTimeFormat("id-ID", { month: "long" }).format(
    date
  );
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const timeZone = new Intl.DateTimeFormat("id-ID", { timeZoneName: "short" })
    .format(date)
    .split(" ")
    .pop();

  return `${day} ${month} ${year}, ${hours}:${minutes}:${seconds} ${timeZone}`;
}
