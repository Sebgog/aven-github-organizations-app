import React, { useEffect, useState, useMemo } from 'react';
import './App.css'

const API_URL = 'https://api.github.com';


type Organization = {
  id: number;
  description: string | null;
  login: string;
  avatar_url: string;
  url: string;
};

type AugmentedOrganization = Organization & {
  selected: boolean;
};

function App() {
  const [organizations, setOrganizations] = useState<AugmentedOrganization[]>([]);

  useEffect(() => {
    fetch(`${API_URL}/organizations`)
      .then(res => res.json())
      .then((response: Organization[]) => {
        const organizations: AugmentedOrganization[] = response.map(org => ({
          ...org,
          selected: false,
        }));
        setOrganizations(organizations)
      });
  }, []);

  const handleSelectItem = (id: number) => () => {
    setOrganizations(organizations =>
      organizations.map(org => {
        if (org.id === id) {
          return {
            ...org,
            selected: !org.selected,
          };
        }

        return org;
      }));
  };

  return (
    <div className="App">
      <ul className='organizations-list'>
        {organizations.map(({ id, description, login, avatar_url, url, selected }) => (
          <li className='organization-item' key={id} onClick={handleSelectItem(id)}>
            <input type="checkbox" checked={selected} />
            <img src={avatar_url} alt="" />
            <div className='organization-item-description'>
              <div>{login}</div>
              <div>{description}</div>
              <a href={url} target="_blank">Repo</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
