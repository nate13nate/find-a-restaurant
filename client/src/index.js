import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import reducers from './redux/reducers';

ReactDOM.render(<Provider store={createStore(reducers)}><App /></Provider>, document.getElementById('root'));
