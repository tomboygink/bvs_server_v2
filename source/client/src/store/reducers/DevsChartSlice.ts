import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IApiResponse } from "../../models/response/ApiResponse";

const initialState: any = {
  cmd: "" /* команда запроса */,
  error: "" /* ошибка */,
  data: [] /* строки из запроса */,
  code: "" /* дополнительный код ответа */,
  isLoading: false,
  isAuth: false,
  firstLastSess: [],
  firstSess: [],
  lastSess: [],
  selectedSess: []
};

export const DevsChartSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    getChartFetching(state) {
      state.isLoading = true;
    },
    getChartFetchingSuccess(state, action: PayloadAction<IApiResponse>) {
      let start_sess = JSON.parse(action.payload.data[1].sess_data);
      let end_sess = JSON.parse(action.payload.data[0].sess_data);

      let obj_first: any = {
        depth: "",
        data: ""
      };

      let obj_second: any = {
        depth: "",
        data1: ""
      };

      var obj_defolt: any = {
        depth: 0,
        data2: ""
      };

      var first = new Array();
      var second = new Array();
      var defolt = new Array();

      const mergeByProperty = (arrays: any[], property = "depth") => {
        const arr = arrays.flatMap(item => item); //делаем из всех массивов - один

        const obj = arr.reduce((acc, item) => {
          return {
            // делаем из массива - объект, чтобы повторения перезаписывались
            ...acc,
            [item[property]]: { ...acc[item[property]], ...item }
          };
        }, {});

        return Object.values(obj); //обратно преобразуем из объекта в массив
      };

      for (var i in start_sess.s.sort(
        (a: { depth: number }, b: { depth: number }) => b.depth - a.depth
      )) {
        obj_first = {
          data_f: start_sess.s[i].data,
          depth: start_sess.s[i].depth
        };
        first.push(obj_first);
      }
      for (var j in end_sess.s.sort(
        (a: { depth: number }, b: { depth: number }) => b.depth - a.depth
      )) {
        obj_second = {
          data_s: end_sess.s[j].data,
          depth: end_sess.s[j].depth
        };
        second.push(obj_second);
      }
      defolt.push(obj_defolt);

      const result = mergeByProperty([first, second]);
      const data_charts = mergeByProperty([first, second, defolt]);

      state.lastSess = second.sort(
        (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
      );

      state.firstSess = result.sort(
        (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
      );

      state.firstLastSess = data_charts.sort(
        (a: { depth: number }, b: { depth: number }) => a.depth - b.depth
      );
    },
    getSelectedSessFetchingSuccess(state, action: PayloadAction<any>) {
      state.selectedSess = action.payload;
    },
    getFirsLAstSessFetchingSuccess(state, action: PayloadAction<any>) {
      state.firstLastSess = action.payload;
    },
    getChartFetchingError(state, action: PayloadAction<string>) {
      state.isLoading = false;
      state.error = action.payload;
    }
  }
});

export default DevsChartSlice.reducer;
