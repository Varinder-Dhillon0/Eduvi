import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Courses from './Courses';
import Layout from './Layout';
import { Toaster } from 'react-hot-toast';
import Verified from "./verified";
import { QueryClient, QueryClientProvider } from "react-query"
import CourseDetails from './coursedetails';
import AdminDashboard from './AdminDashboard';
import Revenue from './components/adminRevenue';
import Upload from './components/adminUpload';
import PaymentVerify from './paymentverify';
import Transactions from './components/adminTransactions';
import UserDashboard from './userDashboard';
import CourseDash from './course_dash';
import Mentors from './mentors';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Toaster />
        <Routes>
            <Route path="/" element={<Layout><App /></Layout> } />
            <Route path="/courses" element={<Layout><Courses /></Layout> } />
            <Route path="/dashboard" element={<Layout><UserDashboard /></Layout> } />
            <Route path="/verified/:status" element={<Layout><Verified /></Layout> } />
            <Route path="/coursedetails/:id" element={<Layout><CourseDetails /></Layout> } />
            <Route path="/learn/:id" element={<Layout><CourseDash /></Layout> } />
            <Route path="/mentors" element={<Layout><Mentors /></Layout> } />
            <Route path="/payment/:status/:id" element={<Layout><PaymentVerify /></Layout> } />
            <Route path="/admindashboard/revenue" element={<AdminDashboard><Revenue></Revenue></AdminDashboard>} />
          <Route path="/admindashboard/upload" element={<AdminDashboard><Upload></Upload></AdminDashboard>} />
          <Route path="/admindashboard/transactions" element={<AdminDashboard><Transactions></Transactions></AdminDashboard>} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);