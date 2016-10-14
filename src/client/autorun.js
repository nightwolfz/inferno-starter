import { autorun } from 'mobx'

export default function({ common }) {

    // Update document title whenever it changes
    autorun(() => {
        if (common.title) {
            document.title = common.title
        }
    })
}
