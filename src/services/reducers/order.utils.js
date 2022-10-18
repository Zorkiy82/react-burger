export function getReceipt(ingredientsArray, ingredientsCatalog) {
  let resObj = {};
  let newArr = [...ingredientsArray];
  newArr.forEach((value, index) => {
    if (!resObj[value]) {
      resObj[value] = {
        _id: ingredientsCatalog[value]._id,
        name: ingredientsCatalog[value].name,
        price: ingredientsCatalog[value].price,
        type: ingredientsCatalog[value].type,
        image_mobile: ingredientsCatalog[value].image_mobile,
        counter: 1,
      };
    } else {
      resObj = {
        ...resObj,
        [value]: {
          ...resObj[value],
          counter: resObj[value].counter + 1,
        },
      };
    }
  });

  const resArr = [];
  let totalPrice = 0;
  for (let key in resObj) {
    if (resObj[key].type === "bun" && resObj[key].counter === 1) {
      resObj[key] = {
        ...resObj[key],
        counter: 2,
      };
    }
    totalPrice = totalPrice + resObj[key].price * resObj[key].counter;
    resArr.push(resObj[key]);
  }

  resArr.sort((a, b) => b.counter - a.counter);
  return { items: resArr, totalPrice: totalPrice };
}

export function getOrderStatus(status) {
  switch (status) {
    case "pending": {
      return {
        content: "Готовится",
        style: {
          color: "#F2F2F3",
        },
      };
    }
    case "done": {
      return {
        content: "Выполнен",
        style: {
          color: "#00CCCC",
        },
      };
    }

    default: {
      return {
        content: "Отменен",
        style: {
          color: "#ff0000",
        },
      };
    }
  }
}
