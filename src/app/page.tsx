import Image from 'next/image'

import styles from './page.module.css'
import { Provider } from 'react-redux'
import {store} from './store/store'
export default function Home() {
  return (
    <Provider  store={store}>
  <h1>Home</h1></Provider>
  )}