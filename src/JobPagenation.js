import React from 'react'
import { Pagination } from 'react-bootstrap';

export default function JobPagenation({ page,setpage,hasnextpage }) {

    const helpFn = (amount) => {
        setpage(prev =>  prev + amount );
    } 

    return (
      <Pagination>
        {page !== 1 && <Pagination.Prev onClick={() => helpFn(-1)} />}
        {page !== 1 && (
          <Pagination.Item onClick={() => setpage(1)}>1</Pagination.Item>
        )}
        {page > 2 && <Pagination.Ellipsis />}
        {page > 2 && (
          <Pagination.Item onClick={() => helpFn(-1)}>
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{page}</Pagination.Item>
        {hasnextpage && <Pagination.Item onClick={() => helpFn(1)}>{page + 1}</Pagination.Item>}
        {hasnextpage && <Pagination.Next onClick={() => helpFn(1)} />}
      </Pagination>
    );
}
