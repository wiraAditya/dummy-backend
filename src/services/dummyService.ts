import { IDummy, IPostDummyData } from "../types/dummy";
import { queryAndConvertToJson } from "../utils/databasev2";

export async function getDataDummy(param: {
  limit: number;
  offset: number;
  filter: string;
}) {
  return queryAndConvertToJson<IDummy[]>(
    `select uniqId as kode, nama, keterangan from dummy
          where is_removed = 0 
          AND (nama LIKE CONCAT('%', ? , '%') OR keterangan LIKE CONCAT('%', ? , '%') )
          order by created_at desc 
          LIMIT ? OFFSET ?`,
    [param.filter, param.filter, param.limit, param.offset]
  );
}
export async function getDataDummyById(id: number) {
  return queryAndConvertToJson<IDummy>(
    `select uniqId as kode, nama, keterangan from dummy
            where id = ?`,
    [id]
  );
}
export async function getTotalDataDummy(param: { filter: string }) {
  return queryAndConvertToJson<{ total: number }[]>(
    `select count(id) as total from dummy
          where is_removed = 0 
          AND (nama LIKE CONCAT('%', ? , '%') OR keterangan LIKE CONCAT('%', ? , '%') )`,
    [param.filter, param.filter]
  );
}

export async function submitDummy(data: (string | number)[]) {
  return queryAndConvertToJson(
    `INSERT INTO dummy (uniqId, nama, keterangan, created_at, updated_at, is_removed) VALUES (?,?,?,?,?,?)`,
    data
  );
}

export async function updateDummy(param: {
  data: Partial<IPostDummyData>;
  primary: number | string;
}) {
  return queryAndConvertToJson(`update dummy set ? where uniqId  = ?`, [
    param.data,
    param.primary,
  ]);
}
export async function deleteDummy(primary: number | string) {
  return queryAndConvertToJson(`DELETE FROM dummy where uniqId  = ?`, [
    primary,
  ]);
}
