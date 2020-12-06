import React, { useCallback } from "react";
import { getCurrentDayFromDate } from "../util/dateUtils";
import ChatBubble from "../components/ChatScreen/ChatBubble";
import ChatTime from "../components/ChatScreen/ChatTime";

const useConversationBody = (user, messageMap, selectedContact) => {
  const getConversationBody = useCallback(() => {
    const items = [];
    const selectedMessages = messageMap.get(selectedContact.id);

    if (selectedMessages) {
      let currentDay = null;
      selectedMessages.forEach((item, index) => {
        if (!currentDay) currentDay = item.timestamp;

        if (
          getCurrentDayFromDate(item.timestamp) !==
          getCurrentDayFromDate(currentDay)
        ) {
          items.push(
            <ChatTime key={"chattime" + item.id} timestamp={currentDay} />
          );
          currentDay = item.timestamp;
        }

        items.push(
          <ChatBubble
            key={"message" + item.id}
            content={item.content}
            me={item.sender.id === user.id}
            timestamp={item.timestamp}
            status={item.status}
          />
        );

        if (index === selectedMessages.length - 1) {
          items.push(<ChatTime key={currentDay} timestamp={currentDay} />);
        }
      });
    }

    return items;
  }, [messageMap, selectedContact.id, user.id]);

  return getConversationBody;
};

export default useConversationBody;
