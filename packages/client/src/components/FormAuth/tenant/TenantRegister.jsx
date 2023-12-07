'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import api from '../../../config/api';
import { useRouter } from 'next/router';

YupPassword(Yup);
const validationRegister = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minNumbers(1, 'Password must have at least 1 number')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
  phone_number: Yup.string()
    .required('Phone number is required')
    .matches(/^\d{11,12}$/, 'Phone number must be 11 or 12 digits'),
  idCard_number: Yup.string().required('ID Card Number is required'),
  id_picture: Yup.mixed().required('ID Card Picture is required'),
});

const FormRegister = ({ showToast }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const formData = [{}];
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone_number: '',
      idCard_number: '',
      id_picture: null,
    },
    validationSchema: validationRegister,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phone_number', values.phone_number);
        formData.append('idCard_number', values.idCard_number);
        formData.append('id_picture', values.id_picture);
        const response = await api.post('/auth/register-tenant', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        showToast('Register Success cek email for verification', 'success');
        setTimeout(() => {
          router.push('/tenant/login');
        }, 3500);
      } catch (error) {
        console.error('Register Failed', error.response.data);
        const { errors } = error.response.data;
        if (errors && errors.length > 0) {
          const errorMessage = errors[0].msg || 'An error occurred';
          showToast(errorMessage);
        } else {
          showToast('An error occurred');
        }
      } finally {
        setLoading(false);
      }
    },
  });

  const googleAuth = () => {
    window.open('http://localhost:8080/api/auth/google', '_self');
  };

  const handleNext = () => {
    // Lakukan pengecekan inputan yang kosong di setiap langkah
    if (currentStep === 1) {
      if (
        !formik.values.name ||
        !formik.values.email ||
        !formik.values.password ||
        !formik.values.phone_number
      ) {
        // Tampilkan pesan atau lakukan tindakan jika ada input yang kosong
        showToast('Harap isi semua field sebelum melanjutkan.');
        return;
      }
    } else if (currentStep === 2) {
      if (!formik.values.idCard_number || !formik.values.id_picture) {
        // Tampilkan pesan atau lakukan tindakan jika ada input yang kosong
        console.log('Harap isi semua field sebelum melanjutkan.');
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md"
        onSubmit={formik.handleSubmit}
        style={{ width: '400px' }} // Contoh ukuran tetap pada form
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Tenant Register
        </h2>
        {currentStep === 1 && (
          <>
            <div>
              <label
                htmlFor="name"
                className="block text-sm  text-color-pallete1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="your name"
                autoComplete="name"
                required
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-500">{formik.errors.name}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm  text-color-pallete1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                autoComplete="email"
                required
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm  text-color-pallete1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
                required
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm text-color-pallete1"
              >
                Phone Number
              </label>
              <input
                id="phone_number"
                name="phone_number"
                type="tel"
                placeholder="0857-12xx-xxxx"
                autoComplete="tel"
                required
                value={formik.values.phone_number}
                onChange={(e) => {
                  const re = /^[0-9\b]+$/; // Regular expression untuk hanya menerima angka
                  if (e.target.value === '' || re.test(e.target.value)) {
                    formik.handleChange(e);
                  }
                }}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.phone_number && formik.errors.phone_number ? (
                <div className="text-red-500">{formik.errors.phone_number}</div>
              ) : null}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full rounded-md bg-color-pallete1 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
              disabled={loading}
            >
              Next
            </button>
          </>
        )}
        {currentStep === 2 && (
          <>
            <div>
              <label
                htmlFor="idCard_number"
                className="block text-sm text-color-pallete1"
              >
                ID Card Number
              </label>
              <input
                id="idCard_number"
                name="idCard_number"
                type="text"
                placeholder="xxxx-xxxx-xxxx-xxxx"
                autoComplete="number"
                required
                value={formik.values.idCard_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full rounded-md border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              {formik.touched.idCard_number && formik.errors.idCard_number ? (
                <div className="text-red-500">
                  {formik.errors.idCard_number}
                </div>
              ) : null}
            </div>
            <div className="flex items-center justify-center w-full"></div>
            <input
              id="dropzone-file"
              name="id_picture"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                formik.setFieldValue(
                  'id_picture',
                  event.currentTarget.files[0],
                );
                if (event.currentTarget.files && event.currentTarget.files[0]) {
                  let reader = new FileReader();
                  reader.onload = (e) => {
                    document
                      .getElementById('preview-image')
                      .setAttribute('src', e.target.result);
                  };
                  reader.readAsDataURL(event.currentTarget.files[0]);
                }
              }}
              onBlur={formik.handleBlur}
            />

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <h3 className="block text-sm text-color-pallete1">
                  ID Card Picture
                </h3>
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <img
                    id="preview-image"
                    src="#"
                    alt="Preview"
                    className="mb-4 w-52 h-32 object-cover rounded-lg border" // Atur ukuran gambar sesuai yang diinginkan
                    style={{ maxHeight: '200px', maxWidth: '200px' }} // Sesuaikan ukuran gambar yang diinginkan di sini
                  />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG, or GIF (MAX. 800x400px)
                  </p>
                </div>
              </label>
            </div>
            <div>
              <button
                type="button"
                onClick={handlePrev}
                className="mt-2 w-full rounded-md bg-color-pallete1 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
              >
                Previous
              </button>
              <button
                type="submit"
                className="mt-2 w-full rounded-md bg-color-pallete3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none"
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Register'}
              </button>
            </div>
          </>
        )}
        <div className="flex justify-center items-center mt-6 text-sm">
          <span className="ml-2">
            Already have an account?
            <span
              onClick={() => router.push('/tenant/login')}
              className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete1"
            >
              Login here
            </span>
          </span>
        </div>
      </form>
    </div>
  );
};

export default FormRegister;
