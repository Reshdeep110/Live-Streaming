import React, { useState } from 'react';

function StreamSyncApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [messages, setMessages] = useState([
    { user: 'BenTheSupporter', text: 'Love this game! What level are you trying, new?', priority: true },
    { user: 'LogoISubscriber', text: 'Thanks for the content!', priority: false },
    { user: 'GamePro23', text: 'The graphics in this game are amazing!', priority: false },
    { user: 'TechEnthusiast', text: 'What specs are you running this on?', priority: true },
    { user: 'Smartmap', text: 'Welcome to all the new viewers! Don\'t forget to follow!', priority: false }
  ]);
  const [chatFilter, setChatFilter] = useState('all');
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      setMessages([...messages, { user: 'You', text: messageText, priority: false }]);
      setMessageText('');
    }
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'dashboard':
        return <Dashboard messages={messages} chatFilter={chatFilter} setChatFilter={setChatFilter} 
                messageText={messageText} setMessageText={setMessageText} handleSendMessage={handleSendMessage} />;
      case 'moderation':
        return <ModerationSettings />;
      case 'viewer':
        return <ViewerExperience />;
      case 'schedule':
        return <Schedule />;
      default:
        return <Dashboard messages={messages} chatFilter={chatFilter} setChatFilter={setChatFilter} 
                messageText={messageText} setMessageText={setMessageText} handleSendMessage={handleSendMessage} />;
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <div className="logo-icon"><img src='https://static1.squarespace.com/static/66ec7fa7e48a035a726192df/t/67ca3cb256ab0525c9b26d20/1741307058413/Icon-300x200-with-bg.png?format=1500w' alt="logo"/></div>
          <h1>StreamSync</h1>
        </div>
      </header>
      <div className="app-body">
        <nav className="sidebar">
          <ul>
            <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
              <span className="nav-icon">📊</span>
              <span>Dashboard</span>
            </li>
            <li className={activeTab === 'moderation' ? 'active' : ''} onClick={() => setActiveTab('moderation')}>
              <span className="nav-icon">🛡️</span>
              <span>Moderation</span>
            </li>
            <li className={activeTab === 'viewer' ? 'active' : ''} onClick={() => setActiveTab('viewer')}>
              <span className="nav-icon">👁️</span>
              <span>Viewer Experience</span>
            </li>
            <li className={activeTab === 'schedule' ? 'active' : ''} onClick={() => setActiveTab('schedule')}>
              <span className="nav-icon">📅</span>
              <span>Schedule</span>
            </li>
          </ul>
        </nav>
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function Dashboard({ messages, chatFilter, setChatFilter, messageText, setMessageText, handleSendMessage }) {
  const filteredMessages = chatFilter === 'priority' 
    ? messages.filter(msg => msg.priority) 
    : messages;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Creator Dashboard</h2>
        <div className="stream-preview">
          <h3>Live Stream Preview</h3>
          <div className="preview-box">
            <h4>Tech Talk with Maya - Episode #42</h4>
            <p>1:24 • 3 viewers</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="moderation-actions">
          <h3>Quick Moderation Actions</h3>
          <div className="action-cards">
            <div className="action-card">
              <h4>Auto-Mod Filters</h4>
              <p>Blocked 12 messages in the last hour</p>
            </div>
            <div className="action-card">
              <h4>Banned Words</h4>
              <p>5 active word filters</p>
            </div>
            <div className="action-card">
              <h4>Timeout</h4>
              <p>2 users timed out this stream</p>
            </div>
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <h3>Chat</h3>
            <div className="chat-filter">
              <button 
                className={chatFilter === 'all' ? 'active' : ''} 
                onClick={() => setChatFilter('all')}
              >
                All
              </button>
              <button 
                className={chatFilter === 'priority' ? 'active' : ''} 
                onClick={() => setChatFilter('priority')}
              >
                Priority
              </button>
            </div>
          </div>

          <div className="priority-hub">
            <h4>Priority Hub</h4>
          </div>

          <div className="chat-messages">
            {filteredMessages.map((msg, index) => (
              <div key={index} className={`message ${msg.priority ? 'priority' : ''}`}>
                <strong>{msg.user}:</strong> {msg.text}
              </div>
            ))}
          </div>

          <div className="message-input">
            <input 
              type="text" 
              placeholder="Send a message" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className="wave-button">Wave</button>
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModerationSettings() {
  const [autoModSettings, setAutoModSettings] = useState({
    offensiveLanguage: true,
    filterSpam: true,
    holdFirstTime: true,
    chatStats: false,
    peakActivity: true,
    engagementRate: true
  });
  
  const [blockedTerms, setBlockedTerms] = useState(['offensive term', 'spam phrase']);
  const [newBlockedTerm, setNewBlockedTerm] = useState('');
  
  const [moderators, setModerators] = useState(['StreamFan09', 'TechEnthusiast']);
  const [newModerator, setNewModerator] = useState('');

  const handleAutoModChange = (setting) => {
    setAutoModSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const addBlockedTerm = () => {
    if (newBlockedTerm.trim() && !blockedTerms.includes(newBlockedTerm)) {
      setBlockedTerms([...blockedTerms, newBlockedTerm]);
      setNewBlockedTerm('');
    }
  };

  const removeBlockedTerm = (term) => {
    setBlockedTerms(blockedTerms.filter(t => t !== term));
  };

  const addModerator = () => {
    if (newModerator.trim() && !moderators.includes(newModerator)) {
      setModerators([...moderators, newModerator]);
      setNewModerator('');
    }
  };

  const removeModerator = (mod) => {
    setModerators(moderators.filter(m => m !== mod));
  };

  return (
    <div className="moderation-settings full-screen-section">
      <h2>Moderation Settings</h2>
      
      <div className="settings-grid">
        <div className="settings-section">
          <h3>Auto-Moderation</h3>
          <div className="check-options">
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.offensiveLanguage}
                onChange={() => handleAutoModChange('offensiveLanguage')}
              />
              Block offensive language
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.filterSpam}
                onChange={() => handleAutoModChange('filterSpam')}
              />
              Filter spam
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.holdFirstTime}
                onChange={() => handleAutoModChange('holdFirstTime')}
              />
              Hold First-time chatters
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Blocked Terms</h3>
          <p>Add words or phrases to automatically block:</p>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Add a blocked term" 
              value={newBlockedTerm}
              onChange={(e) => setNewBlockedTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addBlockedTerm()}
            />
            <button onClick={addBlockedTerm}>Add</button>
          </div>
          <div className="tags-container">
            {blockedTerms.map((term, index) => (
              <span key={index} className="term-tag" onClick={() => removeBlockedTerm(term)}>
                {term} ×
              </span>
            ))}
          </div>
        </div>

        <div className="settings-section">
          <h3>Moderators</h3>
          <p>Manage your chat moderators:</p>
          <div className="input-group">
            <input 
              type="text" 
              placeholder="Add moderator by username" 
              value={newModerator}
              onChange={(e) => setNewModerator(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addModerator()}
            />
            <button onClick={addModerator}>Add</button>
          </div>
          <div className="tags-container">
            {moderators.map((mod, index) => (
              <span key={index} className="moderator-tag" onClick={() => removeModerator(mod)}>
                {mod} ×
              </span>
            ))}
          </div>
        </div>

        <div className="settings-section analytics-section">
          <h3>Chat Analytics</h3>
          <p>View insights about chat activity and engagement:</p>
          <div className="check-options">
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.chatStats}
                onChange={() => handleAutoModChange('chatStats')}
              />
              Chat Stats
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.peakActivity}
                onChange={() => handleAutoModChange('peakActivity')}
              />
              Peak Activity
            </label>
            <label>
              <input 
                type="checkbox" 
                checked={autoModSettings.engagementRate}
                onChange={() => handleAutoModChange('engagementRate')}
              />
              Engagement rate
            </label>
          </div>

          {autoModSettings.chatStats && (
            <div className="analytics-data">
              <div className="data-row">
                <div className="data-item">
                  <h4>Total Messages</h4>
                  <p>1,243</p>
                </div>
                <div className="data-item">
                  <h4>Most Active At</h4>
                  <p>8:15 PM</p>
                </div>
              </div>
              <div className="data-row">
                <div className="data-item">
                  <h4>Active Chatters</h4>
                  <p>327</p>
                </div>
                <div className="data-item">
                  <h4>During</h4>
                  <p>Gameplay reveal</p>
                </div>
              </div>
              <div className="data-row">
                <div className="data-item">
                  <h4>Avg. Messages per User</h4>
                  <p>3.8</p>
                </div>
              </div>
            </div>
          )}

          <div className="engagement-meter">
            <h4>75% of viewers engaged with chat</h4>
            <div className="meter-bar">
              <div className="meter-fill" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewerExperience() {
  const [desktopEnabled, setDesktopEnabled] = useState(true);
  const [mobileEnabled, setMobileEnabled] = useState(true);
  const [channelPointsEnabled, setChannelPointsEnabled] = useState(true);
  
  const [channelPoints, setChannelPoints] = useState([
    { earn: 'Watching (per 5 min)', points: '10 points', redeem: 'Highlight Message', cost: '150 points' },
    { earn: 'Subscribing', points: '300 points', redeem: 'Choose Background Music', cost: '300 points' },
    { earn: 'Sending a Wave', points: '5 points', redeem: 'Request a Game', cost: '500 points' }
  ]);
  
  const [recentRedemptions, setRecentRedemptions] = useState([
    'BentTheSupporter', 'StreamFan99'
  ]);

  const [newRedemption, setNewRedemption] = useState('');

  const addRedemption = () => {
    if (newRedemption.trim() && !recentRedemptions.includes(newRedemption)) {
      setRecentRedemptions([newRedemption, ...recentRedemptions.slice(0, 1)]);
      setNewRedemption('');
    }
  };

  return (
    <div className="viewer-experience full-screen-section">
      <h2>Viewer Experience</h2>
      
      <div className="experience-grid">
        <div className="experience-section">
          <label className="toggle-option">
            <input 
              type="checkbox" 
              checked={desktopEnabled}
              onChange={() => setDesktopEnabled(!desktopEnabled)}
            />
            <span className="toggle-label">Desktop Experience</span>
          </label>
          {desktopEnabled && (
            <>
              <p>Viewers on desktop can enjoy the full StreamSync experience:</p>
              <ul>
                <li>Priority messages highlighted in chat</li>
                <li>Wave reactions to show support without typing</li>
                <li>Customizable chat appearance</li>
                <li>Integrated channel points and rewards</li>
                <li>Polls and interactive overlays</li>
              </ul>
            </>
          )}
        </div>

        <div className="experience-section">
          <label className="toggle-option">
            <input 
              type="checkbox" 
              checked={mobileEnabled}
              onChange={() => setMobileEnabled(!mobileEnabled)}
            />
            <span className="toggle-label">Mobile Experience</span>
          </label>
          {mobileEnabled && (
            <>
              <p>StreamSync's mobile interface is optimized for on-the-go viewing:</p>
              <div className="mobile-features">
                <div className="feature-item">📱 Touch-optimized chat controls</div>
                <div className="feature-item">⚡ Fast loading on mobile networks</div>
                <div className="feature-item">🎨 Mobile-friendly interface</div>
                <div className="feature-item">📲 Easy one-tap interactions</div>
              </div>
            </>
          )}
        </div>

        <div className="experience-section points-section">
          <label className="toggle-option">
            <input 
              type="checkbox" 
              checked={channelPointsEnabled}
              onChange={() => setChannelPointsEnabled(!channelPointsEnabled)}
            />
            <span className="toggle-label">Channel Points & Rewards</span>
          </label>
          {channelPointsEnabled && (
            <>
              <p>Engage your viewers with channel points and rewards:</p>
              
              <div className="redemption-input">
                <input 
                  type="text" 
                  placeholder="Add recent redemption username"
                  value={newRedemption}
                  onChange={(e) => setNewRedemption(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addRedemption()}
                />
                <button onClick={addRedemption}>Add</button>
              </div>
              
              <div className="points-table-container">
                <table className="points-table">
                  <thead>
                    <tr>
                      <th>Earn Points</th>
                      <th>Points</th>
                      <th>Redeem Rewards</th>
                      <th>Cost</th>
                      <th>Recent Redemption</th>
                    </tr>
                  </thead>
                  <tbody>
                    {channelPoints.map((point, index) => (
                      <tr key={index}>
                        <td>{point.earn}</td>
                        <td>{point.points}</td>
                        <td>{point.redeem}</td>
                        <td>{point.cost}</td>
                        {index === 0 && (
                          <td rowSpan={channelPoints.length} className="redemption-cell">
                            {recentRedemptions.map((redemption, idx) => (
                              <div key={idx} className="redemption-user">{redemption}</div>
                            ))}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Schedule() {
  const [upcomingStreams, setUpcomingStreams] = useState([
    {
      type: 'Tech Stream',
      time: 'Tomorrow 7:00 PM',
      title: 'New JavaScript Framework Deep Dive',
      description: 'We\'ll be exploring the latest features of StreamJS and building a mini project together.'
    },
    {
      type: 'Gaming',
      time: 'Tomorrow 7:00 PM',
      title: 'CyberQuest Gameplay - Part 3',
      description: 'Continuing our adventure through the digital wasteland. Will we find the artifact?'
    },
    {
      type: 'Q & A',
      time: 'Sunday, 5:00 PM',
      title: 'Viewer Q&A Session',
      description: 'Ask me anything about development, streaming, or my favorite pizza toppings!'
    }
  ]);

  const [previousStreams, setPreviousStreams] = useState([
    {
      title: 'Tech Talk #41: Advanced CSS Techniques',
      date: 'Streamed 2 days ago • 1h 24m',
      stats: ['👀 243', '❤️ 87', '💬 32']
    },
    {
      title: 'CyberQuest Gameplay - Part 2',
      date: 'Streamed 5 days ago • 2h 12m',
      stats: ['👀 312', '❤️ 124', '💬 65']
    }
  ]);

  const [newStream, setNewStream] = useState({
    type: '',
    time: '',
    title: '',
    description: ''
  });

  const addNewStream = () => {
    if (newStream.type && newStream.time && newStream.title) {
      setUpcomingStreams([...upcomingStreams, { ...newStream }]);
      setNewStream({ type: '', time: '', title: '', description: '' });
    }
  };

  return (
    <div className="schedule full-screen-section">
      <h2>Stream Schedule</h2>
      
      <div className="schedule-content">
        <div className="add-stream-section">
          <h3>Add New Stream</h3>
          <div className="stream-form">
            <input 
              type="text" 
              placeholder="Stream Type (e.g., Gaming, Tech)"
              value={newStream.type}
              onChange={(e) => setNewStream({...newStream, type: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Stream Time"
              value={newStream.time}
              onChange={(e) => setNewStream({...newStream, time: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Stream Title"
              value={newStream.title}
              onChange={(e) => setNewStream({...newStream, title: e.target.value})}
            />
            <input 
              type="text" 
              placeholder="Stream Description"
              value={newStream.description}
              onChange={(e) => setNewStream({...newStream, description: e.target.value})}
            />
            <button onClick={addNewStream}>Add Stream</button>
          </div>
        </div>

        <div className="upcoming-section">
          <h3>Upcoming Streams</h3>
          <div className="upcoming-streams">
            {upcomingStreams.map((stream, index) => (
              <div key={index} className="stream-card">
                <div className="stream-type">{stream.type}</div>
                <p className="stream-time">{stream.time}</p>
                <p className="stream-title">{stream.title}</p>
                <p className="stream-desc">{stream.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="previous-section">
          <h3>Previous Streams</h3>
          <div className="previous-streams">
            {previousStreams.map((stream, index) => (
              <div key={index} className="previous-stream">
                <h4>{stream.title}</h4>
                <p>{stream.date}</p>
                <div className="stream-stats">
                  {stream.stats.map((stat, idx) => (
                    <span key={idx}>{stat}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StreamSyncApp;