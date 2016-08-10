import Inferno, { createVNode } from 'inferno'
import Component from 'inferno-component'
import createElement from 'inferno-create-element'
import size from 'lodash/fp/size'
import classnames from 'classnames'
import { observable } from 'mobx'
import { connect } from 'mobx-connect/inferno'

@connect
class Menu extends Component {

    @observable menu = {
        index: 0,
        items: {}
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
        const children = this.props.children.map((child, index) => {
            const className = classnames({ 'selected': this.menu.index === index })
            return child.setClassName(className)
            //.setAttrs({ tabIndex: index })
        })
        return <menu>
            {children}
        </menu>
    }
}

export default Menu;
