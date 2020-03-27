import React from 'react';
import { useLocation } from 'react-router-dom';

import Dashboard from './Dashboard'

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export default function DashboardQuery ({match}) {
    const query = useQuery();
    return (
      <Dashboard query={query} summonerData={match.params} />
    );
}
