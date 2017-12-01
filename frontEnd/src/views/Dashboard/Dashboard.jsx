import React, { Component } from 'react';
import ChartistGraph from 'react-chartist';
import { Grid, Row, Col } from 'react-bootstrap';
import axios from 'axios';

import {Card} from 'components/Card/Card.jsx';
import {
    data,
    options,
    responsive,
    legend,
    dataPie,
    legendPie
} from 'variables/Variables.jsx';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: null,
            options: null,
            responsive: null,
            legend: null,
            dataPie: {
                labels: ['100%','0%'],
                series: [100, 0]
            },
            legendPie: {
                names: ["Not Fraud","Fraud"],
                types: ["info","danger"]
            }
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
            console.log(data)
            let count = 0
            for(var i = 0; i < data.length; ++i){
                console.log(data[i]["rating"])
                if(data[i]["rating"] >= 5)
                    count++;
            }
            console.log(count)
            count = (100*count/data.length).toFixed(2)
            this.setState({ dataPie: {
                labels: [`${100-count}%`,`${count}%`],
                series: [100-count, count]
            } });
            console.log(this.state)
          });

    }
    createLegend(json){
        var legend = [];
        for(var i = 0; i < json["names"].length; i++){
            var type = "fa fa-circle text-"+json["types"][i];
            legend.push(
                <i className={type} key={i}></i>
            );
            legend.push(" ");
            legend.push(
                json["names"][i]
            );
        }
        return legend;
    }
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6} className="calcu-override-margin">
                            <Card
                                id="chartHours"
                                title="Users Behavior"
                                content={
                                    <div className="ct-chart">
                                        <ChartistGraph
                                            data={data}
                                            type="Line"
                                            options={options}
                                            responsiveOptions={responsive}
                                        />
                                    </div>
                                    }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legend)}
                                    </div>
                                }
                            />
                        </Col>
                        <Col md={6} className="calcu-override-margin">
                            <Card
                                title="Email Statistics"
                                content={
                                    <div id="chartPreferences" className="ct-chart ct-perfect-fourth">
                                        <ChartistGraph data={this.state.dataPie} type="Pie"/>
                                    </div>
                                }
                                legend={
                                    <div className="legend">
                                        {this.createLegend(legendPie)}
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

export default Dashboard;
