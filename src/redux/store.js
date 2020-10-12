import { createStore } from 'redux'
// import {createStore} from '../libs/redux/index'
import reducers from './reducer'

const store = createStore(reducers);
export default store