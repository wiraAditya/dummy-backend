export interface IDummy {
  kode: string;
  nama: string;
  keterangan: string;
}
// this to exclude the code from idummy
export interface IInputDummyData extends Omit<IDummy, "kode"> {}
export interface IPostDummyData extends Omit<IDummy, "kode"> {
  uniqId: string; // Change from 'kode' to 'uniqId'
  created_at: number;
  updated_at: number;
  is_removed: number;
}
