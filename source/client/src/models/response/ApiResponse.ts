/**
 * Преобразование объекта в строку
 * @param obj преобразуемый объект
 * @returns
 */
function objToString(obj: any) {
  var sstr = "{";

  var first = true;
  for (var k in obj) {
    if (first) {
      first = false;
    } else {
      sstr += ",";
    }

    if (obj[k] === null) {
      sstr += '"' + k + '":null';
    } else if ("object" == typeof obj[k]) {
      sstr += '"' + k + '":' + objToString(obj[k]);
    } else if ("undefined" == typeof obj[k]) {
      //
    } else if ("string" == typeof obj[k]) {
      sstr += '"' + k + '":"' + obj[k].replaceAll('"', '\\"') + '"';
    } else {
      sstr += '"' + k + '":' + obj[k];
    }
  }
  sstr += "}";
  return sstr;
}

/**
 * Преобразование объекта типов IApiRequest или IApiResponse в строку перед отправкой посредствам сокетов
 * @param obj
 * @returns
 */
export function WSStr(obj: IApiRequest | IApiResponse): string {
  return objToString(obj);
}

/**
 * Описание типа запроса на сервер
 */
export interface IApiRequest {
  cmd: string /* команда запроса */;
  args: any /* аргументы запроса { "arg1":"agr1_value", .... } */;
  sess_code: string /* код сессии чтобы проверять пользователя */;
}

/**
 * Класс запроса на сервер
 */
export class ApiRequest implements IApiRequest {
  cmd = "";
  args: any = {};
  sess_code: string = "";
  constructor(_cmd?: string, _args?: any, _sess_code?: string) {
    this.cmd = _cmd || "";
    this.args = _args || {};
    this.sess_code = _sess_code || "";
  }
}

/**
 * Описание типа ответа с сервера
 */
export interface IApiResponse {
  cmd: string /* команда запроса */;
  error: string /* ошибка */;
  data: any[] /* строки из запроса */;
  code: string /* дополнительный код ответа */;
  isLoading: boolean;
  isAuth: boolean;
}

/**
 * Класс ответа с сервера
 */
export class ApiResponse implements IApiResponse {
  cmd: string = ""; /* команда запроса */
  error: string = null; /* ошибка */
  data: any[] = null; /* строки из запроса */
  code: string = ""; /* дополнительный код ответа */
  isLoading: boolean;
  isAuth: boolean;

  constructor(_cmd?: string) {
    this.cmd = _cmd || "";
    this.data = new Array();
    this.code = "";
  }
}
