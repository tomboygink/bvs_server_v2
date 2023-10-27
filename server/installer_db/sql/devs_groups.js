"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.devs_groups_table = void 0;
exports.devs_groups_table = {
    sql: "\n    DROP TABLE IF EXISTS devs_groups;\n    CREATE TABLE devs_groups\n    (\n        \"id\" BIGSERIAL NOT NULL PRIMARY KEY,\n        \"parent_id\" BIGINT NOT NULL DEFAULT(0),\n        \"g_name\" CHARACTER VARYING(250) NOT NULL DEFAULT(''),\n        \"latitude\" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),\n        \"longitude\" CHARACTER VARYING(60) NOT NULL DEFAULT('0.0'),\n        \"org_id\" BIGINT DEFAULT(0),\n        \"ord_num\" INTEGER NOT NULL DEFAULT(0),\n        \"deleted\" BOOL NOT NULL DEFAULT(FALSE),\n        \"g_info\" TEXT NOT NULL DEFAULT('')\n    );\n    COMMENT ON TABLE devs_groups IS '\u0413\u0440\u0443\u043F\u043F\u044B \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u043F\u043E \u043C\u0435\u0441\u0442\u043E\u043F\u043E\u043B\u043E\u0436\u0435\u043D\u0438\u044E';\n    COMMENT ON COLUMN devs_groups.parent_id IS '\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430';\n    COMMENT ON COLUMN devs_groups.g_name IS '\u041D\u0430\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0438\u0435 \u0433\u0440\u0443\u043F\u043F\u044B (\u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044F \u0432 \u0434\u0435\u0440\u0435\u0432\u0435)';\n    COMMENT ON COLUMN devs_groups.latitude IS '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0448\u0438\u0440\u043E\u0442\u0430';\n    COMMENT ON COLUMN devs_groups.longitude IS '\u0413\u0435\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0434\u043E\u043B\u0433\u043E\u0442\u0430';\n    COMMENT ON COLUMN devs_groups.org_id IS '\u0413\u0440\u0443\u043F\u043F\u0430 \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432 \u0434\u043B\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438';\n    COMMENT ON COLUMN devs_groups.ord_num IS '\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u044F \u0433\u0440\u0443\u043F\u043F';\n    COMMENT ON COLUMN devs_groups.deleted IS '\u0413\u0440\u0443\u043F\u043F\u0430 \u0443\u0434\u0430\u043B\u0435\u043D\u0430';\n    COMMENT ON COLUMN devs_groups.g_info IS '\u0418\u043D\u0444\u043E\u0440\u043C\u0430\u0446\u0438\u044F \u043E \u0433\u0440\u0443\u043F\u043F\u0435';\n    ",
    args: new Array()
};
//# sourceMappingURL=devs_groups.js.map