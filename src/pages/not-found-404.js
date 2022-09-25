import React from "react";
// import styles from "./home.module.css";

export function NotFound404Page() {
  return (
    <>
    {/* <img src='./empty-boxes.svg' width="520" height="190" alt="Main image 520x190."> */}
  <main>
    <h1>404</h1>
    <p>Сервер должен отвечать на входящие HTTP-запросы.
      Например, когда вы вводите URL в адресную строку
      браузера, то отправляете запрос на сервер, чтобы тот
      вернул соответствующую веб-страницу. Если
      страница была перемещена, удалена или её не
      существовало вовсе, сервер вернёт ошибку 404.
    </p>
  </main>
  <p class="footer">Вернуться на <a href="/" >главную страницу</a></p>
    </>

  );
}
