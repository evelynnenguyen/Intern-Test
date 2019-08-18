import React, { Component } from "react";
import data from "../data/data";
import MaterialTable from 'material-table';

class TestTable extends Component {
    constructor(props) {
        super(props);

        const uniqueStore = this.getUniqueStoreList(data)

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
                { title: 'Store', field: 'store', lookup: uniqueStore },
                { title: 'Returned', field: 'returned' },
                {
                    title: 'Currency',
                    field: 'country',
                    lookup: { "USA": "USD", "NZL": "NZD", "AUS": "AUD" },
                },
            ],
        };
    }

    getUniqueStoreList(givenData) {
        let uniqueList = {}
        for (var item in givenData) {
            console.log(item)
            if (!(givenData.store in uniqueList)) {
                uniqueList[givenData.store] = item;
                // Object.keys(data).forEach()
            }
        }
        return uniqueList
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