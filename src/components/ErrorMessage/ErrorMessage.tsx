interface ErrorMessageProps {
    message: string;
}

const ErrorMessage = ({message}: ErrorMessageProps) => (
    <div class="p-4 bg-red-100 text-red-600 border border-red-400 rounded-lg">
        {message}
    </div>
)

export default ErrorMessage;