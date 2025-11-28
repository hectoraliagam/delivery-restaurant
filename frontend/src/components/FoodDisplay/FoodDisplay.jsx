import './FoodDisplay.css';
import { useContext } from 'react';
import FoodItem from '../FoodItem/FoodItem';
import StoreContext from '../../context/StoreContext';

const FoodDisplay = ({ category }) => {

    const { foodList } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Los mejores platillos cerca de ti</h2>
      <div className="food-display-list">
        { foodList.map((item, index) => {
          if (category === "All" || category === item.category) {
            return <FoodItem key={ index } id={ item._id } name={ item.name } description={ item.description } price={ item.price } image={ item.image } />
          }
        })}
      </div>
    </div>
  );
}

export default FoodDisplay;
