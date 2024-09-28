import { Router, Request, Response } from "express";
import {
  getdummyList,
  patchdummy,
  postdummy,
  removeDummy,
} from "../controllers/dummyController";
const DummyRouter = Router();

// example using middleware to authenticate the token
// no need to use cos this just dummy
// DummyRouter.get("/", authenticateToken, (req: Request, res: Response) => {
//   getdummyList(req, res);
// });
DummyRouter.get("/", (req: Request, res: Response) => {
  getdummyList(req, res);
});
DummyRouter.post("/", (req: Request, res: Response) => {
  postdummy(req, res);
});
DummyRouter.patch("/:id", (req: Request<{ id: string }>, res: Response) => {
  patchdummy(req, res);
});
DummyRouter.delete(
  "/:kode",
  (req: Request<{ kode: string }>, res: Response) => {
    removeDummy(req, res);
  }
);

export default DummyRouter;
