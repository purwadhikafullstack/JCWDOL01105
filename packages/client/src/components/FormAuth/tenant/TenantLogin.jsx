'use client';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import api from '../../../config/api';
import { toast } from 'react-toastify';

YupPassword(Yup);
const validationLogin = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .minUppercase(1, 'Password must have at least 1 uppercase')
    .minLowercase(1, 'Password must have at least 1 lowercase')
    .minNumbers(1, 'Password must have at least 1 number')
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const FormLogin = ({ showToast }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationLogin,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response = await api.post('/auth/login-tenant', {
          email: values.email,
          password: values.password,
        });

        // Jika login berhasil
        if (
          response &&
          response.status === 200 &&
          response.data.status === 'success'
        ) {
          // Simpan token dan role ke dalam localStorage
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('role', response.data.data.role);

          showToast('Login Success', 'success');
          setTimeout(() => {
            router.push('/tenant-dashboard');
          }, 3500);
        } else {
          console.error(
            'Login Failed',
            response.data.message || 'Unknown error',
          );
          showToast(
            `Login Fail: ${response.message || 'Unknown error'}`,
            'error',
          );
        }
      } catch (error) {
        console.error('Login Failed', error.response.data.message);
        showToast(`Login Failed: ${error.response.data.message}`, 'error');
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="bg-white shadow-md mb-20 px-8 py-6 rounded-xl space-y-4 max-w-md bg-opacity-90 backdrop-blur-md"
        onSubmit={formik.handleSubmit}
        style={{ width: '400px' }} // Contoh ukuran tetap pada form
      >
        <h2 className="text-2xl font-bold text-gray-900 text-center">
          Tenant Login
        </h2>
        <div>
          <label htmlFor="email" className="block text-sm  text-color-pallete1">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="text"
            placeholder="email"
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
        <div className="text-sm text-color-primary mt-2">
          <span
            onClick={() => router.push('/tenant/forgot')}
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
          >
            Forgot Password?
          </span>
        </div>
        <div>
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 focus:outline-none bg-color-pallete1"
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
          <div className="flex justify-center items-center mt-6 text-sm text-color-pallete1">
            <span className="ml-2">
              Not a member?
              <span
                onClick={() => router.push('/tenant/register')}
                className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete1"
              >
                Register here
              </span>
            </span>
          </div>
          <div className="flex justify-center items-center mt-6 text-sm text-color-black">
            <span className="ml-2">
              If Your Account is not activated
              <span
                onClick={() => router.push('/tenant/resend')}
                className="ml-2 text-green-500 font-semibold hover:underline cursor-pointer text-color-pallete1"
              >
                Resend OTP
              </span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormLogin;
