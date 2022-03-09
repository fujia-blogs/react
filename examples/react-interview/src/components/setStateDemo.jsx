import React from 'react';

export default class SetStateDemo extends React.Component {
  state = {
    count: 0,
  };

  increment = () => {
    console.log('increment pre count', this.state.count);

    this.setState({
      count: this.state.count + 1,
    });

    console.log('increment post count', this.state.count);
  };

  triple = () => {
    console.log('triple pre count', this.state.count);
    this.setState({
      count: this.state.count * 3,
    });

    console.log('triple post count', this.state.count);
  };

  reduce = () => {
    // isBatchingUpdates = true
    setTimeout(() => {
      console.log('reduce pre count', this.state.count);

      this.setState({
        count: this.state.count - 1,
      });

      console.log('reduce post count', this.state.count);
    }, 0);
    // isBatchingUpdates = false
  };

  render() {
    return (
      <div>
        <p>{this.state.count}</p>
        <button onClick={this.increment}>+ 1</button>
        <button onClick={this.triple}>* 3</button>
        <button onClick={this.reduce}>- 1</button>
      </div>
    );
  }
}
