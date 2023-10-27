/**
 * Преобразование объекта типов WSQuery или WSResult в строку перед отправкой посредствам сокетов
 * @param obj
 * @returns
 */
export declare function WSStr(obj: IApiRequest | ApiResponse): string;

////////// Описание типов запроса на сервер

export interface IApiRequest {
  cmd: string;
  args: any;
  sess_code: string;
}

/////// Класс запроса на сервер (WebSocket)

export declare class ApiRequest implements IApiRequest {
  cmd: string;
  args: any;
  sess_code: string;
  constructor(_cmd?: string, _args?: any, _sess_code?: string);
}

////////// Описание типов ответа с сервер

export interface IApiResponse {
  cmd: string;
  error: string;
  data: any[];
  code: string;
}

/////// Класс запроса на сервер (WebSocket)

export declare class ApiResponse implements IApiResponse {
  cmd: string;
  error: string;
  data: any[];
  code: string;
  constructor(_cmd?: string);
}
