import { ChangeEvent, FormEvent, useEffect } from "react";
import { checkAuth } from "../../utils/utils";
import { useDispatch, useSelector } from "../../services/hooks";
import { Link, Redirect, useHistory, useLocation } from "react-router-dom";
import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { postLoginData } from "../../services/actions/login";
import styles from "./login.module.css";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const isAuthorized = useSelector((state) => state.profile.isAuthorized);
  useEffect(() => {
    checkAuth(isAuthorized);
  });

  const history = useHistory();
  const { pathname, state } = useLocation<{ email: string, password: string, from: string }>();

  function handleOnChange(evt: ChangeEvent<HTMLInputElement>) {
    const key = evt.target.name;
    const value = evt.target.value;

    history.replace({
      pathname: pathname,
      state: {
        ...state,
        [key]: value,
      },
    });
  }

  // TODO Можно сделать универсальный кастомный хук для контроля
  // любого количества инпутов в любых формах:

  // export function useForm(inputValues) {
  //   const [values, setValues] = useState(inputValues);

  //   const handleChange = (event) => {
  //     const {value, name} = event.target;
  //     setValues({...values, [name]: value});
  //   };
  //   return {values, handleChange, setValues};
  // }
  // Этот код помещают в отдельный файл useForm.js в папке hooks и импортируют функцию туда,
  // где нужно контролировать инпуты

  // И Вам не нужно будет теперь вручную создавать функции обработки инпутов и т д.
  // Все будет в одной строчке кода:
  // const {values, handleChange, setValues} = useForm({});

  function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    dispatch(postLoginData(history, pathname));
  }

  if (isAuthorized) {
    return <Redirect to={state?.from || "/"} />;
  }

  return (
    <div className={styles.container}>
      <p className="text text_type_main-medium mb-6">Вход</p>

      <form
        name="registerForm"
        className={styles.form}
        onSubmit={handleSubmit}
        method="POST"
      >
        <EmailInput
          onChange={handleOnChange}
          name={"email"}
          value={state && state.email ? state.email : ""}
          size={"default"}
        />

        <PasswordInput
          onChange={handleOnChange}
          name={"password"}
          value={state && state.password ? state.password : ""}
          size={"default"}
          required
        />

        <Button type="primary" size="medium" htmlType="submit">
          Войти
        </Button>
      </form>

      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?{" "}
        <Link className={styles.link} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?{" "}
        <Link className={styles.link} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  );
}
