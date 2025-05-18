import React from 'react';
import { Route, Routes } from "react-router-dom";
import VerticalLayout from "@/layout"

import { authProtectedRoutes, publicRoutes } from "./allRoutes";
import { AccessRouteAuth, AuthProtected } from './AuthProtected';
import NonAuthLayout from '@/layout/NonAuthLayout';


const Index = () => {
    return(
        <React.Fragment>
            <Routes>
            {publicRoutes.map((route, idx) => (
                <Route
                    path={ route.path }
                    element={
                        <NonAuthLayout>
                            { route.component }
                        </NonAuthLayout>   
                    }
                    key={idx}
                />
            ))}
            
                <Route>
                {authProtectedRoutes.map((route, idx) => (
                    <Route
                        path={ route.path }
                        element={ 
                            <AuthProtected>
                                <VerticalLayout>
                                    <AccessRouteAuth
                                        path={ route.path }
                                        component={ route.component }
                                    />
                                </VerticalLayout>
                            </AuthProtected> }
                        key={idx}
                    />
                ))}
                </Route>
            </Routes>
            
        </React.Fragment>
    )
}

export default Index;