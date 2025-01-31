import { Form, FloatingLabel } from 'react-bootstrap'

type ReviewsFilterProps = {
  handleCheckboxChange: (e: { target: { checked: any } }) => void
  handleStarsFilter: (e: any) => void
}

export default function ReviewsFilter({
  handleCheckboxChange,
  handleStarsFilter,
}: ReviewsFilterProps) {
  return (
    <div className="filter-reviews">
      <Form className="w-25">
        <Form.Check
          onChange={handleCheckboxChange}
          type="checkbox"
          label="Sort by oldest review"
        />
        <FloatingLabel label="Filter by stars">
          <Form.Select name="rating" onChange={handleStarsFilter}>
            <option value="All">All</option>
            <option value="5">Five</option>
            <option value="4">Four</option>
            <option value="3">Three</option>
            <option value="2">Two</option>
            <option value="1">One</option>
            <option value="0">Zero</option>
          </Form.Select>
        </FloatingLabel>
      </Form>
    </div>
  )
}
