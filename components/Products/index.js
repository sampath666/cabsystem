import {Component} from 'react'

import {AiOutlineArrowRight} from 'react-icons/ai'

import {BiCheck} from 'react-icons/bi'

import Header from '../Header'

import './index.css'

class Products extends Component {
  state = {start: 1, end: 2, arr: [], station: [], cost: 0, isBook: false}

  componentDidMount() {
    this.renderarr()
  }

  renderarr = async () => {
    const arr = await fetch('https://newgrapgh.onrender.com/')
    const res = await arr.json()

    this.setState({arr: res.arr})
  }

  handleOptionChange = e => this.setState({start: e.target.value})

  ond1 = () => {
    const {arr, start} = this.state
    let c = 0

    return (
      <div>
        <select
          value={start}
          onChange={this.handleOptionChange}
          className="c14"
        >
          {arr.map(each => {
            c += 1
            return (
              <option key={c} value={c}>
                Station {c}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  handleOptionChange2 = e => this.setState({end: e.target.value})

  ond2 = () => {
    const {arr, end} = this.state
    let c = 0

    return (
      <div>
        <select value={end} onChange={this.handleOptionChange2} className="c14">
          {arr.map(each => {
            c += 1
            return (
              <option key={c} value={c}>
                Station {c}
              </option>
            )
          })}
        </select>
      </div>
    )
  }

  search = async () => {
    const {start, end} = this.state
    const url = `https://newgrapgh.onrender.com/1?s=${start}&d=${end}`
    const arr = await fetch(url)
    const res = await arr.json()
    console.log(res)
    this.setState({station: res.dist, cost: res.cost})
  }

  renderVertex = () => {
    const {station, start, end} = this.state
    const array2 = station.filter((_, index) => index % 2 !== 0)
    console.log(array2)
    return (
      <div className="c4">
        <h3 className="c7">station {start}</h3>
        <AiOutlineArrowRight className="c9" />{' '}
        {station.map(each => {
          const t = array2.find(node => node === each)
          if (t === undefined) {
            return (
              <div className="c8">
                <h3 className="c6">vehicle id {each}</h3>
                <AiOutlineArrowRight className="c9" />{' '}
              </div>
            )
          }
          return (
            <div className="c8">
              <h3 className="c7">station {each}</h3>
              <AiOutlineArrowRight className="c9" />{' '}
            </div>
          )
        })}
        <h3 className="c7">station {end}</h3>
      </div>
    )
  }

  onHandle = () => this.setState({isBook: true})

  render() {
    const {arr, start, end, cost, station, isBook} = this.state
    console.log(start, end)
    return (
      <div className="bg">
        <Header />
        {isBook ? (
          <div className="c11">
            <BiCheck className="c12" />
            <h1 className="c13">Booked successfully</h1>
          </div>
        ) : (
          <div>
            {arr.length !== 0 && (
              <div className="c3">
                {this.ond1()}
                {this.ond2()}
                <button
                  type="button"
                  className="logout-desktop-btn c2"
                  onClick={this.search}
                >
                  Search Vehicles
                </button>
              </div>
            )}
            {station.length !== 0 && this.renderVertex()}
            {station.length !== 0 && (
              <>
                {' '}
                <h1>cost {cost}RS /-</h1>{' '}
                <button
                  className="logout-desktop-btn c2"
                  onClick={this.onHandle}
                >
                  book
                </button>
              </>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default Products
