import { Loader } from "@/components/Loader";

interface MessagingLoadingFallbackProps {
  message?: string;
}

export function MessagingLoadingFallback({
  message = "Loading messaging...",
}: MessagingLoadingFallbackProps) {
  return (
    <div className="flex h-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        <Loader />
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export function ConversationLoadingFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
        <p className="text-sm text-gray-600">Loading conversation...</p>
      </div>
    </div>
  );
}

export function MessagesLoadingFallback() {
  return (
    <div className="space-y-4 p-4">
      {/* Message skeleton placeholders */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`flex gap-3 ${i % 2 === 0 ? "justify-start" : "justify-end"}`}
        >
          {i % 2 === 0 && (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
          )}
          <div
            className={`max-w-xs animate-pulse rounded-lg px-4 py-2 ${
              i % 2 === 0 ? "bg-gray-300" : "bg-blue-300"
            }`}
          >
            <div className="h-4 rounded bg-gray-400"></div>
          </div>
          {i % 2 !== 0 && (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-300"></div>
          )}
        </div>
      ))}
    </div>
  );
}
