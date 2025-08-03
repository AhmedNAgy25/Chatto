import React from "react";

function MessageSkeleton() {
  return (
    <div className="space-y-3 sm:space-y-4">
      {Array(3)
        .fill(null)
        .map((_, idx) => (
          <div key={idx} className="flex justify-start">
            <div className="max-w-[85%] sm:max-w-xs lg:max-w-md">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
    </div>
  );
}

export default MessageSkeleton;
