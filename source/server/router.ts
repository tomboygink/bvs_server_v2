import crypto from 'crypto'
import config from '../config.json'
import { UserTable } from '../xcore/dbase/Users';
import { SessionsTable } from '../xcore/dbase/Sessions';


var res: any = {
    cmd: '',
    error: '',
    data: [],
    code: '',
};

export async function router(body: any) {




    var sess_code = null;
    var data = null;
    switch (body.cmd) {
        //------------------------------------------------------------------------АВТОРИЗАЦИЯ
        // Авторизация по логину и паролю 
        case 'get_UserByAuth': {
            var ut = new UserTable(body.args, body.sess_code);
            var st = new SessionsTable(body.args);
            // Авторизация по логину и паролю
            sess_code = await st.insertSess();
            //Генерация кода сессии, запись в бд
            data = await ut.selectUser();



            if (sess_code === '' && data[0] === undefined) {
                res.cmd = body.cmd;
                res.code = null;
                res.data = null;
                res.error = "Пользователя не существует или введены не верные данные;";
            }
            else {
                res.cmd = body.cmd;
                res.code = sess_code;
                res.error = null;
                res.data = data;
            }




        } break;
        //Авторизация по коду сессии
        case 'get_UserBySessionCode': {
            var st = new SessionsTable(body.args);
            var ut = new UserTable(body.args, body.sess_code);
            var code = await st.selectSessCode();
            data = await ut.selectUserBySessCode();

            if (code[0] == undefined) {
                res.cmd = body.cmd;
                res.code = null;
                res.data = null;
                res.error = "Данного кода сессии не существует";
            }
            else {

                res.cmd = body.cmd;
                res.code = code[0].sess_code;
                res.error = null;
                res.data = data;
            }
        } break;
    }
    return JSON.stringify(res)
}
