import React, { Component } from 'react';

export class Test extends Component {
    static displayName = Test.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true };
    }

    componentDidMount() {
        this.populateWeatherData();
    }

    static renderForecastsTable(data) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Наименование маршрута</th>
                        <th>Дата начала</th>
                        <th>Комментарии</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr>
                            <td>{item.routeName}</td>
                            <td>{item.dateTime}</td>
                            <td>{item.routeComment}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : Test.renderForecastsTable(this.state.data);

        return (
            <div>
                <h1 id="tabelLabel" >Маршруты:</h1>
                {contents}
            </div>
        );
    }

    async populateWeatherData() {
        //const token = await authService.getAccessToken();
        const response = await fetch('RouteArchives');
        const array = await response.json();
        this.setState({ data: array, loading: false });
    }
}
