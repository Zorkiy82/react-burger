import PropTypes from "prop-types";
import { IngredientPropTypes } from "../../utils/constants.js";
import { IngredientCard } from "../ingredient-card/ingredient-card";
import styles from "./card-list.module.css";

function CardList(props) {
  return (
    <ul className={styles.cardList}>
      {props.data.map((item) => (
        <IngredientCard key={item._id} {...item} />
      ))}
    </ul>
  );
}

CardList.propTypes = {
  data: PropTypes.arrayOf(IngredientPropTypes).isRequired,
};

export { CardList };
