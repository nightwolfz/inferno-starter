import Inferno, { createVNode } from 'inferno'
import Component from 'inferno-component'
import size from 'lodash/fp/size'
import classnames from 'classnames'
import { observable } from 'mobx'
import { connect } from 'mobx-connect/inferno'
import { Link } from '../../../shared/router'

@connect
class Menu extends Component {

    @observable menu = {
        index: 0,
        items: {}
    }

    componentWillMount() {
        this.menu.items = Object.keys(this.props.children)
    }

    componentWillUnmount() {
        this.menu.items = {}
    }

    getItem(index) {
        return this.menu.items[index]
    }

    setIndex(newIndex, resetIndex = 0) {
        if (newIndex < 0) newIndex = size(this.menu.items) - 1
        if (newIndex > size(this.menu.items) - 1) newIndex = 0

        this.menu.index = this.getItem(newIndex) ? newIndex : resetIndex
    }

    render() {
        const { children } = this.props
        return <menu>
            {children.map((child, index) => {
                return child.setAttrs({
                    ...child.attrs,
                    className: classnames({ 'selected': this.menu.index === index }),
                    onClick: (e) => {
                        this.setIndex(index)
                    }
                })
            })}
        </menu>
    }
}

export default Menu
