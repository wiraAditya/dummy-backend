export function validateEmptyValues<T extends object>(obj: T): boolean {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (obj[key] === null || obj[key] === undefined || obj[key] === "") {
        return false; // Nilai kosong ditemukan
      }
    }
  }
  return true; // Tidak ada nilai kosong
}
