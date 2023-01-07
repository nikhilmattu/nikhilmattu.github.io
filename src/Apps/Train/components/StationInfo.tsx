import React, { useEffect } from "react";

type Props = {
  id: string;
};

// hnC289tRfc5SWA02qSwxs3ALv4tBPXXr4CQ8Ogzl
const StationInfo: React.FC<Props> = ({ id }) => {
  useEffect(() => {
    if (id) {
      fetch(`https://api.wheresthefuckingtrain.com/by-id/${id}`).then((resp) =>
        resp.json().then((train) => {
          console.log(train);
        })
      ).catch(err => {
        console.log(err)
      });
    }
  }, [id]);
  return <div>station: {id}</div>;
};

export default StationInfo;
