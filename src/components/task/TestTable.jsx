import React, { Component } from "react";
import data from "../data/data";
import MaterialTable from 'material-table';

class TestTable extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            index: null,
            country: null,
            value: null,
            store: null,
            returned: null,

            columns: [
                { title: 'ID', field: 'id' },
                { title: 'Index', field: 'index' },
                { title: 'Country', field: 'country' },
                { title: 'Value', field: 'value' },
                { title: 'Store', field: 'store' },
                { title: 'Returned', field: 'returned' },
            ],
        };
    }

//    componentDidMount() {
        // fetch API to get data
//        fetch("http://www.mocky.io/v2/5d4caeb23100000a02a95477")
//            .then(response => response.json())
//            .then(sampledata => this.setState({ ...sampledata }));
//    }

    render() {
        return (
            <div>
                <tr><td>{this.state.country}</td></tr>
                <MaterialTable
                    title="Testing Table"
                    columns={this.state.columns}
                    data={data}
                    />
            </div>
        )
    }
}

export default TestTable;