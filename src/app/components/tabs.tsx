import { useState } from 'react';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('Trends');

  const tabs: string[] = ['Trends', 'Frontend', 'Backend', 'Cloud', 'AI', 'Tools'];

  return (
    <div className="flex justify-center space-x-4 py-4">
      {tabs.map((tab: string) => (
        <button
          key={tab}
          className={`px-4 py-2 rounded-md ${activeTab === tab ? 'bg-gray-300' : 'bg-gray-100'}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;