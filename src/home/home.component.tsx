import { Component } from "react";
import FilterComponent, { FilterOutput } from "./component/filter/filter.component";
import { Table, Pagination } from 'react-bootstrap';
import { FaCaretUp, FaCaretDown} from "react-icons/fa";
import ApiService from "./service/api.service";
import './home.component.scss';
import LoadingSpinner from "./component/loader/loader";


export default class HomeComponent extends Component {

  apiService = new ApiService();
  state = {
    listUser: [],
    isLoading: false
  };
  searchKeyword = '';
  gender = '';
  order  = {column: '', type: ''};
  activePage = 1;

  get generatePaginationItem() {
    let totalData  = this.state.listUser.length;
    let rowPerPage = 5;
    let totalPagination = totalData / rowPerPage;
    let items = [];

    const onPaginate = (number: number) => {
      this.activePage = number;
      this.loadData();
    };

    for (let number = 1; number <= totalPagination; number++) {
      items.push(
        <Pagination.Item key={number} active={number === this.activePage} onClick={() => onPaginate(number)}>
          {number}
        </Pagination.Item>,
      );
    }

    return items;
  }

  onOrder = (column: string, type: string) => {
    this.order.column = column;
    this.order.type   = type;

    this.loadData();
  }

  setStyleOrder = (column: string, type: string) => {
    return this.order.column === column && this.order.type === type? { color: "#0d6efd" } : {};
  }

  loadData() {
    this.setState({isLoading: true});
    const generateParam = () => {
      let finalParam = '';

      if (this.activePage) { finalParam += `&page=${this.activePage}`; }
      if (this.searchKeyword) { finalParam += `&keyword=${this.searchKeyword}`; }
      if (this.gender) { finalParam += `&gender=${this.gender}`; }
      if (this.order.column && this.order.type) { finalParam += `&sortBy=${this.order.column}&sortOrder=${this.order.type}`; }

      return finalParam;
    };

    this.apiService.getData(generateParam()).then(resp => {
      this.setState({listUser: resp.results, isLoading: false});
    }, err => {
      this.setState({isLoading: false});
    });
  }

  componentDidMount() {
    this.loadData();
  }

  getOutputFilter(output: FilterOutput) {

    if (output.filterType === 'gender')  { this.gender = output.value; } 
    else if (output.filterType === 'keyword') { this.searchKeyword = output.value; } 
    else { // reset
      this.searchKeyword = '';
      this.gender = '';
    }

    this.loadData();
  }

  render() {
    return (
      <div className="homeComponent">
        <ul className="breadcrumbWrapper">
          <li>Home&nbsp;</li>
          <li>&nbsp;/&nbsp;</li>
          <li className="active">&nbsp;Example Page</li>
        </ul>
        <h2 className="title">Example With Search and Filter</h2>
        <FilterComponent filterOutput={(output: FilterOutput) => this.getOutputFilter(output)}/>

        <Table striped bordered hover data-test="table">
          <thead>
            <tr>
              <th>
                User Name
                <div className="sortWrapper">
                  <FaCaretUp onClick={(e) => this.onOrder('username', 'asc')} style={this.setStyleOrder('username', 'asc')}/>
                  <FaCaretDown onClick={(e) => this.onOrder('username', 'desc')} style={this.setStyleOrder('username', 'desc')}/>
                </div>
              </th>
              <th>
                Name
                <div className="sortWrapper">
                  <FaCaretUp onClick={(e) => this.onOrder('name', 'asc')} style={this.setStyleOrder('name', 'asc')}/>
                  <FaCaretDown onClick={(e) => this.onOrder('name', 'desc')} style={this.setStyleOrder('name', 'desc')}/>
                </div>
              </th>
              <th>
                Email
                <div className="sortWrapper">
                  <FaCaretUp onClick={(e) => this.onOrder('email', 'asc')} style={this.setStyleOrder('email', 'asc')}/>
                  <FaCaretDown onClick={(e) => this.onOrder('email', 'desc')} style={this.setStyleOrder('email', 'desc')}/>
                </div>
              </th>
              <th>
                Gender
                <div className="sortWrapper">
                  <FaCaretUp onClick={(e) => this.onOrder('gender', 'asc')} style={this.setStyleOrder('gender', 'asc')}/>
                  <FaCaretDown onClick={(e) => this.onOrder('gender', 'desc')} style={this.setStyleOrder('gender', 'desc')}/>
                </div>
              </th>
              <th>
                Registered Date
                <div className="sortWrapper">
                  <FaCaretUp onClick={(e) => this.onOrder('date', 'asc')} style={this.setStyleOrder('date', 'asc')}/>
                  <FaCaretDown onClick={(e) => this.onOrder('date', 'desc')} style={this.setStyleOrder('date', 'desc')}/>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.listUser.map((user: any, idx) => 
                <tr key={idx}>
                  <td>{user.login.username}</td>
                  <td>{user.name.first} {user.name.last}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                  <td>{user.registered.date}</td>
                </tr>
              )
            }
          </tbody>
        </Table>
        <Pagination>{this.generatePaginationItem}</Pagination>

        {this.state.isLoading && <LoadingSpinner/>}
      </div>
    )
  }

}
