import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const CamperDetailsPage = () => {
  const { id } = useParams();
  const [camper, setCamper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCamper = async () => {
      try {
        const res = await axios.get(`https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`);
        setCamper(res.data);
      } catch (err) {
        console.error('Error fetching camper:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCamper();
  }, [id]);

  if (loading) return <div className="text-center py-12 text-gray-500">Loading...</div>;
  if (!camper) return <div className="text-center py-12 text-red-500">Camper not found.</div>;

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-[32px] font-bold text-gray-900 mb-6">{camper.name}</h1>

      {/* Галерея */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <img src={camper.gallery?.[0]?.original} alt={camper.name} className="rounded-[8px] w-full h-[200px] object-cover" />
       
      </div>

      {/* Характеристики */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            {[
              'transmission',
              'engine',
              'AC',
              'bathroom',
              'kitchen',
              'TV',
              'radio',
              'refrigerator',
              'microwave',
              'gas',
              'water',
            ]
              .filter(key => camper.details?.[key] || camper[key])
              .map(key => (
                <li key={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</li>
              ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Specifications</h2>
          <ul className="text-gray-600 space-y-1">
            {['form', 'length', 'width', 'height', 'tank', 'consumption'].map(key => (
              <li key={key}>
                <strong className="capitalize">{key}:</strong> {camper.details?.[key] || '—'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Відгуки */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
        {camper.reviews?.length > 0 ? (
          <div className="space-y-4">
            {camper.reviews.map((rev, idx) => (
              <div key={idx} className="p-4 bg-gray-100 rounded">
                <p className="text-gray-700">{rev.comment}</p>
                <p className="text-sm text-yellow-500">Rating: {'⭐'.repeat(rev.rating)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Форма бронювання */}
      <div className="bg-gray-50 p-6 rounded-md shadow-md max-w-[600px]">
        <h2 className="text-xl font-semibold mb-4">Book this camper</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            alert('Booking successful!');
          }}
          className="space-y-4"
        >
          <input type="text" placeholder="Full Name" required className="w-full p-2 border rounded" />
          <input type="email" placeholder="Email" required className="w-full p-2 border rounded" />
          <input type="date" required className="w-full p-2 border rounded" />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CamperDetailsPage;
