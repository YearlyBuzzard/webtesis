import { Check, Archive } from "react-feather";
import styled from "styled-components";
import PulsatingDot from "./PulsatingDot";
import { useNotificationCenter } from "react-toastify/addons/use-notification-center"; // Updated import for usage

const Wrapper = styled.div`
  margin-left: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  outline: none;
  background: transparent;
`;

// Note: Props validation can be done using PropTypes if required, but they're not strictly necessary.
export function ItemActions(props) {
  // Here we would use the props directly. It's assumed that they are passed correctly from the parent component.
  const { notification, markAsRead, remove } = props;

  // The rest of your component doesn't change because it's already valid JSX.
  return (
    <Wrapper>
      {notification.read ? (
        <Check color="green" />
      ) : (
        <Button
          title="Mark as read"
          onClick={() => {
            markAsRead(notification.id);
          }}
        >
          <PulsatingDot />
        </Button>
      )}
      <Button 
        onClick={() => remove(notification.id)} 
        title="Archive"
      >
        <Archive color="#666" />
      </Button>
    </Wrapper>
  );
}
