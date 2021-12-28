import React, { Fragment, useState, useEffect } from 'react';
import { withRouter} from 'react-router-dom';
import { useMutation} from '@apollo/client';
import { LOGIN_MUTATION} from './queries'
import {setToken, setUser} from '../../localstorage/localstorage';
import { useFormik } from 'formik'; 
import { EMAIL, PASSWORD } from './fieldsNames';
import defaultValues from './defaultValues';
import validationSchema from './validationSchema';

export const LoginTabset =props=> {
     
    const [connect, setConnect] = useState(false);
    
    const formik = useFormik({
        initialValues: defaultValues,
        validationSchema:validationSchema,
        validateOnChange:false,
        validateOnBlur:false,
        onSubmit: (values, { setSubmitting }) => {
                setTimeout(() => { 
                    login();
                    setSubmitting(false);
                }, 400);
            },        
    });

    const [login,{error}] = useMutation(LOGIN_MUTATION, {
        variables: {
          email: formik.values.email,
          password: formik.values.password
        },
        onCompleted: ({ login }) => {
            setToken(login.jwt);
            setUser(login.user);
            setConnect(true)
        }
    });

    useEffect(()=>{ 
        connect && props.history.push(`${process.env.PUBLIC_URL}/dashboard`);
    },[connect, props.history])

  
        return (
            <div>
                <Fragment >
                    <div>
                        {error && error.graphQLErrors && Object.keys(error.graphQLErrors) && error.graphQLErrors.map(({ message }, i) => (
                            <span key={i} style={{color:"red"}}>{message==="Bad Request"?"Date incorecte!":message}</span>
                        ))}
                    </div>
               
                    <form className="form-horizontal auth-form" onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                                {formik.touched.email && formik.errors.email ? <small class="form-text text-muted">{formik.errors.email}</small> : null}
                                <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required="" name={EMAIL} type="text" className="form-control" placeholder="Utilizator" id="exampleInputEmail1" />
                            </div>
                            
                            <div className="form-group">
                                {formik.touched.password && formik.errors.password ? <small class="form-text text-muted">{formik.errors.password}</small> : null}
                                <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} required="" name={PASSWORD} type="password" className="form-control" placeholder="Parola" />
                            </div>
                            
                            <div className="form-button">
                                <button className="btn btn-primary" type="submit" >Autentificare</button>
                            </div> 
                    </form>
                </Fragment>
            </div>
        )
    }


export default withRouter(LoginTabset)

