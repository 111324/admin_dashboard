import { lazy, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

// project imports
import MainLayout from 'layout/MainLayout';
import AuthGuard from 'utils/authGuard';

// lazy pages
const DashboardDefault = lazy(() => import('ui-component/dashboard'));
const Bookings = lazy(() => import('ui-component/bookings/order'))
const Profile = lazy(() => import('ui-component/profile'))
const UserFeedbackPage = lazy(() => import('ui-component/user_feedback/index'));
const UserRatingPage = lazy(() => import('ui-component/user_rating/index'));
const NopageFound = lazy(() => import('ui-component/common/no-page/NoPage'));
const Vendor = lazy(() => import('ui-component/vendors/vendor'))
const Categories = lazy(() => import('ui-component/catrgories/category'))
const Subscription = lazy(()=> import('ui-component/subscription/index'))


const Loader = () => <div>Loading...</div>;

const MainRoutes = {
  path: '/',
  element: (
    <AuthGuard user={['Vendor', 'Surveyor', 'Requester']}>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    {
      path: '',
      element: <Navigate to="dashboard" replace />
    },
    {
      path: 'dashboard',
      element: (
        <Suspense fallback={<Loader />}>
          <DashboardDefault />
        </Suspense>
      )
    },
    {
      path: 'vendors',
      element: (
        <Suspense fallback={<Loader />}>
          <Vendor/>
        </Suspense>
      )

    },
    {
      path: 'categories',
      element: (
        <Suspense fallback={<Loader />}>
          <Categories />
        </Suspense>
      )
    },
    {
      path: 'bookings',
      element: (
        <Suspense fallback={<Loader />}>
          <Bookings />
        </Suspense>
      )
    },
    {
      path: 'revenue',
      element: (
        <Suspense fallback={<Loader />}>
          <NopageFound />
        </Suspense>
      )
    },
    {
      path: 'profile',
      element: (
        <Suspense fallback={<Loader />}>
          <Profile />
        </Suspense>
      )
    },
    {
      path: 'userfeedback',
      element: (
        <Suspense fallback={<Loader />}>
          <UserFeedbackPage />
        </Suspense>
      )
    },
    {
      path: 'rating',
      element: (
        <Suspense fallback={<Loader />}>
          <UserRatingPage />
        </Suspense>
      )
    },
    {
      path: 'subscription',
      element: (
        <Suspense fallback={<Loader />}>
          <Subscription />
        </Suspense>
      )

    },
    {
      path: '*',
      element: (
        <Suspense fallback={<Loader />}>
          <NopageFound />
        </Suspense>
      )
    }
  ]
};

export default MainRoutes;
