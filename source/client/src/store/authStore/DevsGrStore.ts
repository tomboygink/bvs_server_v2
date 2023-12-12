import { AppDispatch } from "../store";
import { DevsGrSlice } from "../reducers/DevsGrSlice";
import DevsGrCreator from "../services/DevsGrCreator";
import { TDGroup, TDevice } from "../../models/IDev";
import { DevsGrSelectedSlice } from "../reducers/DevsGrSelectedSlice";
import { DevsChartSlice } from "../reducers/DevsChartSlice";

export const getDevsGr =
  (users_w: boolean, org_id: string, code: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(DevsGrSlice.actions.getDevsFetching());

    try {
      const response = await DevsGrCreator.get_DevsGroups(
        users_w,
        org_id,
        code
      );
      dispatch(DevsGrSlice.actions.getDevsFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(DevsGrSlice.actions.getDevsFetchingError("Произошла ошибка"));
    }
  };

export const getDevFirstLastSessions =
  (dev_number: string, code: string) => async (dispatch: AppDispatch) => {
    dispatch(DevsChartSlice.actions.getChartFetching());

    try {
      const response = await DevsGrCreator.get_DevFirstLastSessions(
        dev_number,
        code
      );
      dispatch(DevsChartSlice.actions.getChartFetchingSuccess(response.data));
    } catch (e: any) {
      dispatch(
        DevsChartSlice.actions.getChartFetchingError("Произошла ошибка")
      );
    }
  };

export const getSelectetSession =
  (selectedSess: any, forstlastSess: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(
        DevsChartSlice.actions.getSelectedSessFetchingSuccess(selectedSess)
      );
      dispatch(
        DevsChartSlice.actions.getFirsLAstSessFetchingSuccess(forstlastSess)
      );
    } catch (e: any) {
      console.log(e, "e");
    }
  };

export const getDevice = (data: any) => async (dispatch: AppDispatch) => {
  try {
    dispatch(DevsGrSelectedSlice.actions.selectDevice(data));
  } catch (e: any) {
    console.log(e, "e");
  }
};

export const changeTopMenu =
  (item: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(DevsGrSelectedSlice.actions.selectItemTomMenu(item));
    } catch (e: any) {
      console.log(e);
    }
  };
