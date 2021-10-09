import { history } from "../../App";
import { quanLyNguoiDungService } from "../../services/QuanLyNguoiDungService";
import {
  GET_TIM_KIEM_NGUOI_DUNG,
  DANG_NHAP_ACTION,
  GET_LIST_NGUOI_DUNG,
  GET_THONG_TIN_NGUOI_DUNG,
  DELETE_NGUOI_DUNG,
} from "./types/QuanLyNguoiDungType";
import swal from "sweetalert";

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.status === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data,
        });

        swal({
          title: "Đăng nhập thành công!",
          icon: "success",
        }).then((value) => {
          history.push("/");
        });

        //chuyển hướng về trang trước khi đăng nhập
        // history.goBack();
      }

      console.log("result", result.data);
    } catch (errors) {
      swal({
        title: `${errors.response?.data}`,
        icon: "error",
      });
    }
  };
};

export const dangKyAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.dangKy(formData);

      swal({
        title: "Đăng ký thành công!",
        icon: "success",
      }).then((value) => {
        history.push("/login");
      });

      console.log(result);
    } catch (errors) {
      if (errors.response.status === 500) {
        swal({
          title: `${errors.response?.data}`,
          icon: "error",
        });
      }
      console.log(errors.response?.data);
    }
  };
};

export const layThongTinNguoiDungAction = (taiKhoan) => {
  console.log(taiKhoan);
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung(
        taiKhoan
      );

      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data,
        });
      }
      console.log("thongTinNguoiDung", result.data);
    } catch (error) {
      console.log("error", error.response.data);
    }
  };
};

export const capNhatThongTinNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      let result = await quanLyNguoiDungService.capNhatThongTinNguoiDung();

      alert("Đăng ký thành công");

      console.log(result);
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const layDanhSachNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      //get list user from API
      const result = await quanLyNguoiDungService.layDanhSachNguoiDung();

      //send result to redux
      dispatch({
        type: GET_LIST_NGUOI_DUNG,
        listUser: result.data,
      });
    } catch (error) {
      console.log("error", error);
    }
  };
};

export const timKiemNguoiDungAction = (keyword) => {
  return (dispatch) => {
    dispatch({
      type: GET_TIM_KIEM_NGUOI_DUNG,
      keyword: keyword,
    });
  };
};

export const xoaNguoiDungAction = (taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.xoaThongTinNguoiDung(
        taiKhoan
      );
      console.log(result);
      alert("Xóa tài khoản thành công");

      dispatch(layDanhSachNguoiDungAction());
    } catch (errors) {
      alert(errors.response?.data);
    }
  };
};
