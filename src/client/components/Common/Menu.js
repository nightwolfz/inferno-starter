import Inferno from 'inferno'
import Component from 'inferno-component'
import size from 'lodash/fp/size'
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
            return child;
        })
        return <menu>
            {children}
        </menu>
    }
}

export default Menu;
