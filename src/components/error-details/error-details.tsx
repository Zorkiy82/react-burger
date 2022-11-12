import { FC } from "react";

type TErrorDetails = {
  code: number | null,
  url: string,
  message: string
};

const ErrorDetails: FC<TErrorDetails> = ({ code, url, message }) => {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <p className="text text_type_main-large text_color_inactive">{`Ошибка ${code}`}</p>
      <p className="text text_type_main-default text_color_inactive mt-10">{`url: ${url}`}</p>
      <p className="text text_type_main-default text_color_inactive mt-8">{`${message}`}</p>
    </div>
  );
}

export { ErrorDetails };
