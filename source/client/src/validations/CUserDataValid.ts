import * as yup from "yup";

const phoneRegex = RegExp(/^((\+7|7|8)+([0-9]){10})$/);

export const userDataSchema = yup.object({
  surname: yup
    .string()
    .required("поле 'Фамилия' не может быть пустым значением"),
  name: yup.string().required("поле 'Имя' не может быть пустым значением"),
  patronymic: yup.string(),
  email: yup.string().email("некоректная почта").required(""),
  phone: yup.string().matches(phoneRegex, "некоректный формат").required(""),
  info: yup.string()
});
