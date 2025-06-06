import { Link } from 'react-router-dom';
import HeartSvg from '../shared/HeartSvg';
import ACSvg from '../shared/ACSvg';
import AutomaticSvg from '../shared/AutomaticSvg';
import KitchenSvg from '../shared/KitchenSvg';
import TVSvg from '../shared/TVSvg';
import BathroomSvg from '../shared/BathroomSvg';
import PetrolSvg from '../shared/PetrolSvg';
import LocationSvg from '../shared/LocationSvg';

const featureIcons = {
  AC: <ACSvg/>,
  Automatic: <AutomaticSvg/>,
  Kitchen: <KitchenSvg/>,
  TV: <TVSvg/>,
  Bathroom: <BathroomSvg/>,
  Petrol: <PetrolSvg/>,
};

const CamperCard = ({ camper }) => {
  const features = [
    camper.AC && 'AC',
    camper.automatic && 'Automatic',
    camper.kitchen && 'Kitchen',
    camper.TV && 'TV',
    camper.bathroom && 'Bathroom',
    camper.petrol && 'Petrol',
  ].filter(Boolean);

  return (
     <div className="flex bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
  {/* Зображення */}
  <img
    src={camper.gallery?.[0]?.original || '/images/placeholder.jpg'}
    alt={camper.name}
    className="w-[290px] h-[230px] object-cover rounded-lg flex-shrink-0 mr-6"
  />

  {/* Контент */}
  <div className="flex flex-col justify-between flex-1 w-1/2 min-w-0">
    {/* Верхня частина */}
    <div>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-bold text-gray-900 truncate">{camper.name}</h3>
        <div className="text-xl font-bold text-gray-900 flex items-center gap-2">
          €{Number(camper.price).toLocaleString('de-DE')}.00
          <HeartSvg />
        </div>
      </div>

      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="text-yellow-400 mr-1">★</span>
        <span className="mr-2">{camper.rating || '4.4'} ({camper.reviews?.length || 2} Reviews)</span>
        <span className="mx-2"><LocationSvg/></span>
        <span className="truncate">{camper.location}</span>
      </div>

      <p className="text-gray-500 text-sm mb-4 line-clamp-2">
        {camper.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {features.map((feature) => (
          <span
            key={feature}
            className="flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
          >
            {featureIcons[feature] && <span className="mr-1">{featureIcons[feature]}</span>}
            {feature}
          </span>
        ))}
      </div>
    </div>

    {/* Кнопка */}
    <Link
      to={`/catalog/${camper.id}`}
      className="self-start text-white bg-button hover:bg-button-hover px-6 py-2 rounded-full font-semibold transition"
    >
      Show more
    </Link>
  </div>
</div>

  )

};

export default CamperCard;