import React, { Component } from 'react';
import { Cartesian, Panel } from '@extjs/reactor/modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.interactions.PanZoom',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric3D',
    'Ext.chart.grid.HorizontalGrid3D',
    'Ext.chart.series.Bar3D',
    'Ext.chart.axis.Category3D'
]);

export default class Basic3DColumnChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(15));
    }

    changeTheme = (select, choice) => {
        this.setState({ theme: choice.get('value') })
    }

    render() {
        const { theme } = this.state;

        return (
            <Panel shadow layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    store={this.store}
                    theme={theme}
                    series={{
                        type: 'bar3d',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3']
                    }}
                    axes={[{
                        type: 'numeric3d',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3'],
                        grid: true,
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    }, {
                        type: 'category3d',
                        position: 'bottom',
                        fields: 'name'
                    }]}
                />
            </Panel>            
        )
    }
}