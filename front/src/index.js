import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.scss';
import App from './components/app';
import { ScrollContext } from 'react-router-scroll-4';

// Components
import Dashboard from './components/dashboard';
import List_departments from './components/departments/index';
import List_sections from './components/sections/index';
import List_jobs from './components/jobs/index';
import List_teams from './components/teams/index';

import List_orders from './components/orders/index';
import List_ordercontent from './components/ordercontent/index';
import Fisa from './components/report/index';


import Login from './components/auth/login';
import Logout from './components/auth/logout';

import { setContext } from '@apollo/client/link/context';
import {strapiGraphqlUrl} from './config/strapi';
import {getToken, getUser} from './localstorage/localstorage'


//Configure ApolloClient

// 1
import {
    ApolloProvider,
    ApolloClient,
    InMemoryCache
  } from '@apollo/client';

  import { createUploadLink } from 'apollo-upload-client';
  
  // 2
  const httpLink = createUploadLink({
      uri: strapiGraphqlUrl
    });

  
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : ''
      }
    };
  });

  // 3
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

 
  const currentUser=getUser();
class Root extends Component {
  
    render() {
        return (
            <ApolloProvider client={client}>
            <BrowserRouter basename={'/'}>
                <ScrollContext>
                    <Switch>
                    <Route exact path={`${process.env.PUBLIC_URL}/auth/logout`} component={Logout} />
                        <Route exact path={`${process.env.PUBLIC_URL}/auth/login`} component={Login} />
                            <App>
                                <Route exact path={`${process.env.PUBLIC_URL}/`} component={Dashboard} />
                                <Route path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} />
                               
                                <Route path={`${process.env.PUBLIC_URL}/departamente`}  
                                render={(props) => (
                                  <List_departments {...props} currentUser={getUser()} />
                                )}
                                />

                                <Route path={`${process.env.PUBLIC_URL}/sectii/:idDepartament`}
                                render={(props) => (
                                  <List_sections {...props} currentUser={getUser()} />
                                )}/>
                                
                                <Route path={`${process.env.PUBLIC_URL}/posturi/:idSectie`} 
                                render={(props) => (
                                  <List_jobs {...props} currentUser={getUser()} />
                                )} />

                                <Route path={`${process.env.PUBLIC_URL}/echipe/:idPost`} 
                                render={(props) => (
                                  <List_teams {...props} currentUser={getUser()} />
                                )} />

                                <Route path={`${process.env.PUBLIC_URL}/comenzi/:idPost`} 
                                render={(props) => (
                                  <List_orders {...props} currentUser={getUser()} />
                                )} />

                                <Route path={`${process.env.PUBLIC_URL}/continutcomanda/:idComanda`} 
                                render={(props) => (
                                  <List_ordercontent {...props} currentUser={getUser()} />
                                )} />

                                <Route path={`${process.env.PUBLIC_URL}/fisa`} 
                                render={(props) => (
                                  <Fisa {...props} currentUser={getUser()} />
                                )} />


                                
                                
                            </App>
                    </Switch>
                </ScrollContext>
            </BrowserRouter>
            </ApolloProvider>
        )
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));


