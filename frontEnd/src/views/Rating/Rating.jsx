import React, { Component } from 'react';
import {
    Grid, Row, Col
} from 'react-bootstrap';

import Card from 'components/Card/Card.jsx';

import axios from 'axios';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';


class Rating extends Component{
    constructor(props) {
        super(props)
        this.state = {
            dataRows:  []
        }
    }
    componentDidMount() {

        axios({
          method: 'post',
          url: 'https://cors-anywhere.herokuapp.com/https://calcurisk-backend.herokuapp.com/rating',
          data: {
            key: 'calcurisk',
            mode: 'fetch'
          }
        }).then(res => {
            const data = res.data
            this.setState({ dataRows: data });
            console.log(this.state.dataRows)
        });
    }

    render() {

      const options = {
        paginationShowsTotal: true  // Enable showing total text
      };
          return (
            <div className="main-content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            {/*<h4 className="title">Customer Risk Rating</h4>*/}
                            <Card
                                title="Customer Risk Rating"
                                category="Here is a subtitle for this table"
                                tableFullWidth
                                content={
                                    <div className="content table-full-width table-responsive">
                                        <BootstrapTable version='4'
                                            data={ this.state.dataRows }
                                            // cellEdit={ cellEditProp }

                                            search
                                            options={ options }
                                            pagination
                                            searchPlaceholder='Search records'
                                            striped
                                            hover
                                            maxHeight="534px"
                                            headerStyle={ { height : '45px' } }
                                        >
                                            <TableHeaderColumn dataField='name' dataSort isKey={ true }>
                                                Name
                                            </TableHeaderColumn>
                                            <TableHeaderColumn dataField='rating'  dataSort>
                                                Rating
                                            </TableHeaderColumn>
                                        </BootstrapTable>
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

export default Rating;
