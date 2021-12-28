import React, { Component, Fragment } from 'react'
import LoginTabset from './loginTabset';
import { ArrowLeft, Sliders } from 'react-feather';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import stats from '../../assets/images/dashboard/stats.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export class Login extends Component {
    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            arrows: false
        };
        return (
            <Fragment>
                <div className="page-wrapper">
                    <div className="authentication-box">
                        <div className="container">
                            <div className="row">
                                 <div className="col-md-5 p-0 card-left">
                                    <div className="card bg-primary">
                                       <div className="svg-icon">
                                            <img src={stats} className="Img-fluid" />
                                        </div>
                                        <Slider className="single-item" {...settings}>
                                            <div>
                                                <div>
                                                    <h3>TRASAB</h3>
                                                    <p>Aplicatie trasabilitate operatiuni productie Larexir.</p>
                                                </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>TRASAB</h3>
                                                    <p>Atentie!. Pentru rularea aplicatiei este necesar sa rulati mai intai aplicatia: Trasab acces.</p>
                                                    </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>TRASAB</h3>
                                                    <p>In cazul in care apare fereastra de avertizare "Conexiunea nu este privata", apasati butonul "Avansate" si apoi apasati link-ul : "Accesati larexir.local(nesigur)". Dupa care inchideti fereastra. </p>
                                                    </div>
                                            </div>
                                            <div>
                                                <div>
                                                    <h3>TRASAB</h3>
                                                    <p>La fiecare 10 ore se emite un certificat de securitate nou, ce necesita parcurgerea pasilor prezentati anterior.</p>
                                                    </div>
                                            </div>
                                            
                                           
                                        </Slider >
                                    </div>
                                </div> 
                                <div className="col-md-7 p-0 card-right">
                                    <div className="card tab2-card">
                                        <div className="card-body">
                                            <LoginTabset />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*<a href="https://react.pixelstrap.com/multikart" target="_blank" className="btn btn-primary back-btn"><ArrowLeft />back</a>*/}
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Login
