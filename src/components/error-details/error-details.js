import PropTypes from "prop-types";

function ErrorDetails({ code, url, mesage }) {
  return (
    <div className="pt-10 pr-10 pb-10 pl-10">
      <p className="text text_type_main-large text_color_inactive">{`Ошибка ${code}`}</p>
      <p className="text text_type_main-default text_color_inactive mt-10">{`url: ${url}`}</p>
      <p className="text text_type_main-default text_color_inactive mt-8">{`${mesage}`}</p>
    </div>
  );
}

ErrorDetails.propTypes = {
  code: PropTypes.number.isRequired,
  url: PropTypes.string,
  mesage: PropTypes.string,
};

export { ErrorDetails };
