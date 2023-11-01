import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from '../shared/ui/errorBoundary';
import TestPage from '../pages/testPage/TestPage';


const MainPageLazy = lazy(() => import('../pages/mainPage'));
const LoginPageLazy = lazy(() => import('../pages/loginPage'));
const RegistrationPageLazy = lazy(() => import('../pages/registrationPage'));

export const MainRouter = () => (
    <BrowserRouter>
        <ErrorBoundary>
            <Suspense fallback="loading...">
                <Routes>
                    <Route path='/' element={<MainPageLazy />} />
                    <Route path='login' element={<LoginPageLazy />} />
                    <Route path='registration' element={<RegistrationPageLazy />} />
                    <Route path='/test' element={<TestPage />} />
                    <Route path='*' element={<MainPageLazy />} />
                </Routes>
            </Suspense>
        </ErrorBoundary>
    </BrowserRouter>
);