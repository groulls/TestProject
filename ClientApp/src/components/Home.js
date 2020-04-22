import React, { Component } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './css/Home.css';
import Form from './InputBox';
import Button from './Button';

const mapState = {
    center: [55.831903, 37.411961],
    zoom: 10, // - МУРОМ 55.575, 42.0426
};

// Параметры маршрута
var routeTitle = "Маршрут";
var routeColor = "#359BEE";
var routeWidth = 6;
var routeLength = 0;
var routeRatio = 5.4;
var routePrice = 0;

var midPointsUnchecked = "islands#darkGreenCircleIcon";
var midPointsChecked = "islands#darkGreenCircleDotIcon";

const placeMark = {
    properties: {
        hintContent: "Троицкий монастырь",
        balloonContent: "Метка",
    },
};

const geoplace = [
    "площадь Крестьянина, 3А, Муром",
    "Первомайская ул., 6, Муром",
    "Московская ул., 13, Муром",
];

const hintContent = [
    "Троицкий монастырь",
    "Художественная галлерея",
    "Историко художественный музей",
];

const COORDS = [
    [55.831903, 37.411961],
    [55.763338, 37.565466],
    [55.763338, 37.565466],
    [55.744522, 37.616378],
    [55.780898, 37.642889],
    [55.793559, 37.435983],
    [55.800584, 37.675638],
    [55.716733, 37.589988],
    [55.775724, 37.56084],
    [55.71677, 37.482338],
];

var routeMidPoints = {
    "Троицкий монастырь": [55.831903, 37.411961],
    "Художественная галлерея": [55.763338, 37.565466],
    "Историко художественный музей": [55.775724, 37.56084],
};

const mapRef = React.createRef();

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: [],
            dates: {}
        }
    };
   

    setYmaps = (ymaps) => {
        this.setState({ ymaps });
    };

    geocode(ymaps) {
        geoplace.map((geo, index) => {
            const temp = ymaps.geocode(geo);
            temp.then((result) =>
                this.setState({
                    coordinates: result.GeoObject.get(0).geometry.getCoordinates(),
                })
            );
        });
    }

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

            // Создание и добавление на карту коллекции транзитных точек
            var routeMidPointsCollection = new ymaps.GeoObjectCollection(null, {
                preset: midPointsUnchecked,
                draggable: false,
            });
            for (var item in routeMidPoints) {
                routeMidPointsCollection.add(
                    new ymaps.Placemark(routeMidPoints[item], { hintContent: item })
                );
            }
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
                        for (item in routeMidPoints) {
                            if (currentPointCoords == routeMidPoints[item]) {
                                polyline.geometry.insert(
                                    polyline.geometry.getLength(),
                                    currentPointCoords
                                );
                                routeChildPoint.innerHTML = item;
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

                        for (item in routeMidPoints) {
                            if (currentPointCoords == routeMidPoints[item]) {
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
           dates:data
       })
        console.log("setNewDATA");
        console.log("Параметр функции",data);
        console.log("Текущий стейт",this.state.dates);
    }

    buttonClickHandler =()=> {
        console.log("Медот Buttonclick", this.state.dates);
        fetch("RouteArchives", {
            method: 'POST',
            body: this.state.dates,
        }).then((response) => response.json())
            .then((responseJson) => {
                this.props.history.push("RouteArchives");
            })
    }
    render() {
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
                    <div className="route">

                    </div>
                
                </div>
                {console.log("Метод return",this.state.dates)}
                <Form setNewData={this.setNewData} />
                <button onClick={this.buttonClickHandler}>Сохранить маршрут</button> 
                {/*<Button buttonClickHandler={this.buttonClickHandler}/>*/}

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
                            {/* {console.log(this.state.coordinates)} */}

                            {/* <Placemark geometry={this.state.coordinates} {...placeMark} modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}/> */}

                            {/* {!this.state.coordinates?
                                              this.state.coordinates.map((coord,index)=><Placemark key = {index} geometry = {coord}/>)
                                              :null
                                              }  */}

                            {/* {COORDS.map((coord,index)=>
                                                  <Placemark key = {index} geometry = {coord}/>
                                              )}    */}

                    </YMaps>
                </div>
            </div>
        );
    }
}