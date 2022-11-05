import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor";
import styles from "./home.module.css";

export function HomePage() {
  const { itemsRequest, itemsFailed } = useSelector(
    (state: any) => state.ingredients
  );
  return (
    <>
      {!itemsRequest && !itemsFailed && (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />

            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </>
  );
}
