import { Request, Response } from "express";
import { validateEmptyValues } from "../utils/validate";
import {
  generateEpochDate,
  generateId,
  generateResponseData,
  getPaginationObject,
} from "../utils/utils";
import { IDummy, IInputDummyData } from "../types/dummy";
import {
  deleteDummy,
  getDataDummy,
  getTotalDataDummy,
  submitDummy,
  updateDummy,
} from "../services/dummyService";

export async function getdummyList(req: Request, res: Response) {
  try {
    const filter = req.query.filter?.toString() ?? "";
    const countData = await getTotalDataDummy({ filter: filter });
    const pagination = getPaginationObject({
      page: parseInt(req.query.page?.toString() ?? "1"),
      pagesize: parseInt(req.query.pageSize?.toString() ?? "10"),
    });
    const data = await getDataDummy({
      filter,
      limit: pagination.pageSize,
      offset: pagination.ofset,
    });

    const responseData = generateResponseData<IDummy[]>(
      data,
      pagination.page,
      pagination.pageSize,
      countData[0].total ?? 0
    );
    res.status(200).json(responseData).end();
    return;
  } catch (err) {
    console.log("error when retrieve data Dummy: ", err);
    res.statusCode = 500;
    res.end();
    return;
  }
}

export async function postdummy(
  req: Request<{}, {}, IInputDummyData>,
  res: Response
) {
  try {
    // validate
    console.log(req.body);
    if (!validateEmptyValues(req.body)) {
      res.status(400).end();
      return;
    }
    const param = [
      generateId("DM", "D"),
      req.body.nama,
      req.body.keterangan,
      generateEpochDate(),
      generateEpochDate(),
      0,
    ];
    await submitDummy(param);
    res.status(204).end();
  } catch (err) {
    console.log("error when submit data: ", err);
    res.statusCode = 500;
    res.end();
  }
}
export async function patchdummy(
  req: Request<{ id: string }, {}, IInputDummyData>,
  res: Response
) {
  const id = req.params.id;

  const updated_at = generateEpochDate();
  try {
    if (!validateEmptyValues(req.body)) {
      res.status(400).end();
      return;
    }
    await updateDummy({
      data: {
        nama: req.body.nama,
        keterangan: req.body.keterangan,
        updated_at: updated_at,
      },
      primary: id,
    });

    res.status(204).end();
  } catch (err) {
    console.log("error update: ", err);
    res.statusCode = 500;
    res.end();
  }
}
export async function removeDummy(
  req: Request<{ kode: string }, {}>,
  res: Response
) {
  const kode = encodeURIComponent(req.params.kode);
  try {
    // get the real id
    await deleteDummy(kode);

    res.status(204).end();
  } catch (err) {
    console.log("error when retrieve data: ", err);
    res.statusCode = 500;
    res.end();
  }
}
