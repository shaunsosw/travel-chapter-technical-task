import { StatusMessage } from './StatusMessage';

export function WarningMessage({ children }) {
    return (
        <StatusMessage type="warning">
            {children}
        </StatusMessage>
    );
  }