import React, { Component } from 'react';
import {
    Grid, Row, Col,
    Table,
} from 'react-bootstrap';

import Button from 'elements/CustomButton/CustomButton.jsx';

// react component that creates a switch button that changes from on to off mode
import Switch from 'react-bootstrap-switch';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import Card from 'components/Card/Card.jsx';

import axios from 'axios';

import _ from 'lodash';

const products = [{
        category: "Category 1",
        score: 20
    }]



class Category extends Component{
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            updates: []
        }
        this.onAfterSaveCell = this.onAfterSaveCell.bind(this)
        this.onBeforeSaveCell = this.onBeforeSaveCell.bind(this)
        this.onButtonClick = this.onButtonClick.bind(this)
    }

    componentDidMount() {
        axios({
          method: 'post',
          url: 'https://cors-anywhere.herokuapp.com/https://calcurisk-backend.herokuapp.com/category',
          data: {
            key: 'calcurisk',
            mode: 'fetch'
          }
        }).then(res => {
            const data = res.data
            console.log(res.data)
            this.setState({ data: data });
          });
          console.log(this.state.data)
        }

    onAfterSaveCell(row, cellName, cellValue) {

        const index = _.findIndex(this.state.data, {id: row["id"]});
        const newarr = this.state.updates.slice()
        newarr.splice(index, 1, {...row});
        this.setState({updates: newarr})

      return true;
    }

    onBeforeSaveCell(row, cellName, cellValue) {
      // You can do any validation on here for editing value,
      // return false for reject the editing
      return true;
    }

    onButtonClick() {
        axios({
          method: 'post',
          url: 'https://cors-anywhere.herokuapp.com/https://calcurisk-backend.herokuapp.com/category',
          data: {
            key: 'calcurisk',
            mode: 'update',
            update: this.state.updates
          }
        }).then(res => {
            const data = res.data
            console.log(res.data)
            this.setState({ data: data });
          });
          console.log(this.state.updates)
    }

    render(){
        const cellEditProp = {
          mode: 'click',
          blurToSave: true,
          beforeSaveCell: this.onBeforeSaveCell, // a hook for before saving cell
          afterSaveCell: this.onAfterSaveCell  // a hook for after saving cell
        };

        const weight = ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100']
      const options = {
        paginationShowsTotal: true  // Enable showing total text
      };
        return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Customer Risk Category"
                                category="Here is a subtitled for this table"
                                ctTableResponsive
                                content={
                                    <div className="content table-full-width table-responsive">
                                        <BootstrapTable version='4'
                                            data={ this.state.data }
                                            cellEdit={ cellEditProp }
                                            pagination
                                            options={ options }
                                            search
                                            searchPlaceholder='Search records'
                                            striped
                                            hover
                                            maxHeight="534px"
                                            headerStyle={ { height : '45px' } }
                                        >
                                            <TableHeaderColumn dataField='category' dataSort
                                                isKey={ true }
                                            >
                                                Category
                                            </TableHeaderColumn>
                                            <TableHeaderColumn dataField='weight' width='15%' dataSort
                                                editable={ { type: 'select', options: { values: weight } } }
                                            >
                                                Score
                                            </TableHeaderColumn>
                                        </BootstrapTable>
                                        <Button bsStyle="primary" fill wd onClick={this.onButtonClick}>Save</Button>
                                    </div>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Category;
