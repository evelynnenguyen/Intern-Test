import React, { Component } from "react";
import data from "../data/data";
import MaterialTable from 'material-table';

class TestTable extends Component {
    constructor(props) {
        super(props);

        // get the distinct values of stores to look up
        const distictStore = [...new Set(data.map(x => x.store))];
        const lookupStore = {}
        for (var i in distictStore) {
            lookupStore[distictStore[i]] = distictStore[i];
        }

        this.state = {
            id: null,
            index: null,
            country: null,
            value: null,
            store: null,
            returned: null,

            columns: [
//                { title: 'ID', field: 'id', filtering: false },
                { title: 'Index', field: 'index', filtering: false },
                { title: 'Country', field: 'country', lookup: { "USA": "America", "NZL": "New Zealand", "AUS": "Australia" }, },
                { title: 'Value', field: 'value', filtering: false },
                { title: 'Store', field: 'store', lookup: lookupStore },
                { title: 'Returned', field: 'returned', type: 'boolean', lookup: {true: "Returned", false: "Not Returned"} },
                {
                    title: 'Currency',
                    field: 'country',
                    lookup: { "USA": "USD", "NZL": "NZD", "AUS": "AUD" },
                },
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
                <MaterialTable
                    title="Evelynne's Table"
                    columns={this.state.columns}
                    data={data}
                    options={{
                        filtering: true
                    }}
                    
                    />
            </div>
        )
    }
}

export default TestTable;