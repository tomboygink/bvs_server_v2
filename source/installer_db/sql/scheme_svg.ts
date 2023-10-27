import config from '../../config.json'


export const scheme_svg_table = {
    sql: `
    DROP TABLE IF EXISTS scheme_svg;
    CREATE TABLE scheme_svg (
        id                      BIGSERIAL NOT NULL PRIMARY KEY,
        id_devs_groups          BIGINT DEFAULT(0),
        svg                     TEXT DEFAULT(''),
        created_at              TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
    );

    COMMENT ON TABLE scheme_svg IS 'Схемы проектов';
    COMMENT ON COLUMN scheme_svg.id_devs_groups IS 'Идентификатор группы устройства';
    COMMENT ON COLUMN scheme_svg.svg IS 'Описание схемы проектов';
    COMMENT ON COLUMN scheme_svg.created_at IS 'Время создания записи';
    `,
    args: new Array()
};