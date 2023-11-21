import * as yup from "yup";

export const changePassSchema = yup.object({
  pass: yup.string().min(5).max(14).required("Поле Старый пароль"),
  new_pass: yup.string().min(5).max(14).required("Поле Новый пароль"),
  repeat_pass: yup
    .string()
    .min(5)
    .max(14)
    .required("Поле Повторите старый пароль")
});
