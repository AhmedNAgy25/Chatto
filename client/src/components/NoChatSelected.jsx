import { MessageSquare, Users } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:pt-0 pt-20">
      <div className="text-center max-w-md">
        <div className="mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
          </div>
        </div>

        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">
          Welcome to Chatto
        </h3>

        <p className="text-sm sm:text-base text-base-content/70 mb-6 sm:mb-8 leading-relaxed">
          Select a contact from the sidebar to start chatting. Your
          conversations will appear here once you begin messaging.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-sm sm:text-base">
          <div className="flex items-center gap-2 text-base-content/60">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Browse contacts</span>
          </div>
          <div className="hidden sm:block text-base-content/30">•</div>
          <div className="flex items-center gap-2 text-base-content/60">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>Start chatting</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
