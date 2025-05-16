import { StatusMessage } from './StatusMessage';

export function ErrorMessage({ children }) {
    return (
        <StatusMessage type="error">
            {children}
        </StatusMessage>
    );
  }