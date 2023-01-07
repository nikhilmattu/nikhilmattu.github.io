import React, { useEffect } from "react";
import StationInfo from "./components/StationInfo";
import { StationsListWrapper, TrainWrapper } from "./components/styles";

type Props = {};

type Station = {
  id: string;
  // latitude, longitude
  location: [number, number];
  name: string;
  stops: any;
  // 410: [40.84848, -73.911794];
  //   };
};

// master station list https://raw.githubusercontent.com/jonthornton/MTAPI/master/data/stations.json

const Train: React.FC<Props> = () => {
  const [userLocation, setUserLocation] =
    React.useState<GeolocationCoordinates>();
  const [stationsList, setStationsList] = React.useState<Station[]>();
  const [numVisibleStations, setNumVisibleStations] = React.useState<number>(5);
  const [selectedStation, setSelectedStation] = React.useState("");

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      (position) => setUserLocation(position.coords),
      console.log
    );
  }, []);

  useEffect(() => {
    if (userLocation) {
      fetch(
        "https://raw.githubusercontent.com/jonthornton/MTAPI/master/data/stations.json"
      ).then((resp) =>
        resp.json().then((stations) => {
          const stationsList = Object.keys(stations).map((key) => {
            return stations[key];
          });

          const uLatitude = userLocation?.latitude || 0;
          const uLongitude = userLocation?.longitude || 0;

          const stationsByDistanceToUser = stationsList.sort((a, b) => {
            const aLatitude = a.location[0];
            const aLongitude = a.location[1];

            const aHypotenuse = Math.sqrt(
              Math.pow(Math.abs(uLatitude - aLatitude), 2) +
                Math.pow(Math.abs(uLongitude - aLongitude), 2)
            );

            const bLatitude = b.location[0];
            const bLongitude = b.location[1];
            const bHypotenuse = Math.sqrt(
              Math.pow(Math.abs(uLatitude - bLatitude), 2) +
                Math.pow(Math.abs(uLongitude - bLongitude), 2)
            );

            return aHypotenuse - bHypotenuse;
          });

          setStationsList(stationsByDistanceToUser);
        })
      );
    }
  }, [userLocation]);

  const stationElements = () => {
    const visibleStations = stationsList?.slice(0, numVisibleStations);

    return visibleStations?.map((station) => {
      return (
        <button key={station.id} onClick={() => setSelectedStation(station.id)}>
          {station.name}
        </button>
      );
    });
  };
  return (
    <div>
      <div>When is the next train?</div>
      <button
        onClick={() => {
          // make sure we don't go past the max num of stations
          // slice should handle this fine though
          setNumVisibleStations(numVisibleStations + 5);
        }}
      >
        Show more trains
      </button>
      <TrainWrapper>
        <StationsListWrapper>{stationElements()}</StationsListWrapper>
        <StationInfo id={selectedStation} />
      </TrainWrapper>
    </div>
  );
};

export default Train;
