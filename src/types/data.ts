import { RowDataPacket } from "mysql2/promise";

interface IDefaultData {
  created_at: string;
  updated_at?: string;
}
export interface IGudang extends IDefaultData {
  id: string;
  nama: string;
  id_kategori: string;
}

export interface IProduk extends IDefaultData {
  hpp: number;
  harga_garmen: number;
  id: string;
  kode: string;
  barcode: string;
  harga: number;
  jumlah: number;
  nama: string;
  kode_toko: string;
  stockEdit: boolean;
}
export interface ITransaksi extends IDefaultData {
  id: string;
  id_transfer?: number;
  jumlah: number;
  keterangan: string;
  tanggal: string;
  namaPegawai: string;
  produk: string;
  barcode: string;
  idProduk: string;
}
export interface IPegawaiGudang extends IDefaultData {
  id: string;
  nama: string;
  fee: number;
  id_gudang: number;
}
export interface IKategoryGudang extends IDefaultData {
  id: string;
  kategori: string;
}

export interface IToko extends IDefaultData {
  id: string;
  nama: string;
}
export interface ITransfer extends IDefaultData {
  id: string;
  gudang_dari: string;
  barcode: string;
  gudang_tujuan: string;
  toko_dari: string;
  toko_tujuan: string;
  jumlah: number;
  id_pegawai?: string;
  nama_pegawai?: string;
  kode_toko?: String;
  fee: number;
  id_batch: string;
  nama_produk: number;
  harga: number;
  harga_garmen: number;
  hpp: number;
  gudang_dari_id?: string;
  gudang_dari_nama?: string;
  gudang_tujuan_id?: string;
  gudang_tujuan_nama?: string;
  toko_dari_id?: string;
  toko_dari_nama?: string;
  toko_tujuan_id?: string;
  toko_tujuan_nama?: string;
  checker1?: string;
  checker2?: string;
  checker3?: string;
  checker4?: string;
}
export interface IDataPacketTransfer extends RowDataPacket, ITransfer {}
export interface ITransferResponse {
  id: string;
  barcode: string;
  gudang_dari_ref: Partial<IGudang>[];
  gudang_tujuan_ref: Partial<IGudang>[];
  toko_dari_ref: Partial<IToko>[];
  toko_tujuan_ref: Partial<IToko>[];
  jumlah: number;
  id_pegawai?: string;
  nama_pegawai?: string;
  fee: number;
  id_batch: string;
  nama_produk: number;
  isNewTransfer: boolean;
  tanggal: string;
  kode_toko?: String;
  harga: number;
  hpp: number;

  harga_garmen: number;
}
export interface IBatch extends RowDataPacket {
  id: string;
  batch: string;
  nama: string;
  harga: number;
  jumlah: number;
  barcode: string;
  idProduk: string;
  kode_toko: string;
}
export interface IProdukGudang extends IDefaultData, RowDataPacket {
  id_batch: string;
  produk: string;
  id_gudang: string;
  batch: string;
  jumlah: number;
}
export interface IProdukToko extends IDefaultData, RowDataPacket {
  id_batch: string;
  id_toko: string;
  produk: string;
  batch: string;
  jumlah: number;
}
export interface IPembayaranCombo {
  id: string;
  fee: number;
  jumlah_transfer: number;
  harga: number;
  jumlah_sudah_bayar: number;
  kekurangan_bayar: number;
  gudang_dari: string;
  gudang_tujuan: string;
  produk: string;
  kat_tujuan: string;
  pegawai: string;
}
export interface ILaporanStokToko {
  toko: string;
  id_toko: string;
  stokRef: ILaporanTokoStokRef[];
}
export interface ILaporanTokoStokRef {
  produk: string;
  qty: number;
}
export interface ILaporanStokGudang {
  gudang: string;
  id_gudang: string;
  stokRef: ILaporanGudangStokRef[];
}
export interface ILaporanGudangStokRef {
  produk: string;
  qty: number;
  petugas: string;
}
export interface ILaporanPendapatanPetugas {
  nama: string;
  pendapatan: number;
  terbayar: number;
  gudang: string;
}

export interface ILaporanPembayaran {
  id: string;
  keterangan: string;
  jumlah: number;
  gudang_dari: string;
  gudang_tujuan: string;
  toko_dari: string;
  toko_tujuan: string;
}

export interface ILaporanPendapatanPetugasV2 {
  nama: string;
  fee?: number;
  harga?: number;
  jumlah?: number;
  totalPendapatan: number;
  detail: ILaporanPendapatanPetugasDetail[];
  barcode: string;
  produk: string;
}
export interface ILaporanPendapatanPetugasDetail {
  produk: string;
  keterangan: string;
  jumlah: number;
  tanggal: number;
}
export interface IGroupLaporanPendapatan {
  nama: string;

  totalTerbayar: number;
  totalPendapatan: number;
  produk: {
    fee?: number;
    harga?: number;
    jumlah?: number;
    namaProduk: string;
    barcode: string;
    pendapatan: number;
    total?: number;
    detail: ILaporanPendapatanPetugasDetail[];
  }[];
}
export interface IFormTransfer {
  fee: number;
  gudang_dari: string;

  gudang_tujuan: string;
  harga: number;

  id_batch: string;
  id_pegawai: string;
  jumlah: number;
  toko_dari: string;
  toko_tujuan: string;
}
export interface IGudangKain extends IDefaultData {
  id: string;
  kode: string;
  nama_gudang: string;
}

export interface IKain extends IDefaultData {
  id: string;
  kode: string;
  nama: string;
  kode_kategori: string;
  barcode: string;
  kategori: string;
  jumlah: number;
  stock_edit: boolean;
}
``;

export interface ITransferKainHeader {
  kode: string;
  tanggal: string;
}
export interface ITransferKain {
  kode: string;
  jumlah: number;
  id_kain?: number;
  nama_kain: string;
  kategori: string;
  barcode: string;
  gudang_dari_nama: string;
  dari: string;
  gudang_tujuan_nama: string;
  tujuan: string;
  kode_kain: string;
  keterangan: string;
  isNewTransfer: boolean;
  id_dari?: number;
  id_tujuan?: number;
  date: string;
}
export interface IPostTransferKain {
  jumlah: number;
  keterangan: number;
  id_kain: string;
  dari: string;
  tujuan: string;
}
export interface IStokKain {
  stok: string;
  barcode: string;
  nama: string;
  kategori: string;
  gudang: string;
}
export interface IKategoriKain extends IDefaultData {
  id: string;
  kategori: string;
}
