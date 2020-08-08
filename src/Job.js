import { Card, Badge, Button, Collapse } from 'react-bootstrap';
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

export  default function Job({ job }) {

    const [open,Setopen] = useState(false);

    return (
      <Card className="my-3">
        <Card.Body>
          <div className="d-flex justify-content-between">
            <div>

              <Card.Title>
                {job.title} -
                <span className="text-muted font-weight-light">
                  {job.company}
                </span>
              </Card.Title>
              <Card.Subtitle className="text-muted mb-2">
                {new Date(job.created_at).toLocaleDateString()}
              </Card.Subtitle>
              <Button variant="info" className="mr-2">
     
                {job.type}
              </Button>
              <Button variant="secondary"> {job.location} </Button>
              <div style={{ wordBreak: 'break-all' }}>
                <span className="badge bg-success p-2 mt-2">Apply Here</span>
                <ReactMarkdown source={job.how_to_apply} />
              </div>
            </div>
          
          <img className='d-none d-md-block' height='50' src={job.company_logo} alt={job.company} />
          </div>

            <Card.Text>
                <Button
                onClick={() => Setopen(prev => !prev)}
                variant='info'
                >
                    { open ? 'Hide Details' : 'View Details' }
                </Button>
                <Collapse in={open}>
                <div className="mt-4">
                    <ReactMarkdown  source={job.description} />
                </div>
                </Collapse>
            </Card.Text>
        </Card.Body>
      </Card>
    );
}
