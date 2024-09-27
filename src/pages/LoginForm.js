import {useContext ,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import AuthContext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


export const LoginForm = () => {
  const {state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is not valid'),
    password: Yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });
  useEffect(() => {
    if (state.user) {
      navigate('/todos');
    }
  }, [state.user, navigate]); 

  const onSubmit = (data) => {
    const validEmail = 'test@gmail.com';
    const validPassword = 'test123';
    if (data.email === validEmail && data.password === validPassword) {
      dispatch({ type: 'LOGIN', payload: { email: validEmail } });
      localStorage.setItem('user', JSON.stringify({ email: validEmail }));
      navigate('/todos');
    } else {
      alert('Invalid email or password. Please try again.');
    }
  };
  

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            </div>
            <div className="mt-2">
              <input
                id="email"
                {...register('email')}
                type="text"
                autoComplete="email"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.email && <span className='text-red-600'>{errors.email.message}</span>}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                {...register('password')}
                type="password"
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              {errors.password && <span className='text-red-600'>{errors.password.message}</span>}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
