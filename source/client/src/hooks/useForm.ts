import { SelectChangeEvent } from "@mui/material";
import { useState, useCallback, ChangeEvent } from "react";
export function useForm(className: string) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValidInput, setIsValidInput] = useState({});
  const [isValid, setIsValid] = useState(false);
  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    const form = target.closest(`.${className}`) as HTMLFormElement;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      setValues({ ...values, [name]: target.checked });
    } else {
      setValues({ ...values, [name]: value });
    }

    setErrors({ ...errors, [name]: target.validationMessage });
    if (form) {
      setIsValid(form.checkValidity());
    }

    target.validationMessage
      ? setIsValidInput({ ...isValidInput, [name]: true })
      : setIsValidInput({ ...isValidInput, [name]: false });
  };

  const handleSelectChange = (event: SelectChangeEvent<HTMLSelectElement>) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
  };

  const resetForm = useCallback(
    (
      newValues = {},
      newErrors = {},
      newIsValidInput = {},
      newIsValid = false
    ) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValidInput(newIsValidInput);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValidInput, setIsValid]
  );

  return {
    values,
    handleChange,
    handleSelectChange,
    errors,
    isValidInput,
    isValid,
    resetForm,
  };
}
