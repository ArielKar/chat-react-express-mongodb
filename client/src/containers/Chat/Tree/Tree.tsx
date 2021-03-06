import * as React from 'react';

import './Tree.css';

import ChatTree from '../../../plugins/tree-build/chat-tree';
import {events} from '../../../util/events';

class Tree extends React.Component<any, {}> {
    listElement: any;
    tree: any;
    data: Object | undefined;

    constructor(props: any) {
        super(props);
        this.listElement = React.createRef();
    }

    componentDidMount() {
        this.tree = ChatTree(this.listElement.current);
        events.on('treeElementSelected', this.onTreeElementSelected);
        this.listElement.current.focus();
    }

    componentDidUpdate() {
        const nextTreeData = this.props.tree;
        if (!!nextTreeData && this.data !== nextTreeData) {
            this.data = nextTreeData;
            this.tree.clear();
            this.tree.load(this.data);
        }
    }

    onTreeElementSelected = (selectedElementID: number) => {
        this.props.setConversation(selectedElementID);
    };

    componentWillUnmount() {
        events.off('treeElementSelected', this.onTreeElementSelected);
    }

    render() {
        return (
            <div className="tree">
                <ul tabIndex={0} ref={this.listElement}/>
            </div>
        );
    }
}

export default Tree;