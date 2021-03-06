import { GROUPID } from "../util/settings/config";
import { baseService } from "./baseService";

export class QuanLyRapService extends baseService {
  // constructor() {
  //   super();
  // }

  layDanhSachHeThongRap = () => {
    return this.get(
      `/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUPID}`
    );
  };

  layThongTinCumRap = (heThongRap) => {
    return this.get(
      `/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${heThongRap}`
    );
  };

  layThongTinLichChieu = (maPhim) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${maPhim}`);
  };
}

export const quanLyRapService = new QuanLyRapService();
