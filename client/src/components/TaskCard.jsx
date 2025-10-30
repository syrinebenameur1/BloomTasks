export default function TaskCard({ task, onEdit, onDelete }) {
    const getPriorityColor = (priority) => {
      switch (priority) {
        case "High": return "from-rose-500 to-pink-600";
        case "Medium": return "from-amber-500 to-orange-500";
        case "Low": return "from-emerald-400 to-green-500";
        default: return "from-gray-400 to-gray-500";
      }
    };
  
    const getStatusColor = (status) => {
      switch (status) {
        case "Done": return "bg-gradient-to-r from-emerald-500 to-green-500";
        case "In Progress": return "bg-gradient-to-r from-amber-500 to-orange-500";
        default: return "bg-gradient-to-r from-gray-400 to-gray-500";
      }
    };
  
    const getStatusIcon = (status) => {
      switch (status) {
        case "Done": return "✅";
        case "In Progress": return "🔄";
        default: return "📝";
      }
    };
  
    return (
      <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:transform hover:-translate-y-1">
        {/* Priority Indicator */}
        <div className={`h-2 bg-gradient-to-r ${getPriorityColor(task.priority)} rounded-t-2xl`}></div>
        
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-lg text-gray-900 pr-2">{task.title}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getStatusColor(task.status)} flex items-center space-x-1`}>
              <span>{getStatusIcon(task.status)}</span>
              <span>{task.status}</span>
            </span>
          </div>
  
          {/* Description */}
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{task.description}</p>
          </div>
  
          {/* Footer */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${getPriorityColor(task.priority)} text-white`}>
                {task.priority} Priority
              </span>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={onEdit}
                className="w-8 h-8 flex items-center justify-center bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-100 transition-colors duration-200"
                title="Edit task"
              >
                ✏️
              </button>
              <button 
                onClick={onDelete}
                className="w-8 h-8 flex items-center justify-center bg-rose-50 text-rose-600 rounded-lg hover:bg-rose-100 transition-colors duration-200"
                title="Delete task"
              >
                🗑️
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }