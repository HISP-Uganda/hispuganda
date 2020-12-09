import React, { FC } from 'react';
import { Button, List } from 'antd';
import { QueryResult, useQuery } from 'react-query';
import { useHistory } from "react-router-dom";

import { searchConcepts } from '../api';

interface SearhProps {
  query: string
}

function useSearch(query: string) {
  return useQuery(['concepts', query], searchConcepts, {
    enabled: query
  })
}
const SearchResults: FC<SearhProps> = ({ query }) => {
  let history = useHistory();
  const { status, data, error, isFetching }: QueryResult<any, any> = useSearch(query);
  return (
    <div>
      { status === "error" ? (<span>Error: {error.message}</span>) : (
        <List
          itemLayout="horizontal"
          dataSource={data}
          loading={isFetching || status === "loading"}
          renderItem={(item: any) => (
            <List.Item actions={[<Button key="list-loadmore-edit" onClick={() => history.push(`/details/${item._source.id}`)}>Details</Button>]}>
              <List.Item.Meta
                title={item._source.id}
                description={item._source.name}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  )
}

export default SearchResults
