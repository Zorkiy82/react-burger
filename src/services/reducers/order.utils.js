import { msInDay } from "../../utils/constants";

export function getFormattedNumber(num) {
  num = num + "";
  let newNum = "";
  let counter = 0;
  for (let i = num.length - 1; i >= 0; i--) {
    newNum += counter % 3 === 0 ? " " + num[i] : num[i];
    counter += 1;
  }
  return newNum.split("").reverse().join("").trim();
}

function getSecondWord(diffOfDay) {
  let resWord = "";
  if (diffOfDay === 1) {
    resWord = "день";
  }
  if (diffOfDay >= 2 && diffOfDay <= 4) {
    resWord = "дня";
  }
  if ((diffOfDay >= 5 && diffOfDay <= 19) || diffOfDay <= 0) {
    resWord = "дней";
  }
  if (diffOfDay >= 20 && diffOfDay <= 99) {
    resWord = getSecondWord(diffOfDay % 10);
  }
  if (diffOfDay >= 100) {
    resWord = getSecondWord(diffOfDay % 100);
  }

  return resWord;
}

export function getReadableDate(orderDateStr) {
  let resStr = "";
  const od = new Date(orderDateStr);
  const odStr = od.toString();
  const odTime = odStr.match(/ \d\d:\d\d/g);
  const odTimezone = odStr.match(/\w\w\w\+\d\d/g);
  const cd = new Date();
  od.setHours(0, 0, 0, 0);
  cd.setHours(0, 0, 0, 0);
  const diffOfDay = Math.round((cd - od) / msInDay);
  if (diffOfDay === 0) {
    resStr += "Сегодня, ";
  } else if (diffOfDay === 1) {
    resStr += "Вчера, ";
  } else {
    resStr += diffOfDay + " " + getSecondWord(diffOfDay) + " назад";
  }

  resStr +=
    odTime + " i-" + odTimezone[0].slice(0, 4) + Number(odTimezone[0].slice(4));

  return resStr;
}

export function getReceipt(ingredientsArray, ingredientsCatalog) {
  let resObj = {};
  let newArr = [...ingredientsArray].filter(
    (value) => value && ingredientsCatalog[value]
  );

  newArr.forEach((value, index) => {
    if (value) {
    }
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
  return { items: resArr, totalPrice: getFormattedNumber(totalPrice) };
}
// created
export function getOrderStatus(status) {
  switch (status) {
    case "created": {
      return {
        content: "Заказ создан",
        style: {
          color: "#F2F2F3",
        },
      };
    }

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
