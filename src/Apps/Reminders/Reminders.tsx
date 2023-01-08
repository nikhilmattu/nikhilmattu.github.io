import React from "react";
import Reminder from "./components/Reminder";

type Props = {};

const Reminders: React.FC<Props> = () => {
  const [userInput, setUserInput] = React.useState("");
  const [reminderList, setReminderList] = React.useState<string[]>([]);

  const reminders = () => {
    return reminderList.map((item, index) => {
      const reminderIndex = index;
      return (
        <Reminder
          key={index}
          item={item}
          remove={() => {
            const sanitizedList = reminderList.filter(
              (item, index) => index !== reminderIndex
            );
            setReminderList(sanitizedList);
          }}
        />
      );
    });
  };

  const addReminder = () => {
    if (reminderList.indexOf(userInput) < 0) {
      const newReminderList = [userInput, ...reminderList];
      setUserInput("");
      setReminderList(newReminderList);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && userInput.length) {
      addReminder();
    }
  };

  return (
    <div>
      Reminders
      <div>
        <input
          placeholder="Save something"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e as unknown as KeyboardEvent)}
        />
        <button onClick={() => addReminder}>✍️</button>
      </div>
      <div>{reminders()}</div>
    </div>
  );
};

export default Reminders;
