import React, { useEffect } from "react";
import { decoder } from "./realtimestuff";

type Props = {
  id: string;
};

const reqURL = `https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace`;

const StationInfo: React.FC<Props> = ({ id }) => {
  decoder();
  useEffect(() => {
    if (id) {
      // request(requestSettings, function (error: any, response: any, body: any) {
      // if (!error && response.statusCode == 200) {
      fetch(reqURL, {
        headers: {
          "x-api-key": `hnC289tRfc5SWA02qSwxs3ALv4tBPXXr4CQ8Ogzl`,
        },
      }).then((resp) => {});
    }
  }, [id]);
  return <div>station: {id}</div>;
};

export default StationInfo;
