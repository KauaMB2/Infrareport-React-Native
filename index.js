import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import App from './App' // Your main App component
import store from './Redux/store' // Your Redux store

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

AppRegistry.registerComponent('main', () => ReduxApp)
