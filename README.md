# Summary of Programming Test - React

## 1. Project Requirements
Overall, the project requirements are fetching data from a given API, processing them and displaying them dynamically in a filterable table. As I have seen `Material UI` being used within the initial project, I decided to use them as well.

To see what I have done, please navigate to the project main folder and run the following commands:

Firstly, install all the packages that I have used which are stored in `package.json`     
`npm install`

And run the whole React web application:      
`npm start`

I have created a new component named `DynamicTable` which is passed to `Task.jsx` to be displayed in the Task page.
### 1.1. Fetching Data
In order to fetch data, I use `axios` within the `componentDidMount()` method. The process is getting the data from the given API and then generate and assign them to the `displayData`, one of the element in the state of `DynamicTable` with the base currency, which is NZD in this case. I then updated the state using `setState()` method.
When `render()` method is called, it will take the `displayData` as the data and display them in `<MaterialTable>` element.
### 1.2. See only sales values that are not returned
Within the class constructor, I declare `columns` and within it there is a column named `Returned`. The function will  look at the `returned` field and see if the boolean value is `true` then the sale is `Returned`, otherwise `Not Returned`.
### 1.3. View sales by country
In order to make the table more dynamic, I have a loop to go through all items in data and pick out distinct values of country to be looked up in the `Country` column.
### 1.4. View the sales in different currencies
This is the part that I find most challenging. What I have done is I created 3 more functions to support render sales value based on the currency that is chosen. Besides that I also have one column to show which currency that the sales are in. The table when first render will show the sales value in the base currency, which is NZD, and we can convert them to AUD and USD by choosing from the dropdown menu on the top left corner of the table. I will discuss about what I found challenging in the next section for further improvements.
### 1.5. See the sales by stores
Similarly to the `Country` column, I have a loop to go through all items in data and pick out distinct values of store names to be looked up in the `Store` column. Therefore now we can filter out the sales from specific stores that we want to see.
### 1.6. Other
I have also done the `search` feature that will let you search anything within the data.
## 2. Further Improvements
### 2.1. Boolean expression in the requirement 1.2.
As you have noticed, the column `Returned` has the right values taken from the given API. However, when we filter out `Returned` or `Not Returned`, the icon for `false` values somehow change all to true icon even though the list of items we need to see has been rendered correctly. Therefore, if I have more time to look at this, I will try to make it works more properly to avoid misunderstanding the rendered data.
### 2.2. UI for select menu in the requirement 1.4.
For now the dropdown menu for choosing different currencies has been worked properly. However, the chosen values, such as 'NZD', 'AUD', or 'USD' does not show within the menu box. I have made another column named `Currency` that shows which currency has been chosen, but this is not an optimized approach. The way it should be is showing the chosen value at the dropdown menu box right after we choose it.
### 2.3. Create a separated page for the Sales Table
Last but not least, I think it is best to have a separated page for the Sales Table that I am working on. That way the table would have been displayed much better and clearer.

## 3. References
* [Table in Material UI documentation](https://material-ui.com/components/tables/)
* [Material Table Documentation](https://github.com/mbrn/material-table)
* [React Fetching Data](https://www.robinwieruch.de/react-fetching-data/?fbclid=IwAR1sRbkjZvzfxIvMoa1HEacZz5nsGV8ApAZ6AOXUn4qK2Ny5DvCIhdBnou0#react-fetch-data-axios)
