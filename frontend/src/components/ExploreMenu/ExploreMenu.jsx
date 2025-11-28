import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explora nuestro menú</h1>
      <p className='explore-menu-text'>Elija entre un variado menú con una deliciosa selección de platos elaborados con los mejores ingredientes y la mayor maestría culinaria. Nuestra misión es satisfacer sus antojos y mejorar su experiencia gastronómica, plato a plato.</p>
      <div className="explore-menu-list">
        { menu_list.map((item, index) => {
          return (
            <div onClick={ () => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name) } key={ index } className="explore-menu-list-item">
              <img className={ category === item.menu_name ? "active" : "" } src={ item.menu_image } alt="" />
              <p>{ item.menu_name }</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
}

export default ExploreMenu;
