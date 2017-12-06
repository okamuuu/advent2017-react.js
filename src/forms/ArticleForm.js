import React, { Component } from "react"
import styled, { css } from "styled-components"
import validator from "validator"
import Button from '../components/Button'

const Input = styled.input`
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.8em;
  outline: none;
  border: 1px solid #DDD;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-size: 16px;
  &:focus {
    box-shadow: 0 0 7px #3498db;
    border: 1px solid #3498db;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0.8em;
  outline: none;
  border: 1px solid #DDD;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
  font-size: 16px;
  &:focus {
    box-shadow: 0 0 7px #3498db;
    border: 1px solid #3498db;
  }

`;


export default class ArticleForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pristine: true,
      submitting: false,
      title: "",
      description: "",
      errorOf: {}
    };
  }

  validate(name, value) {
    switch (name) {
      case "title":
        return validator.isEmpty(value) ? "title は入力必須項目です" : null
      case "description":
        return validator.isEmpty(value) ? "description は入力必須項目です" : null
      default:
        return null;
    }
  }

  async handleChange(event) {
    const { name, value } = event.target;
    const errorMessage = this.validate(name, value)
    await this.setState({
      pristine: false,
      [name]: value,
      errorOf: Object.assign(this.state.errorOf, { [name]: errorMessage })
    });
  }

  handleSubmit() {
    const { pristine } = this.state;

    ["title", "description"].forEach(async name => {
      const errorMessage = this.validate(name, this.state[name])
      await this.setState({
        errorOf: Object.assign(this.state.errorOf, { [name]: errorMessage })
      });
    })
    console.log(Object.values(this.state.errorOf).filter(x =>x))
    if (pristine || Object.values(this.state.errorOf).filter(x => x).length > 0) {
      return;
    }
    console.log(this.state);
    this.props.onSubmit(this.state)
  }

  render() {
    const { pristine, errorOf } = this.state;

    return (
      <div>
        <div>
          <p>Title</p>
          <Input name="title" type="text" value={this.state.title} onChange={this.handleChange.bind(this)} />
          {errorOf["title"] && (
            <p style={{ color: "red" }}>{errorOf["title"]}</p>
          )}
        </div>
        <div>
          <p>Description</p>
          <Textarea name="description" type="text" value={this.state.description} onChange={this.handleChange.bind(this)} />
          {errorOf["description"] && (
            <p style={{ color: "red" }}>{errorOf["description"]}</p>
          )}
        </div>
        <div style={{textAlign: "right", paddingTop: "30px"}}>
          <Button primary disabled={pristine} onClick={this.handleSubmit.bind(this)}>追加</Button>
        </div>
      </div>
    )
  }
}
