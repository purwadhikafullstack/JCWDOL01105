import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import api from '../../config/api';
import PropertyList from './PropertyList';
import FurnishOptions from '../utils/Furnish';
import Image from 'next/image';

const Property = () => {
  const router = useRouter();
  const [newProperty, setNewProperty] = useState();
  const [propertyCreated, setPropertyCreated] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [sell, setSell] = useState(false);
  const [rent, setRent] = useState(false);
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [regularPrice, setRegularPrice] = useState(0);
  const [specialPrice, setSpecialPrice] = useState(0);
  const [furnished, setFurnished] = useState('');

  const [roomType, setRoomType] = useState('');
  const [type, setType] = useState('');
  const [categories, setCategories] = useState('');
  const [available, setAvailable] = useState('');

  useEffect(() => {
    const calculateWeekendPrice = () => {
      const regularPriceValue = parseFloat(regularPrice);

      if (!isNaN(regularPriceValue)) {
        const specialPriceValue = regularPriceValue * 1.2;
        setSpecialPrice(specialPriceValue);
      }
    };

    calculateWeekendPrice();
  }, [regularPrice]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name ||
      !description ||
      !categories ||
      !address ||
      !bedrooms ||
      !bathrooms ||
      !regularPrice ||
      !specialPrice ||
      files.length === 0 ||
      files.length > 6
    ) {
      setErrorMessage('Please fill in all the required fields.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    if (files.length === 0) {
      setErrorMessage('Please upload at least one image.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }

    if (files.length > 6) {
      setErrorMessage('You can only upload up to 6 images.');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      return;
    }
    setErrorMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('address', address);
    formData.append('type', type);
    formData.append('bedrooms', bedrooms);
    formData.append('bathrooms', bathrooms);
    formData.append('regularPrice', regularPrice);
    formData.append('specialPrice', specialPrice);
    formData.append('furnished', furnished);
    formData.append('categories', categories);
    formData.append('available', available);
    formData.append('type_room', roomType);

    files.forEach((file, index) => {
      formData.append('files', file);
    });

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      console.log('Token', token);
      const response = await api.post('/property/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      const responseData = response.data;

      if (responseData.success === false) {
        setErrorMessage(responseData.message);
        return;
      }

      setFiles([]);
      setPropertyCreated(true);
      setNewProperty(responseData.data);

      setTimeout(() => {
        setLoading('');
        router.push(`/tenant-dashboard`);
      }, 3000);
    } catch (error) {
      console.error('Error', error);

      if (error.response) {
        console.log('Error response:', error.response);
      }
    }
  };

  const handleDeleteImage = (index) => {
    const newImages = [...files];
    newImages.splice(index, 1);
    setFiles(newImages);
  };

  const renderImagePreviews = () => {
    const uploadedImages = newProperty ? newProperty.images : [];
    return (
      <>
        {files.map((file, index) => (
          <div key={index} className="flex gap-4 relative">
            <Image
              src={URL.createObjectURL(file)}
              alt={`Selected Image ${index + 1}`}
              className="w-20 h-20 rounded-lg"
              width={200}
              height={200}
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="absolute top-0 right-0 w-5 h-5 bg-color-dark text-white rounded-lg hover:opacity-95"
            >
              x
            </button>
          </div>
        ))}

        {uploadedImages.map((image, index) => (
          <div key={index} className="flex gap-4">
            <Image
              src={`/property/${image}`}
              alt={`Uploaded Image ${index + 1}`}
              className="w-20 h-20 rounded-lg"
            />
          </div>
        ))}
      </>
    );
  };

  const handleFileChange = (e) => {
    setFiles(Array.from(e.target.files));
  };

  const handleChange = (e) => {
    const checkboxId = e.target.id;

    if (checkboxId === 'sell') {
      setType('Property For Sale');
      setSell(true);
      setRent(false);
    } else if (checkboxId === 'rent') {
      setType('Property For Rent');
      setSell(false);
      setRent(true);
    } else if (checkboxId === 'roomTypeRegular') {
      setRoomType('Twin Bed Bedroom');
    } else if (checkboxId === 'roomTypeSuperior') {
      setRoomType('Kingsize Bed Bedroom');
    }
  };

  const handleDateChange = (e) => {
    // Format the date as "YYYY-MM-DD"
    const formattedDate = new Date(e.target.value).toISOString().split('T')[0];
    setAvailable(formattedDate);
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Rent Your Property
      </h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="6"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="Address"
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sell"
                className="w-5"
                onChange={handleChange}
                checked={sell}
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={rent}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="roomTypeRegular"
                value="Twin Bed"
                checked={roomType === 'Twin Bed Bedroom'}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="roomTypeRegular">Twin Bed Bedroom</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                id="roomTypeSuperior"
                value="Kingsize Bed Bedroom"
                checked={roomType === 'Kingsize Bed Bedroom'}
                onChange={handleChange}
                className="w-5"
              />
              <label htmlFor="roomTypeSuperior">Kingsize Bed Bedroom</label>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="7"
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="7"
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
              />
              <p>Bath</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="date"
                placeholder="available"
                className="border p-3 rounded-lg"
                id="available"
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
              />
              <p>(Date Listed)</p>
            </div>
            <div className="flex items-center gap-2">
              <FurnishOptions value={furnished} onChange={setFurnished} />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Categories"
                className="border p-3 rounded-lg"
                id="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="150000"
                max=""
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={regularPrice}
                onChange={(e) => setRegularPrice(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(Rp / Night)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                id="specialPrice"
                min="0"
                max=""
                required
                className="p-3 border border-color-neutral rounded-lg"
                value={specialPrice}
                onChange={(e) => setSpecialPrice(e.target.value)}
              />
              <div className="flex flex-col items-center">
                <p>Weekend`&apos;`s Price</p>
                <p className="text-xs">20% Higher</p>
                <span className="text-xs">(Rp / Night)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold ">
            Images :
            <span className="font-normal text-color-neutral ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>
          <div className=" flex gap-4">
            <input
              onChange={handleFileChange}
              className="p-3 border border-color-neutral rounded w-full"
              type="file"
              id="images"
              accept="image/png, image/jpeg, image/jpg"
              multiple
            />
          </div>

          <div className="flex">
            {files.length > 0 && renderImagePreviews()}
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="p-3 bg-color-pallete1 text-color-primary rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
          >
            {loading ? 'Creating your listing ...' : 'Create Listing'}
          </button>
          {errorMessage && (
            <p className="text-color-red font-semibold text-lg">
              {errorMessage}
            </p>
          )}
        </div>
      </form>
      <PropertyList propertyCreated={propertyCreated} />
    </main>
  );
};

export default Property;
