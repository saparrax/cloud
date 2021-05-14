import React from "react";
import { Redirect } from "react-router-dom";
import { checkCookies } from 'cookies-next';

// Layout Types
import { DefaultLayout } from "./layouts";
import { DefaultLayout2} from "./layouts";

// Route Views
import BlogOverview from "./views/BlogOverview";
import UserProfileLite from "./views/UserProfileLite";
import AddNewPost from "./views/AddNewPost";
import Errors from "./views/Errors";
import ComponentsOverview from "./views/ComponentsOverview";
import Tables from "./views/Tables";
import BlogPosts from "./views/product/BlogPosts";
import Contenidors from "./views/contenidor/Contenidors";
import Contenidor from "./views/contenidor/Contenidor";
//import Product from "./views/product/ProductView2";
import Product from "./views/product/x";
import Album from "./views/Album";
//import ProductView1 from "./views/product/ProductView1";
//import ProductView2 from "./views/product/ProductView2";
import Porta from "./views/solicitud/Checkout";
import Map from "./views/map/index";

import Manual from "./views/recoManual/Checkout";

import Solicituds from "./views/recoAutomatica/solicitudAutomatica";
import Solicitud from "./views/recoAutomatica/solicitud";

import Automatica from "./views/recoAutomatica/Checkout";


import Recollides from "./views/recollida/Recollides";
import Recollida from "./views/recollida/Recollida";
import Reserves from "./views/reserva/Reserves";
import Reserva from "./views/reserva/Reserva";
//import Reutilitzacio from "./views/reutilitzar/Checkout";
import Reutilitzacio from "./views/reutilitzar/Reutilitzar";

import GestioBD from "./views/gestioBd/Gestionar";

import crearVehicle from "./views/gestioBd/GestionarVehicle";
import crearCategoria from "./views/gestioBd/GestionarCategoria";
import crearUbicacio from "./views/gestioBd/GestionarUbicacio";
import crearContenidor from "./views/gestioBd/GestionarContenidor";

import API from "./views/api/api";
import APIview from "./views/api/apiview";

import Porta2 from "./views/solicitud/Solicitud";

import Register from "./views/register/Register";
import Login from "./views/login/Login"

import ReservaUsuari from "./views/reservaUsuari/reservaUsuari"
import ReservesUsuari from "./views/reservaUsuari/reservesUsuari"

import Vehicles from "./views/vehicle/vehicles";
import Vehicle from "./views/vehicle/vehicle";


import Categories from "./views/categoria/categories";
import Categoria from "./views/categoria/categoria";

import Ubicacions from "./views/ubicacio/ubicacions";
import Ubicacio from "./views/ubicacio/ubicacio";

function checkUser(){
	return checkCookies('ctx', 'token');
}


export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => checkUser? <Redirect to="/blog-posts" /> : <Redirect to="/signin" />
  },
  {
    path: "/blog-overview",
    layout: DefaultLayout,
    component: BlogOverview
  },
  {
    path: "/user-profile-lite",
    layout: DefaultLayout,
    component: UserProfileLite
  },
  {
    path: "/add-new-post",
    layout: DefaultLayout,
    component: AddNewPost
  },
  {
    path: "/errors",
    layout: DefaultLayout,
    component: Errors
  },
  {
    path: "/components-overview",
    layout: DefaultLayout,
    component: ComponentsOverview
  },
  {
    path: "/tables",
    layout: DefaultLayout,
    component: Tables
  },
  {
    path: "/blog-posts",
    layout: DefaultLayout,
    component: BlogPosts
  },
	{
		path: "/contenidors",
		layout: DefaultLayout,
		component: Contenidors

	},
	{
		path: "/contenidor/:id",
		layout: DefaultLayout,
		component: Contenidor

	},
	{
		path: "/product/:id",
		layout: DefaultLayout,
		component: Product

	},
	{
		path: "/album",
		layout: DefaultLayout,
		component: Album
	},
	{
		path: "/porta",
		layout: DefaultLayout,
		component: Porta
	},
	{
		path: "/recoManual",
		layout: DefaultLayout,
		component: Manual
	},
	{
		path: "/recoAutomatica",
		layout: DefaultLayout,
		component: Automatica
	},
	{
		path: "/recollides",
		layout: DefaultLayout,
		component: Recollides
	},
	{
		path: "/recollida/:id",
		layout: DefaultLayout,
		component: Recollida
	},
	{
		path: "/reserves",
		layout: DefaultLayout,
		component: Reserves
	},
	{
		path: "/reserva/:id",
		layout: DefaultLayout,
		component: Reserva
	},
	{
		path: "/vehicles",
		layout: DefaultLayout,
		component: Vehicles
	},
	{
		path: "/vehicle/:id",
		layout: DefaultLayout,
		component: Vehicle
	},
	{
		path: "/categories",
		layout: DefaultLayout,
		component: Categories
	},
	{
		path: "/categoria/:id",
		layout: DefaultLayout,
		component: Categoria
	},
	{
		path: "/ubicacions",
		layout: DefaultLayout,
		component: Ubicacions
	},
	{
		path: "/ubicacio/:id",
		layout: DefaultLayout,
		component: Ubicacio
	},
	{
		path: "/solicitudAutomatica",
		layout: DefaultLayout,
		component: Solicituds
	},
	{
		path: "/solicitud/:id",
		layout: DefaultLayout,
		component: Solicitud
	},
	{
		path: "/map",
		layout: DefaultLayout,
		component: Map
	},
	{
		path: "/reutilitzacio/:id",
		layout: DefaultLayout,
		component: Reutilitzacio
	},
	{
		path:"/api",
		layout: DefaultLayout,
		component: API
	},	
	{
		path:"/apiview/:id",
		layout: DefaultLayout,
		component: APIview
	},
	{
		path: "/porta2",
		layout: DefaultLayout,
		component: Porta2
	},
	{
		path: "/signin",
		layout: DefaultLayout2,
		component: Login	
		
	},
	{
		path: "/register",
		layout: DefaultLayout2,
		component: Register
		
	},
	{
		path: "/reservaUsuari/:id",
		layout: DefaultLayout,
		component: ReservaUsuari
		
	},
	{
		path: "/reservesUsuari",
		layout: DefaultLayout,
		component: ReservesUsuari
		
	},
	{
		path: "/gestionar",
		layout: DefaultLayout,
		component:GestioBD
		
	},
	{
		path: "/crearVehicle",
		layout: DefaultLayout,
		component:crearVehicle
		
	},
	{
		path: "/crearCategoria",
		layout: DefaultLayout,
		component:crearCategoria
		
	},
	{
		path: "/crearUbicacio",
		layout: DefaultLayout,
		component:crearUbicacio
		
	},
	{
		path: "/crearContenidor",
		layout: DefaultLayout,
		component:crearContenidor
		
	}/*,
	{
		path: "/view2",
		layout: DefaultLayout,
		component: ProductView2
	}*/
];
