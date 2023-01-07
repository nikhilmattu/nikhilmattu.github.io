import React, { useEffect } from "react";
// const https = require("https");
// https.get(
//   "<Feed URI>",
//   { headers: { "x-api-key": '<Api Key>'}
//   },
//   (resp) => {
//     resp.on('data', (chunk) => {
//       console.log("Receiving Data");
//     });
//     resp.on('end', () => {
//       console.log("Finished receiving data");
//     });
//   }).on("error", (err) => {
//     console.log("Error: " + err.message);
//   });

type Props = {
  id: string;
};

// https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace
const reqURL = `https://api.wheresthefuckingtrain.com/by-id/82bd`;
const HEADERS = {
  "x-api-key": `hnC289tRfc5SWA02qSwxs3ALv4tBPXXr4CQ8Ogzl`,
  MTA_KEY: `hnC289tRfc5SWA02qSwxs3ALv4tBPXXr4CQ8Ogzl`,
};
const StationInfo: React.FC<Props> = ({ id }) => {
  useEffect(() => {
    if (id) {
      fetch(reqURL, {
        mode: "no-cors",
        headers: {
          ...HEADERS,
        },
      })
        .then((resp) => {
          console.log(resp);
          resp.json().then((train) => {
            console.log(train);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);
  return <div>station: {id}</div>;
};

export default StationInfo;
