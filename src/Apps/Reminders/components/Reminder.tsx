import React from "react";

type Props = { item: string; remove: () => void };

const Reminder: React.FC<Props> = ({ item, remove }) => {
  const [isToggled, setIsToggled] = React.useState<string>();

  return (
    <div>
      <input
        type="checkbox"
        value={isToggled}
        onChange={(e) => setIsToggled(e.target.value)}
      ></input>
      {item}
      <button onClick={() => remove()}>x</button>
    </div>
  );
};

export default Reminder;
