import React from "react";
import styles from "./ingredient-card.module.css";
import { CurrencyIcon, Counter} from "@ya.praktikum/react-developer-burger-ui-components";

class IngredientCard extends React.Component {
  render() {
    return (
      <div className={styles.card}>
        <img src={this.props.image} className={styles.image} />

        <div className={styles.paiceContainer}>
          <p className="text text_type_digits-default">{this.props.price}</p>
          <CurrencyIcon type="primary" />
        </div>

        <p className="text text_type_main-small">{this.props.name}</p>
        <Counter count={1} size="default" />
      </div>
    );
  }
}

export { IngredientCard };

//     _id: "60666c42cc7b410027a1a9b1",
//     name: "Краторная булка N-200i",
//     type: "bun",
//     proteins: 80,
//     fat: 24,
//     carbohydrates: 53,
//     calories: 420,
//     price: 1255,
//     image: "https://code.s3.yandex.net/react/code/bun-02.png",
//     image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
//     image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
//     __v: 0,
