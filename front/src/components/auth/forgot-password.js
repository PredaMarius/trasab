import React, { Fragment } from 'react';
import { Tabs, TabList, TabPanel, Tab } from 'react-tabs';
import { User} from 'react-feather';
import { withRouter} from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { RESETPASSWORD_MUTATION, FORGOTPASSWORD_MUTATION } from './queries'
import {setToken, setUser} from '../../localstorage/localstorage';
import { useFormik } from 'formik'; 
import { EMAIL, PASSWORD } from './fieldsNames';
import defaultValues from './defaultValues';
import validationSchema from './validationSchema';

export const LoginTabset =props=> {

    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema:validationSchema,
        validateOnChange:false,
        validateOnBlur:false,
        onSubmit: (values, { setSubmitting }) => {
                setTimeout(() => {
                   forgot();
                   setSubmitting(false);
                }, 400);
            },        
      });

    const clickActive = (event) => {
        document.querySelector(".nav-link").classList.remove('show');
        event.target.classList.add('show');
    }
       
    const [forgot,{error}] = useMutation(FORGOTPASSWORD_MUTATION, {
        variables: {
          email: formik.values.email,
        },
        onCompleted: ({ forgot }) => {
            //console.log(forgot)
            if (forgot){
                props.history.push(`${process.env.PUBLIC_URL}/mesaj`);
            }
            
        }
      });
  
        return (
            <div>
                <Fragment >
                <div>{error && error.graphQLErrors.map(({ message }, i) => (
                    <span key={i} style={{color:"red"}}>{message==="Bad Request"?"Date incorecte!":message}</span>
                  ))}
                  </div>
               
                    <Tabs>
                        <TabList className="nav nav-tabs tab-coupon" >
                            <Tab className="nav-link" onClick={(e) => clickActive(e)}><User />Resetare parola</Tab>
                        </TabList>

                        <TabPanel>
                            <form className="form-horizontal auth-form" onSubmit={formik.handleSubmit}>
                            <h1>Va rugam sa introduceti email-ul dumneavoastra la care sa va trimite informatiile necesare resetarii parolei</h1>
                                <div className="form-group">
                                        {formik.touched.email && formik.errors.email ? <small class="form-text text-muted">{formik.errors.email}</small> : null}
                                        <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required="" name={EMAIL} type="email" className="form-control" placeholder="Utilizator" id="exampleInputEmail1" />
                                    </div>
                                    
                                    
                                    <div className="form-button">
                                        <button className="btn btn-primary" type="submit" >Conectare</button>
                                    </div>
                            </form>
                            
                        </TabPanel>
                        
                    </Tabs>
                </Fragment>
            </div>
        )
    }


export default withRouter(LoginTabset)

