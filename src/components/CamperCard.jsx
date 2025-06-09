import { Link, useNavigate } from 'react-router-dom';
import HeartSvg from '../shared/HeartSvg';
import ACSvg from '../shared/ACSvg';
import AutomaticSvg from '../shared/AutomaticSvg';
import KitchenSvg from '../shared/KitchenSvg';
import TVSvg from '../shared/TVSvg';
import BathroomSvg from '../shared/BathroomSvg';
import PetrolSvg from '../shared/PetrolSvg';
import LocationSvg from '../shared/LocationSvg';
import StarSvg from '../shared/StarSvg';
import Button from '../shared/Button';

const featureIcons = {
  AC: <ACSvg/>,
  automatic: <AutomaticSvg/>,
  kitchen: <KitchenSvg/>,
  TV: <TVSvg/>,
  bathroom: <BathroomSvg/>,
  petrol: <PetrolSvg/>,
};

const CamperCard = ({ camper }) => {
const navigate = useNavigate();

  const features = [
    camper.AC && { key: 'AC', label: 'AC' },
    camper.automatic && { key: 'automatic', label: 'Automatic' },
    camper.kitchen && { key: 'kitchen', label: 'Kitchen' },
    camper.TV && { key: 'TV', label: 'TV' },
    camper.bathroom && { key: 'bathroom', label: 'Bathroom' },
    camper.petrol && { key: 'petrol', label: 'Petrol' },
  ].filter(Boolean);

  const handleNavigate = () => {
    navigate(`/catalog/${camper.id}`);
  };

  return (
  <div className="flex bg-white flex-col lg:flex-row border border-lightgray rounded-2xl p-4 lg:p-6 shadow-sm">
  {/* Зображення */}
      <div className='w-full lg:w-[290px] flex-shrink-0'>
        <img
        src={camper.gallery?.[0]?.original || '/images/placeholder.jpg'}
        alt={camper.name}
        className="h-[200px] lg:h-full object-cover rounded-lg"
      />
      </div>

  {/* Контент */}
  <div className="flex flex-col justify-between flex-1 min-w-0 pl-4">
    {/* Верхня частина */}
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-2">
        <h3 className="text-xl font-semibold lg:text-2xl truncate">{camper.name}</h3>
        <div className=" text-xl lg:text-2xl font-bold text-main flex items-center gap-2">
          €{Number(camper.price).toLocaleString('de-DE')}.00
          <HeartSvg camperId={camper.id}/>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-main mb-2">
        <span className="text-badge mr-1"><StarSvg filled/></span>
        <span className="mr-2">{camper.rating || '4.4'} ({camper.reviews?.length || 2} Reviews)</span>
        <span className="mx-2"><LocationSvg/></span>
        <span className="truncate">{camper.location}</span>
      </div>

      <p className="text-gray text-sm mb-4 line-clamp-2">
        {camper.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {features.slice(0, 4).map((feature) => (
          <span
            key={feature}
            className="flex items-center bg-badges px-3 py-2 rounded-full gap-2"
          >
           
           {featureIcons[feature.key]}
           {feature.label}
          </span>
        ))}
      </div>
    </div>

    {/* Кнопка */}
    {/* <Link
      to={`/catalog/${camper.id}`}
      className="bg-button w-[166px] text-white  font-medium px-[60px] py-[16px] rounded-[200px] hover:bg-button-hover transition"
      
    >
      Show more
    </Link> */}
    <div> <Button text="Show more" onClick={handleNavigate}/></div>
  </div>
</div>

  )

};

export default CamperCard;