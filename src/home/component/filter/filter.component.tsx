import React from "react";
import { Form, FormControl, InputGroup, Button } from 'react-bootstrap';
import { debounce } from 'lodash'
import { FaSearch } from 'react-icons/fa';

import './filter.component.scss';

export interface FilterOutput {
  filterType: 'gender' | 'keyword' | 'reset';
  value: any;
}

type FilterProps = {
  filterOutput: any
}

export default class FilterComponent extends React.Component<FilterProps, {}>  {

  state = {
    selectedGender: '',
    keyword: ''
  }
  delayedCallback: any;

  onSelectGender = (e: any) => {
    this.setState({selectedGender: e.target.value});
    this.props.filterOutput({filterType: 'gender', value: e.target.value});
  }

  onClickReset = () => {
    this.setState({selectedGender: '', keyword: ''});
    this.props.filterOutput({filterType: 'reset', value: null});
  }

  onClickSearch = () => {
    const { keyword } = this.state;
    if (!keyword) return;
    this.props.filterOutput({filterType: 'keyword', value: keyword});
  }

  typeSearch = (e: any) => {
    e.preventDefault();
    const getValue = e.target.value;
    this.setState({keyword: getValue});

    this.delayedCallback(e);
  };

  componentDidMount() {
    this.delayedCallback = debounce((e) => {
      this.props.filterOutput({filterType: 'keyword', value: this.state.keyword});
    }, 500)
  }

  render() {
    return (
      <div className="filterWrapper">
        <div className="searchSection">
          <div>Search</div>
          <InputGroup>
            <FormControl placeholder="Search..." onChange={this.typeSearch} value={this.state.keyword}/>
            <Button variant="primary" onClick={this.onClickSearch}><FaSearch/></Button>
          </InputGroup>
        </div>
        <div className="dropdownSection">
          <div>Gender</div>
          <Form.Select onChange={(e) => this.onSelectGender(e)} value={this.state.selectedGender}>
            <option value="">All</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Form.Select>
        </div>
        <div className="resetSection">
          <div>a</div>
          <Button variant="outline-primary" onClick={this.onClickReset}>Reset Filter</Button>
        </div>
        <hr />
      </div>
    )
  }

}  