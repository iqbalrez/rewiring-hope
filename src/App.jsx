import React, { useState, useEffect } from 'react';
import './assets/css/tailwind.css';
import { scrollSpy } from 'react-scroll';

// import './assets/scss/icons.scss';

import { Routes, Route } from 'react-router-dom';

import Index from './pages/index.jsx';
import AboutPage from './pages/about.jsx';
import Loader from './component/Loader.jsx';
import NotFound from './pages/not-found.jsx';
import TermsAndConditionsPage from './pages/tnc.jsx';

import IndexTwo from './pages/template/index-two.jsx';
import IndexThree from './pages/template/index-three.jsx';
import IndexFour from './pages/template/index-four.jsx';
import IndexFive from './pages/template/index-five.jsx';
import IndexSix from './pages/template/index-six.jsx';
import IndexSeven from './pages/template/index-seven.jsx';
import IndexEight from './pages/template/index-eight.jsx';
import IndexNine from './pages/template/index-nine.jsx';

import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signup.jsx';
import ResetPassword from './pages/auth/reset-password.jsx';
import BlogDetail from './pages/template/blog-detail.jsx';
import PortfolioDetail from './pages/template/portfolio-detail.jsx';
import IndexTen from './pages/template/index-ten.jsx';
import IndexTwelve from './pages/template/index-twelve.jsx';
import IndexEleven from './pages/template/index-eleven.jsx';
import BawPage from './pages/baw.jsx';
import OrderPage from './pages/admin/OrderPage.jsx';

export default function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    document.documentElement.setAttribute('dir', 'ltr');
    handleRouteChange();

    scrollSpy.update();
  }, []);

  const handleRouteChange = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard/orders' element={<OrderPage />} />

        <Route path='/' element={<Index />} />
        <Route path='/about' element={<AboutPage />} />
        <Route
          path='/terms-and-conditions'
          element={<TermsAndConditionsPage />}
        />
        <Route path='/brain-awareness-week' element={<BawPage />} />
        <Route path='/assets' element={<NotFound />} />
        <Route path='/src/assets' element={<NotFound />} />
        <Route path='*' element={<NotFound />} />
        {/* <Route path='/index' element={<Index />} />
            <Route path='/index-two' element={<IndexTwo />} />
            <Route path='/index-three' element={<IndexThree />} />
            <Route path='/index-four' element={<IndexFour />} />
            <Route path='/index-five' element={<IndexFive />} />
            <Route path='/index-six' element={<IndexSix />} />
            <Route path='/index-seven' element={<IndexSeven />} />
            <Route path='/index-eight' element={<IndexEight />} />
            <Route path='/index-nine' element={<IndexNine />} />
            <Route path='/index-ten' element={<IndexTen />} />
            <Route path='/index-eleven' element={<IndexEleven />} />
            <Route path='/index-twelve' element={<IndexTwelve />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/blog-detail' element={<BlogDetail />} />
            <Route path='/blog-detail/:id' element={<BlogDetail />} />
            <Route path='/portfolio-detail' element={<PortfolioDetail />} /> */}
      </Routes>
    </>
  );
}
