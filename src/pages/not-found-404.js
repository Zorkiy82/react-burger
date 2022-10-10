import React from "react";
import { Link } from "react-router-dom";
import styles from "./not-found-404.module.css";

export function NotFound404Page() {
  return (
    <main className={styles.main}>
      <div className={styles.img}></div>
      <p className="text text_type_digits-large mt-10 mb-10">404</p>
      <p className={`text text_type_main-medium ${styles.mesage}`}>
        Сервер должен отвечать на входящие HTTP-запросы. Например, когда вы
        вводите URL в адресную строку браузера, то отправляете запрос на сервер,
        чтобы тот вернул соответствующую веб-страницу. Если страница была
        перемещена, удалена или её не существовало вовсе, сервер вернёт ошибку
        404.
      </p>
      <p className="text text_type_main-medium mt-20">
        Вернуться на{" "}
        <Link className={styles.link} to="/">
          главную страницу
        </Link>
      </p>
    </main>
  );
}
