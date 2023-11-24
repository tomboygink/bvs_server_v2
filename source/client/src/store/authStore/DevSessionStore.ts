import { AppDispatch } from "../store";
import { DevsGrSlice } from "../reducers/DevsGrSlice";
import { DevSessionSlice } from "../reducers/DevSession";
import DevsGrCreator from "../services/DevsGrCreator";

export const setDevSess =
  (
    dev_number: string,
    period_start: string,
    period_end: string,
    code: string
  ) =>
  async (dispatch: AppDispatch) => {
    dispatch(DevSessionSlice.actions.getDevsSessFetching);

    try {
      const response = await DevsGrCreator.get_DevSessions(
        dev_number,
        period_start,
        period_end,
        code
      );
      console.log(response, "response");
      dispatch(
        DevSessionSlice.actions.getDevsSessFetchingSuccess(response.data)
      );
    } catch (e: any) {
      dispatch(
        DevSessionSlice.actions.getDevsSessFetchingError("Произошла ошибка")
      );
    }
  };
