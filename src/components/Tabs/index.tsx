/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useCallback } from 'react';

import {
  TabsContainer,
  TabContainer,
  PanelsContainer,
  PanelContainer,
  ButtonTab,
} from './styles';

interface ITabs {
  Tab: React.FC<ITabProps>;
  Panel: React.FC<IPanelProps>;
}

interface ITabsProps {
  defaultTabName: string;
}

interface ITabProps {
  tabName: string;
}

interface IPanelProps {
  tabName: string;
}

interface ITabsContext {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const TabsContext = React.createContext<ITabsContext>({} as ITabsContext);

const Tabs: React.FC<ITabsProps> & ITabs = ({ children, defaultTabName }) => {
  const [activeTab, setActiveTab] = useState(defaultTabName);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <TabsContainer>
        <TabContainer>
          {React.Children.map(
            children,
            (child) =>
              React.isValidElement(child) && child.type === Tab && child,
          )}
        </TabContainer>

        <PanelsContainer>
          {React.Children.map(
            children,
            (child) =>
              React.isValidElement(child) && child.type === Panel && child,
          )}
        </PanelsContainer>
      </TabsContainer>
    </TabsContext.Provider>
  );
};

const Tab: React.FC<ITabProps> = ({ children, tabName }) => {
  const { setActiveTab, activeTab } = React.useContext(TabsContext);

  const selectTab = useCallback(() => {
    setActiveTab(tabName);
  }, [setActiveTab, tabName]);

  return (
    <ButtonTab
      isActive={activeTab === tabName}
      type="button"
      onClick={selectTab}
    >
      {children}
    </ButtonTab>
  );
};

const Panel: React.FC<IPanelProps> = ({ children, tabName }) => {
  const { activeTab } = React.useContext(TabsContext);
  return (
    <PanelContainer isActive={activeTab === tabName}>
      {activeTab === tabName && children}
    </PanelContainer>
  );
};

Tabs.Tab = Tab;
Tabs.Panel = Panel;

export default Tabs;
