import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';


interface ErrorMessageProps {
    message: string | FetchBaseQueryError | SerializedError;
}

const isSerializedError = (error: any): error is SerializedError => {
    return 'message' in error;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
    const getErrorMessage = (msg: ErrorMessageProps['message']): string => {
        if (typeof msg === 'string') return msg;
        if (isSerializedError(msg)) return msg.message ?? 'An error occurred';
        if ('data' in msg) {
            return typeof msg.data === 'string' ? msg.data : 'An error occurred';
        }
        return 'An error occurred';
    };

    return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{getErrorMessage(message)}</span>
        </div>
    );
};

export default ErrorMessage;