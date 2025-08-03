import { Users } from "lucide-react";

const SidebarSkeleton = () => {
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside
      className="h-full w-80 lg:w-72 border-r border-base-300 
    flex flex-col transition-all duration-200 bg-base-100"
    >
      <div className="border-b border-base-300 w-full p-4 lg:p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium">Contacts</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full py-3 flex-1">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="w-full p-3 flex items-center gap-3">
            <div className="relative flex-shrink-0">
              <div className="skeleton size-12 rounded-full" />
            </div>

            <div className="text-left min-w-0 flex-1">
              <div className="skeleton h-4 w-32 mb-2" />
              <div className="skeleton h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
