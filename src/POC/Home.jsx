import ChatPanel from "./ChatPanel";
import ChatWindow from "./ChatWindow";

function Home() {
  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-[#f6f5ff] to-[#f0efff]">
      {/* Sidebar with subtle shadow */}
      <div className="w-[300px] bg-white/95 border-r border-[#e0e7ff] shadow-sm">
        <ChatPanel />
      </div>

      {/* Main chat area with delicate texture */}
      <div 
        className="flex-1 flex flex-col"
        style={{
          backgroundImage: 'radial-gradient(at top right, #e9d5ff20 0%, transparent 24%)',
          backgroundColor: '#f9f9ff'
        }}
      >
        <ChatWindow />
      </div>
    </div>
  );
}

export default Home;