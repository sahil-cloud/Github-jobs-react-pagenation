import React from 'react';
import { Form , Col } from 'react-bootstrap';

export default function SearchForm({ params, onparamchange }) {
    return (
      <div className="container">
          <Form className="my-3">
        <div className="row">
              <div className="col-sm-4 col-md-4">
                <Form.Group as={Col}>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    onChange={onparamchange}
                    value={params.description}
                    name="description"
                    type="text"
                  />
                </Form.Group>
              </div>
              <div className="col-sm-4 col-md-4">
              <Form.Group as={Col}>
                <Form.Label>Location</Form.Label>
                <Form.Control
                  onChange={onparamchange}
                  value={params.location}
                  name="location"
                  type="text"
                />
              </Form.Group>
              </div>
              <div className="col-sm-4 col-md-4">

              <Form.Group as={Col} xs="auto" className="mt-5">
                <Form.Check
                  onChange={onparamchange}
                  value={params.full_time}
                  name="full_time"
                  id="full-time"
                  label="Only Full Time"
                  type="checkbox"
                />
              </Form.Group>
              </div>
        </div>
          </Form>
      </div>
    );
}
