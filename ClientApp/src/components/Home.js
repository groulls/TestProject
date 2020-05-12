import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './css/Home.css';
import Form from './InputBox';
import Button from './Button';

const mapState = {
    center: [55.575, 42.0426],
    zoom: 14, // - МУРОМ 55.575, 42.0426 //  - Москва 55.831903, 37.411961
};

// Параметры маршрута
var routeTitle = "Маршрут";
var routeColor = "#359BEE";
var routeWidth = 6;
var routeLength = 0;

var midPointsUnchecked = "islands#darkGreenCircleIcon";
var midPointsChecked = "islands#darkGreenCircleDotIcon";


const mapRef = React.createRef();

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            COORD: {},
            loading: false
        }
       
    };
   
    //Функция для получения координат по наименованию или адресу объекта
    
    //geocode(ymaps) {
    //    geoplace.map((geo, index) => {
    //        const temp = ymaps.geocode(geo);
    //        temp.then((result) =>
    //            this.setState({
    //                coordinates: result.GeoObject.get(0).geometry.getCoordinates(),
    //            })
    //        );
    //    });
    //}

    getPoints = (ymaps) => {
        if (mapRef && mapRef.current) {
            var polyline = new ymaps.Polyline(
                [],
                {
                    hintContent: routeTitle,
                },
                {
                    draggable: false,
                    strokeColor: routeColor,
                    strokeWidth: routeWidth,
                }
            );
            mapRef.current.geoObjects.add(polyline);
            var COORDS = this.state.COORD
            {/*const cordsArray = COORDS.map((coords, index) => [coords.coordX, coords.coordY])
            console.log(cordsArray)*/}
            // Создание и добавление на карту коллекции транзитных точек
            var routeMidPointsCollection = new ymaps.GeoObjectCollection(null, {
                preset: midPointsUnchecked,
                draggable: false,
            });
            for (var item in COORDS) {
                const i = COORDS[item];
                routeMidPointsCollection.add(
                    new ymaps.Placemark([i.coordX, i.coordY], { hintContent: i.name })
                );
            }
            {/*COORDS.map((coords,index) => { routeMidPointsCollection.add(new ymaps.Placemark( [coords.coordX, coords.coordY], { hintContent: coords.name })) })*/ }
            
            mapRef.current.geoObjects.add(routeMidPointsCollection);

            // Работа с конечными точками при создании маршрута
            routeMidPointsCollection.events.add("click", function (e) {
         
                var currentPoint = e.get("target").options.get("preset");
                var currentPointCoords = e.get("target").geometry._coordinates;
                var routePoints = document.getElementById("routePoint");
                var routeChildPoint = document.createElement("li");
               
                // Если точка была выделена при клике
                if (
                    typeof currentPoint === "undefined" ||
                    currentPoint === midPointsUnchecked
                ) {
                    e.get("target").options.set("preset", midPointsChecked);

                    // Добавление координат кликнутой конечной точки в полилинию, а её подписи - в список routePoints
                    //// Точка не будет дублироваться в маршруте, если она совпадает с предыдущей
                    if (
                        polyline.geometry.get(polyline.geometry.getLength() - 1) !==
                        currentPointCoords
                    ) {
                        for (var item in COORDS) {
                            const i = COORDS[item]
                            const constArray = [i.coordX, i.coordY]
                            if (JSON.stringify(currentPointCoords[1]) == JSON.stringify(constArray[1])) {
                                polyline.geometry.insert(
                                    polyline.geometry.getLength(),
                                    currentPointCoords
                                );
                                routeChildPoint.innerHTML = i.name;
                                routePoints.appendChild(routeChildPoint);
                                createRoute();

                                if (polyline.geometry.getLength() >= 2) {
                                    outputRoute();
                                }
                            }
                        }
                    }
                } else {
                    if (
                        polyline.geometry.get(polyline.geometry.getLength() - 1) ===
                        currentPointCoords
                    ) {
                        e.get("target").options.set("preset", midPointsUnchecked);

                        for (var item in COORDS) {
                            const i = COORDS[item]
                            const constArray = [i.coordX, i.coordY]
                            if (JSON.stringify(currentPointCoords[1]) == JSON.stringify(constArray[1])) {
                                // Удаление кликнутой конечной точки из полилинии
                                polyline.geometry.remove(polyline.geometry.getLength() - 1);
                                routePoints.removeChild(routePoints.lastChild);
                                createRoute();
                                if (polyline.geometry.getLength() >= 2) {
                                    outputRoute();
                                } else {
                                    routeLength = 0;
                                }
                            }
                        }
                    }
                }
            });
        }
        function createRoute() {
            routeLength = Math.ceil(polyline.geometry.getDistance() / 1000);
        }
        function outputRoute() {
            document.getElementById("output").innerHTML =
                "Расстояние: " + routeLength + "км.";
        }
    };

    setNewData = (data) => {
       this.setState({
           data:data
       })
    }

    async buttonClickHandler() {
      
        await fetch("RouteArchives", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.data)
        }).then((response) => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                response.json();
            } else { alert('False') }
        } )
            //.then((responseJson) => {
            //    this.props.history.push("RouteArchive");
            //})
    }
 
    async getData() {
        const response = await fetch('Coordinates');
        const coordinates = await response.json();
        this.setState({ COORD: coordinates, loading: true});
    }

    componentDidMount() {
        this.getData();
    }
    

    render() {

        const isLoggedIn = this.state.data;
        let button;
       
        if (isLoggedIn.userId) {
            button = <button className="btn" onClick={() => this.buttonClickHandler()}>Сохранить маршрут</button>
        } else {
            button = <button className="btn" disabled>Сохранить маршрут</button>
        }

      
        return (
            <div className="base_container">
                <div className="content">
                    <p>
                        Точки маршрута:
                          <ul id="routePoint"></ul>
                    </p>
                    <div className="length">
                        <p id="output"></p>
                    </div>
                    <Form setNewData={this.setNewData} />
                                                           
                        {button}
                        <button className="btn"  onClick={() => window.print()}>Печать</button>
                    
                </div>

                {/*<Button buttonClickHandler={this.buttonClickHandler}/>*/}
                {this.state.loading ?
                    <div className="Mappy">
                        {/* Можно прописать load: "package.full" */}
                        <YMaps
                            query={{ apikey: "3f58a461-1a1f-4db4-9ba3-68828018a98d" }}
                            version={"2.1"}
                        >
                            <Map
                                defaultState={mapState}
                                instanceRef={mapRef}
                                onLoad={(ymaps) => this.getPoints(ymaps)}
                                modules={[
                                    "GeoObjectCollection",
                                    "Placemark",
                                    "Polyline",
                                    "geoObject.addon.balloon",
                                    "geoObject.addon.hint",
                                ]}
                                width={650}
                                height={1000}
                            />
                        </YMaps>
                    </div>
                    : <p>Загрузка....</p>}
            </div>
        );
    }
}