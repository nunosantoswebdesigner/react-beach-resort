import React from 'react'
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import {Link} from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import GoogleMap from '../components/GoogleMap';


export default function Home() {
    return (
        <>
        <Hero>
            <Banner title="Espetaculares Quartos" subtitle="Apartir de 40€ por noite">
                <Link to='/rooms' className="btn-primary">ver todos</Link>
            </Banner>
        </Hero>
        <Services />
        <FeaturedRooms />
        <GoogleMap />
        </>
    );
}
