import React, { Component } from 'react'

import SHOP_DATA from './shop.data.js'
import './shop.scss'
import Preview from '../../components/preview/preview.jsx'

class Shop extends Component {
    constructor() {
        super()

        this.state = {
            store: SHOP_DATA,
        }
    }

    render() {
        return (
            <div className='shop-page'>
                <Preview store={this.state.store} />
            </div>
        )
    }
}

export default Shop
