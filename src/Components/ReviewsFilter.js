import React from 'react'
import { Form, Col, FloatingLabel } from 'react-bootstrap'


export default function ReviewsFilter({handleCheckboxChange, handleStartsFilter}) {
  return (
    <div className='filter-reviews'>
      <Form>
        <Col xs={2}>
        <Form.Check 
          onChange={handleCheckboxChange}
          type='checkbox'
          label='Sort by first review'  
        />
        <FloatingLabel label='Filter by starts'>
          <Form.Select name="rating" onChange={handleStartsFilter}>
            <option value='All'>All</option>
            <option value="5">Five</option>
            <option value="4">Four</option>
            <option value="3">Three</option>
            <option value="2">Two</option>
            <option value="1">One</option>
            <option value="0">Zero</option>
          </Form.Select>
        </FloatingLabel>
        </Col>
      </Form>
    </div>
    )
}