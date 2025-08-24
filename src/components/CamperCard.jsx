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
    <div className="flex bg-white flex-col md:flex-row border border-lightgray rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Image Section */}
      <div className='w-full md:w-[280px] lg:w-[320px] flex-shrink-0 mb-4 md:mb-0'>
        <img
          src={camper.gallery?.[0]?.original || '/images/placeholder.jpg'}
          alt={camper.name}
          className="h-[200px] sm:h-[240px] md:h-full w-full object-cover rounded-lg"
        />
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-between flex-1 min-w-0 md:pl-4 lg:pl-6">
        {/* Header */}
        <div>
          {/* Title and Price */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 sm:mb-6 gap-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-main truncate pr-2">
              {camper.name}
            </h3>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xl sm:text-2xl font-bold text-main">
                €{Number(camper.price).toLocaleString('de-DE')}.00
              </span>
              <HeartSvg camperId={camper.id}/>
            </div>
          </div>

          {/* Rating and Location */}
          <div className="flex flex-col sm:flex-row sm:items-center text-sm text-main mb-3 sm:mb-4 gap-1 sm:gap-0">
            <div className="flex items-center">
              <span className="text-badge mr-1">
                <StarSvg filled/>
              </span>
              <span className="mr-2">
                {camper.rating || '4.4'} ({camper.reviews?.length || 2} Reviews)
              </span>
            </div>
            <div className="flex items-center sm:ml-4">
              <span className="mr-2">
                <LocationSvg/>
              </span>
              <span className="truncate">{camper.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2 leading-relaxed">
            {camper.description}
          </p>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-6">
            {features.slice(0, 4).map((feature) => (
              <span
                key={feature.key}
                className="flex items-center bg-badges px-3 py-2 rounded-full gap-2 text-sm font-medium text-main"
              >
                {featureIcons[feature.key]}
                <span className="hidden sm:inline">{feature.label}</span>
              </span>
            ))}
            {features.length > 4 && (
              <span className="flex items-center bg-badges px-3 py-2 rounded-full text-sm font-medium text-gray">
                +{features.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-start">
          <Button 
            text="Show more" 
            onClick={handleNavigate}
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default CamperCard;