import React, { Component } from "react";
import data from "../data/data";
import MaterialTable from 'material-table';
import { Typography, MenuItem, Select,InputLabel, FormControl } from '@material-ui/core';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';

const API_URL = 'http://www.mocky.io/v2/5d4caeb23100000a02a95477';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

class DynamicTable extends Component {
    constructor(props) {
        super(props);

        // get the distinct values of stores to look up
        const distinctStore = [...new Set(data.map(x => x.store))];
        const lookupStore = {}
        for (var i in distinctStore) {
            lookupStore[distinctStore[i]] = distinctStore[i];
        }

        //get the distinct values of countries to look up
        const distinctCountry = [...new Set(data.map(x => x.country))];
        const lookupCountry = {}
        for (var j in distinctCountry) {
            lookupCountry[distinctCountry[j]] = distinctCountry[j];
        }

        this.state = {
            id: null,
            index: null,
            country: null,
            value: null,
            store: null,
            returned: null,
            originalData: null,
            displayData: null,
            isLoaded: false,
            lookupCurrencyByCountryCode: {"USA": "USD", "NZL": "NZD", "AUS": "AUD"},
            rateByCurrencies: this.buildCurrencies(),
            columns: [
                // { title: 'ID', field: 'id', filtering: false },
                { title: 'Index', field: 'index', filtering: false },
                { title: 'Country', field: 'country', lookup: lookupCountry },
                { title: 'Value', field: 'value', filtering: false },
                { title: 'Store', field: 'store', lookup: lookupStore },
                { title: 'Returned', field: 'returned', type: 'boolean', lookup: { false: "Not Returned" } },
                // {
                //     title: 'Sales In',
                //     field: 'country',
                //     lookup: { "USA": "USD", "NZL": "NZD", "AUS": "AUD" },
                // },
            ],
        };
    }

    buildCurrencies() {
        const currencies = {
            [this.props.base]: 1
        };
        Object.assign(currencies, this.props.rates);
        return currencies;
    }

    componentDidMount() {
        // fetch API to get all sales data
        axios.get(API_URL)
            .then(response => response.data)
            .then(sales => {
                let displayData = this.transformToSelectedCurrency(this.props.base, sales);
                this.setState({ originalData: sales, displayData: displayData });
                this.setState({ isLoaded: true });
            });
    }

    currenciesSelected(event) {
        if (event.target.value) {
            let displayData = this.transformToSelectedCurrency(event.target.value.currency, this.state.originalData);
            this.setState({ displayData: displayData });
        }
    }

    transformToSelectedCurrency(selectedCurrency, values) {
        let rateOfSelectedCurrency = this.state.rateByCurrencies[selectedCurrency];
        let displayData = values.map(element => {
            let currency = this.state.lookupCurrencyByCountryCode[element.country];
            if (currency !== selectedCurrency) {
                // convert to base currency
                let baseConverted = element.value / this.state.rateByCurrencies[currency];
                // convert to target currency
                let targetConverted = baseConverted * rateOfSelectedCurrency;
                // avoid side effect by creating a cloned object
                let cloneObject = {};
                Object.assign(cloneObject, element);
                cloneObject.value = (targetConverted).toFixed(2);
                return cloneObject;
            }
            return element;
        });
        return displayData;
    }

    renderOptions() {
        return Object.keys(this.state.rateByCurrencies).map((rate, i) => {
            return (
                <MenuItem
                    value={{currency: rate}}
                    key={i}
                    name={this}>
                    {rate}
                </MenuItem>
            );
        });
    }
    
    render() {
        return (
            <form className={useStyles.root} autoComplete="off">
                {this.state.isLoaded ? (
                    <FormControl className={useStyles.formControl} fullWidth={true}>
                        <InputLabel htmlFor="rates">Select Currency</InputLabel>
                        <Select
                            value={this.state.rateByCurrencies}
                            onChange={(e) => this.currenciesSelected(e)}
                            inputProps={{
                                name: 'Rate',
                                id: 'rates'
                            }}>
                            {this.renderOptions()}
                        </Select>

                        <MaterialTable
                            title="Sales Table"
                            columns={this.state.columns}
                            data={this.state.displayData}
                            options={{
                                filtering: true
                            }}
                        />
                    </FormControl>
                    
                ) : (
                        <Typography>Loading data</Typography>
                    )}
            </form>
        )
    }
}

export default DynamicTable;