import React, { Component } from 'react';
import Filter from './Filter'
import authService from './api-authorization/AuthorizeService'

export class Test extends Component {
    static displayName = Test.name;

    constructor(props) {
        super(props);
        this.state = { data: [], loading: true, filter:''};
    }

    componentWillMount() {
        this.populateWeatherData();
    }

   
    static renderForecastsTable(data) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Наименование маршрута</th>
                        <th>Дата создания</th>
                        <th>Комментарии</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item =>
                        <tr key={item.routeArchiveId}>
                            <td>{item.routeName}</td>
                            <td>{item.dateTime}</td>
                            <td>{item.routeComment}</td>
                        </tr>
                    )}
                
                </tbody>
            </table>
        );
    }

    onHandleFilter = (value) => {
        this.setState({
            filter: value
        })
    }

    render() {
        const { data, filter } = this.state;
        const lowercasedFilter = filter.toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                typeof item[key] === 'string' && item[key].toLowerCase().includes(lowercasedFilter)
            );
        });
        let contents = this.state.loading
            ? <p><em>Загрузка...</em></p>
            : Test.renderForecastsTable(filteredData);
          return (
            <div>
                  <h1 id="tabelLabel" >Маршруты:</h1>
                  <Filter onHandleFilter={this.onHandleFilter} />
                  {contents}
                      
            </div>
        );
    }

    async populateWeatherData() {
        const token = await authService.getAccessToken();
        const response = await fetch('RouteArchives', {
            headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
        });
        const datas = await response.json();
        this.setState({ data: datas, loading: false }); 
      
    }
}
